const express = require('express');
const dotenv = require('dotenv');
var cors = require("cors");
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use('/', indexRouter);
app.use('/api/v1', apiRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});