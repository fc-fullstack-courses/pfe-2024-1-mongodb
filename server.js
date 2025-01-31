const express = require('express');
const serverConfig = require('./config/server.json');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || serverConfig.PORT;
const HOST = process.env.HOST || serverConfig.HOST;

app.listen(PORT, HOST, () => {
  console.log(`Server started on PORT ${HOST}:${PORT}`);
});
