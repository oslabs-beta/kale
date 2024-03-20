import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import * as path from 'path';
import { apiController } from './router/apiController';

// import CpuUsageData from '../types';
const app = express();
const PORT = 3000;

app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

app.get(
  '/api',
  apiController.cpuUsage,
  (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(res.locals.cpuUsage);
  }
);
app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
