// агрегація у MonogoDB

db.inventory.aggregate([
  // етап агрегації
  // $match - фільтрує дані як WHERE у пайплайнах
  {
    $match: {
      status: 'Accepted',
      'size.uom': 'cm',
      qty: {
        $gt: 80,
      },
    },
  },
  // сортування результатів
  {
    $sort: {
      qty: 1, // сортуємо по зростанню
      name: -1, // сортуємо імена по спаданнюб пріорітет буде нижче ніж у qty
    },
  },
  {
    $count: 'accepted products with good quantity',
  },
]);

db.createCollection('manufacturers', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name'],
      properties: {
        name: {
          bsonType: 'string',
        },
        contacts: {
          bsonType: 'object',
          properties: {
            email: {
              bsonType: 'string',
            },
            phone: {
              bsonType: 'string',
            },
          },
        },
      },
    },
  },
});

db.createCollection('products', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'manufacturerId', 'price', 'quantity'],
      properties: {
        name: {
          bsonType: 'string',
        },
        price: {
          bsonType: 'number',
          minimum: 0,
        },
        quantity: {
          bsonType: 'int',
          minimum: 0,
        },
        manufacturerId: {
          bsonType: 'objectId',
        },
      },
    },
  },
});

//
db.manufacturers.insertMany([
  {
    name: 'Apple',
  },
  {
    name: 'MicroSoft',
  },
  {
    name: 'Rozetka',
  },
]);

db.manufacturers.insertOne({
  name: 'Test Inc'
});

db.products.insertMany([
  {
    name: 'Phone1',
    price: 5000,
    quantity: 250,
    manufacturerId: new ObjectId('679cfe51c7a7bf4e3b4a1514'),
  },
  {
    name: 'Phone2',
    price: 1233456,
    quantity: 1000,
    manufacturerId: new ObjectId('679cfe51c7a7bf4e3b4a1514'),
  },
  {
    name: 'Xbox 123X321XX- S Series',
    price: 25000,
    quantity: 12,
    manufacturerId: new ObjectId('679cfe51c7a7bf4e3b4a1515'),
  },
  {
    name: 'RozetkaPhone',
    price: 12000,
    quantity: 800,
    manufacturerId: new ObjectId('679cfe51c7a7bf4e3b4a1516'),
  },
  {
    name: 'RozetkaBox',
    price: 19999,
    quantity: 324,
    manufacturerId: new ObjectId('679cfe51c7a7bf4e3b4a1516'),
  },
]);

// дані про товар та його виробника (назву)
db.products.aggregate([
  // лівій джойн іншої коллекції
  {
    $lookup: {
      from: 'manufacturers', // яку коллекцію приєднуємо
      localField: 'manufacturerId', // поле у існуючій коллекції по якому джоінимось
      foreignField: '_id', // поле у коллекції яку джоінимо
      as: 'manufacturer', // назва поля, у яку покладдемо результат зёэднання
    },
  },
  // розбиває масив на декілька записів зі значень його елементів
  {
    $unwind: "$manufacturer"
  },
  // прибираємо певне поле / поля з результатаів
  {
    $unset: 'manufacturerId',
    //  $unset: ['manufacturerId'] // для декількох полів
  }
]);

// дані кожного виробника та кількість його товарів у бд
db.manufacturers.aggregate([
  {
    $lookup: {
      from: 'products',
      localField: '_id',
      foreignField: 'manufacturerId',
      as: 'product'
    }
  },
  {
    $unwind: {
      path: '$product',
      preserveNullAndEmptyArrays: false
    }
  },
  // групуєпо по виразу та повертаємо результати цього групування та інших аргегатних операторів
  {
    $group: {
      // вираз, по якому групуємо
      // id: "$name", // для 1 поля
      _id: {
        name: "$name",
        id: '$_id'
      }, // для багатьох полів
      //  додаткові поля, які використовують акумуляційні оператори
      productAmount: {
        $count: {}
      }
    },
  },
  {
    $sort: {
      productAmount: -1,
      "_id.name": 1
    }
  },
  {
    $skip: 1 // OFFEST
  },
  {
    $limit: 2 // LIMIT
  }
]);
