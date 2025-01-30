db.inventory.find({ status: 'Accepted' }).explain('executionStats');

// Індекс - спеціальний об'єкт в БД, який використовується для прискорення виконання певних пошукових запитів

// створення ындекса надо одним полем
/*
  1 - зростаючий індекс (менші значення будуть першими)
  -1 - спадаючий індекс (менші значення будуть останніми)
*/
db.inventory.createIndex({
  status: 1
});

// отримати список індексів у коллекції
db.inventory.getIndexes();

// видалення індексу
db.inventory.dropIndex({
  status: 1
});

//  створення унікального індексу
db.users.createIndex({email: 1}, {unique: true});

// db.users.deleteMany({email: 'test@test.test'})