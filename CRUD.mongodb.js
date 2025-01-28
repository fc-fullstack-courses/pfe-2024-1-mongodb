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
      country: "UA",
      city: 'Zaporizhzhya',
    },
    {
      country: "UA",
      city: 'Kyiv',
    },
    {
      country: "UA",
      city: 'Dnipro',
    },
  ]
});

// вставка декількох документів
db.users.insertMany([
  {email: "jonhDoe@gmail.com"},
  {email: 'janeDoe@gmail.com', balance: 5000}
]);

db.inventory.insertMany([
  { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
  { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
  { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
  { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
  { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
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
db.inventory.find( { status: "D" } );

// всі товари яких більше ніж 50 одиниць
// SELECT * FROM inventory WHERE qty > 50;
db.inventory.find({ qty: {
  // пара оператор : значення
  $gt: 50
}});

// товари зі статусом А та кількістю менше 60
db.inventory.find({
  status: 'A',
  qty: {
    $lt: 60
  }
});

// v2
db.inventory.find({
  $and: [
    {
      status: 'A'
    },
    {
      qty: {
        $lt: 60
      }
    }
  ]
});

// товари зі статусом D АБО кількістю менше 60
// SELECT * FROM inventory WHERE status = 'D' OR qty < 60;
db.inventory.find({
  $or: [
    {
      status: 'D'
    },
    {
      qty: {
        $lt: 60
      }
    }
  ]
});

// Всі користувачі, у яких є поле birthday
db.users.find({
  birthday: {
    $exists: false
  }
});

// всі користувачі, у кого баланс буде числом
db.users.find({
  balance: {
    $type: 'number'
  }
});

// звертання до властивостей об'єкта
// всі товари з гбабаритами у сантиметрах
db.inventory.find({
  "size.uom": 'cm'
});
