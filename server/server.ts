import express from 'express';
import * as path from 'path';

const app = express();
const PORT = 3000;

app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
