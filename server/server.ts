import express, { Request, Response, NextFunction } from 'express';
import { ServerError } from '../types';
import * as path from 'path';
import { apiController } from './controller/apiController';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

app.get(
  '/api',
  apiController.cpuUsage,
  (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(res.locals.cpuUsage);
  }
);

app.get('/', (req, res, next) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.get('*', (req: Request, res: Response, next: NextFunction) =>
  res.status(404).send(`Page not found`)
);

app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr: ServerError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj: ServerError = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
