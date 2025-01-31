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
              minimum: 0,
            },
            storage: {
              bsonType: 'array',
              // uniqueItems: true // якщо треба всі елементи масива зробити унікальними
              // валідація вмісту масива
              items: {
                bsonType: 'object',
                properties: {
                  type: {
                    bsonType: 'string',
                  },
                  diskSpace: {
                    bsonType: 'number',
                  },
                },
              },
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
        diskSpace: 500,
      },
      {
        type: 'HDD',
        diskSpace: 2048,
      },
    ],
  },
};

db.pcCases.insertOne(goodPC);

const badPC = {
  name: 1234,
  isAvaliable: {
    test: '12345',
  },
};

db.pcCases.insertOne(badPC);

// зміна існуючої валідації / додавання валідації до існуючої коллекції
db.runCommand({
  collMod: 'users',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['email'],
      properties: {
        fullName: {
          bsonType: 'string',
        },
        email: {
          bsonType: 'string',
          pattern: '[A-Za-z0-9]{2,64}@[A-Za-z]{3,32}.[A-Za-z]{2,12}',
        },
        birthday: {
          bsonType: 'date',
        },
      },
    },
  },
});

db.users.insertOne({ email: 'test@test.test' });

// якщо команда зверху не виконується
use('admin');

db.grantRolesToUser(
  // ім'я користувача у БД
  'admin',
  [
    // { role : "dbAdmin", db : "PFE-2024-1-lessons" }
    'dbAdminAnyDatabase',
  ]
);

/*
  Стоворити коллекцію телефонів з наявною валідацією полів
    У телефона можуть бути наступні поля:
      - назва
      - ціна
      - колір
      - вживаний / невживаний
      - габарити (товщина, висота, довжина) - всі мають знаходитися всередині властиовсті габаритів
      - підтримувані стандарти зв'язку (2G, 3G, 4G, LTE, 5G, WiFi, BlueTooth, ....) - один телефон може підтримувати декілька типів зв'язків одночасно
      - серійний номер - має бути унікальним для кожного телефона

    З перелічених полів у кожного телефона обов'язково мають бути наступні:
      - назва
      - ціна
      - стандарти зв'язку
      - серійний номер
*/

db.createCollection('phones', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'price', 'connectionStandards', 'serialNumber'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'Phone Name is a required string type field.',
        },
        price: {
          bsonType: 'number',
          minimum: 0,
          description:
            'Phone price is a required number type field, not less than 0',
        },
        color: {
          bsonType: 'string',
          description: 'Phone color is an optional string type field',
        },
        isUsed: {
          bsonType: 'bool',
          description: 'Is the phone used - optional Bool type',
        },
        dimensions: {
          bsonType: 'object',
          required: ['thickness', 'height', 'length'],
          properties: {
            thickness: {
              bsonType: 'object',
              required: ['value', 'uom'],
              properties: {
                value: {
                  bsonType: 'number',
                  minimum: 0,
                  description:
                    'Phone thickness is a required number type field, not less than 0',
                },
                uom: {
                  bsonType: 'string',
                  description: 'Unit of meashure for specific dimension value',
                },
              },
            },
            thickness: {
              bsonType: 'object',
              required: ['value', 'uom'],
              properties: {
                value: {
                  bsonType: 'number',
                  minimum: 0,
                  description:
                    'Phone length is a required number type field, not less than 0',
                },
                uom: {
                  bsonType: 'string',
                  description: 'Unit of meashure for specific dimension value',
                },
              },
            },
            height: {
              bsonType: 'object',
              required: ['value', 'uom'],
              properties: {
                value: {
                  bsonType: 'number',
                  minimum: 0,
                  description:
                    'Phone height is a required number type field, not less than 0',
                },
                uom: {
                  bsonType: 'string',
                  description: 'Unit of meashure for specific dimension value',
                },
              },
              bsonType: 'object',
              properties: {
                value: {
                  bsonType: 'number',
                  minimum: 0,
                  description:
                    'Phone thickness is a required number type field, not less than 0',
                },
                uom: {
                  bsonType: 'string',
                  description: 'Unit of meashure for specific dimension value',
                },
              },
            },
          },
        },
        connectionStandards: {
          bsonType: 'array',
          minItems: 1,
          uniqueItems: true,
          items: {
            bsonType: 'string',
            enum: ['2G', '3G', '4G', 'LTE', '5G', 'WiFi', 'BlueTooth'],
            description:
              'Communication Standards - A Required Array type field, minimum one item',
          },
        },
        serialNumber: {
          bsonType: 'string',
          description:
            'Serial Number is a required string type field unique for each phone',
        },
      },
    },
  },
});

db.phones.createIndex({ serialNumber: 1 }, { unique: true });
