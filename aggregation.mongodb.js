// агрегація у MonogoDB

db.inventory.aggregate([
  // етап агрегації
  // $match - фільтрує дані як WHERE у пайплайнах
  {
    $match: {
      status: 'Accepted',
      "size.uom": 'cm',
      qty: {
        $gt: 80
      }
    }
  },
  // сортування результатів
  {
    $sort: {
      qty: 1, // сортуємо по зростанню
      name: -1 // сортуємо імена по спаданнюб пріорітет буде нижче ніж у qty
    }
  },
  {
    $count: "accepted products with good quantity"
  }
]);

