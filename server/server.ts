import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import * as path from 'path';
import { apiController } from './router/apiController';
import dbRouter from './router/dbRouter';
import exp from 'constants';
// import CpuUsageData from '../types';
const app = express();
app.use(express.json());
const PORT = 3000;

app.use('/snapshot', dbRouter);

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

//Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Expres error handler caught unkown middleware error',
    status: 500,
    message: {err: 'An error occured'},
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
