const mongoose = require('mongoose');
const dbConfig = require('../config/db.json');

async function main(params) {
  await mongoose.connect(dbConfig.connectionString);
}

main().catch((err) => console.log(err));
