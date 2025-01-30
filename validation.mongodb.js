// створення пустої коллекції
db.createCollection('pcCases', {
  validator: {
    // об'єкт валідації наших документів
    $jsonSchema: {
      // вказуємо тип даних
      bsonType: 'object',
      // масив властивостей, які необхідні у нашому об'єкті
      required: ['name', 'price', 'specs'],
      properties: {
        name: {
          bsonType: 'string',
          // опис помилки
          description: 'Name must be a string',
          // регулярка для валідації
          pattern: '[A-Za-z0-9 ]{1,64}',
        },
        price: {
          bsonType: 'number',
          description: 'Price must be a number',
          minimum: 0,
          maximum: 999999999999,
        },
        isAvaliable: {
          bsonType: 'bool',
        },
        specs: {
          bsonType: 'object',
          description: 'Specs must be an object',
          required: ['cpu', 'ram', 'storage'],
          properties: {
            cpu: {
              bsonType: 'string',
            },
            ram: {
              bsonType: 'number',
              minimum: 0
            },
            storage: {
              bsonType: 'array',
              // uniqueItems: true // якщо треба всі елементи масива зробити унікальними
              // валідація вмісту масива
              items: {
                bsonType: 'object',
                properties: {
                  type: {
                    bsonType: 'string'
                  },
                  diskSpace: {
                    bsonType: 'number'
                  }
                }
              }
            },
          },
        },
      },
    },
  },
});

const goodPC = {
  name: 'UltraBox 9000',
  price: 9999,
  specs: {
    cpu: 'Ryzen 9900 X6D',
    ram: 128,
    storage: [
      {
        type: 'SSD',
        diskSpace: 500
      },
      {
        type: 'HDD',
        diskSpace: 2048
      }
    ],
  },
};

db.pcCases.insertOne(goodPC);

const badPC = {
  name: 1234,
  isAvaliable: {
    test: '12345'
  },
}

db.pcCases.insertOne(badPC);