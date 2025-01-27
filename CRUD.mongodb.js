// приклад connection string
// mongodb+srv://admin:admin@cluster0.gzxat.mongodb.net/PFE-2024-1-lessons

// Create - створення
// вставка одного запису
db.users.insertOne({ firstName: 'Test', lastName: 'User' });

db.users.insertOne({ fullName: 'User Userenko' });

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

// Read - читання
db.users.find();
