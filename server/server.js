const express = require('express');
const path = require('path');
const apiRouter = require('./router/api');
const app = express();
const PORT = 3000;
const { apiController } = require(`./router/apiController.js`);
app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

app.get('/api', apiController.cpuUsage, (req, res) => {
  return res.status(200).json(res.locals.cpuUsage);
});

app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Expres error handler caught unkown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;
