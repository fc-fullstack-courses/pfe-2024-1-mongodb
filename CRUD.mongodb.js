// приклад connection string
// mongodb+srv://admin:admin@cluster0.gzxat.mongodb.net/PFE-2024-1-lessons

// Create - створення
// вставка одного запису
db.users.insertOne({ firstName: 'Test', lastName: 'User' });

db.users.insertOne({ fullName: 'User Userenko', balance: '10000 UAH' });

db.users.insertOne({
  fullName: 'User Userenko',
  email: 'mail1@gmail.com',
  balance: 5000,
  birthday: new Date(1995, 10, 3),
  contacts: {
    phone: '+380123456789',
    zip: 69123,
  },
  adresses: [
    {
      country: 'UA',
      city: 'Zaporizhzhya',
    },
    {
      country: 'UA',
      city: 'Kyiv',
    },
    {
      country: 'UA',
      city: 'Dnipro',
    },
  ],
});

// вставка декількох документів
db.users.insertMany([
  { email: 'jonhDoe@gmail.com' },
  { email: 'janeDoe@gmail.com', balance: 5000 },
]);

db.inventory.insertMany([
  { item: 'journal', qty: 25, size: { h: 14, w: 21, uom: 'cm' }, status: 'A' },
  {
    item: 'notebook',
    qty: 50,
    size: { h: 8.5, w: 11, uom: 'in' },
    status: 'A',
  },
  { item: 'paper', qty: 100, size: { h: 8.5, w: 11, uom: 'in' }, status: 'D' },
  {
    item: 'planner',
    qty: 75,
    size: { h: 22.85, w: 30, uom: 'cm' },
    status: 'D',
  },
  {
    item: 'postcard',
    qty: 45,
    size: { h: 10, w: 15.25, uom: 'cm' },
    status: 'A',
  },
]);

// Read - читання
// SELECT * FROM users;
db.users.find({});

/*
  db.collection.find(query, projection, options)
    query - об'єкт фільтрації (WHERE)
    projection - об'єкт проекції (список виборки з SQL, стовпчики / поля які увійдуть до результатів )
    options - об'єкт інших налашувань запиту
*/

// фільтрація результатів
// SELECT * FROM inventory WHERE status = "D"
db.inventory.find({ status: 'D' });

// всі товари яких більше ніж 50 одиниць
// SELECT * FROM inventory WHERE qty > 50;
db.inventory.find({
  qty: {
    // пара оператор : значення
    $gt: 50,
  },
});

// товари зі статусом А та кількістю менше 60
db.inventory.find({
  status: 'A',
  qty: {
    $lt: 60,
  },
});

// v2
db.inventory.find({
  $and: [
    {
      status: 'A',
    },
    {
      qty: {
        $lt: 60,
      },
    },
  ],
});

// товари зі статусом D АБО кількістю менше 60
// SELECT * FROM inventory WHERE status = 'D' OR qty < 60;
db.inventory.find({
  $or: [
    {
      status: 'D',
    },
    {
      qty: {
        $lt: 60,
      },
    },
  ],
});

// Всі користувачі, у яких є поле birthday
db.users.find({
  birthday: {
    $exists: false,
  },
});

// всі користувачі, у кого баланс буде числом
db.users.find({
  balance: {
    $type: 'number',
  },
});

// звертання до властивостей об'єкта
// всі товари з гбабаритами у сантиметрах
db.inventory.find({
  'size.uom': 'cm',
});

// Проекція
/*
  значення:  
    1 або true - поле буде включено до результату (include)
    0 або false - поле буде виключено з результатів (exclude)
*/
// SELECT item, status FROM inventory;
db.inventory.find(
  {},
  {
    item: 1,
    status: 1,
  }
);

// всі користувачі без паролів
db.users.find(
  {},
  {
    password: 0,
  }
);

// користувачі з емейлами але без прізвищ ПОМИЛКА
db.users.find(
  {},
  {
    email: 1,
    lastName: 0,
  }
);

// 0 та 1 у проекції поєднуються тільки якщо 0 прибирати _id
db.users.find(
  {},
  {
    email: 1,
    _id: 0,
  }
);

// фільтрація по ObjectId
db.users.findOne({
  _id: new ObjectId('6797d3cb3140351239fd57e1')
})

db.inventory.insertMany([
  {
    item: 'canvas',
    qty: 100,
    size: { h: 28, w: 35.5, uom: 'cm' },
    status: 'A',
  },
  { item: 'journal', qty: 25, size: { h: 14, w: 21, uom: 'cm' }, status: 'A' },
  { item: 'mat', qty: 85, size: { h: 27.9, w: 35.5, uom: 'cm' }, status: 'A' },
  {
    item: 'mousepad',
    qty: 25,
    size: { h: 19, w: 22.85, uom: 'cm' },
    status: 'P',
  },
  {
    item: 'notebook',
    qty: 50,
    size: { h: 8.5, w: 11, uom: 'in' },
    status: 'P',
  },
  { item: 'paper', qty: 100, size: { h: 8.5, w: 11, uom: 'in' }, status: 'D' },
  {
    item: 'planner',
    qty: 75,
    size: { h: 22.85, w: 30, uom: 'cm' },
    status: 'D',
  },
  {
    item: 'postcard',
    qty: 45,
    size: { h: 10, w: 15.25, uom: 'cm' },
    status: 'A',
  },
  {
    item: 'sketchbook',
    qty: 80,
    size: { h: 14, w: 21, uom: 'cm' },
    status: 'A',
  },
  {
    item: 'sketch pad',
    qty: 95,
    size: { h: 22.85, w: 30.5, uom: 'cm' },
    status: 'A',
  },
]);

// U - update

// один запис
// встановити предмету canvas кількість 250
db.inventory.updateOne({
  item: 'canvas',
}, {
  //  set - встановлює нове значення у вказаних полях
  $set: {
    qty: 250,
    updatedAt: new Date(),
  }
});

// оновлення декількох документів

db.inventory.updateMany({
  status: 'A'
},
{
  $set: {
    status: 'Accepted'
  }
});

// D - delete

// видалити багато записів

// видалити всі записи з коллекції
// DELETE FROM inventory;
db.inventory.deleteMany({});

db.users.deleteMany({
  email: {
    $exists: false,
  },
});

// видалити один запис
db.users.deleteOne({});

// або
db.users.findOneAndDelete({});

// видалити всю колекцію
// DROP TABLE inventory;
db.inventory.drop();
