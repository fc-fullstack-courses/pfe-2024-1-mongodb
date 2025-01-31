const express = require('express');
const serverConfig = require('./config/server.json');
const rootRouter = require('./routers');
const app = express();

app.use(express.json());
app.use(rootRouter);

const PORT = process.env.PORT || serverConfig.PORT;
const HOST = process.env.HOST || serverConfig.HOST;

app.listen(PORT, HOST, () => {
  console.log(`Server started on PORT ${HOST}:${PORT}`);
});
