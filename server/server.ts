import express, { Request, Response, NextFunction } from 'express';
import * as path from 'path';
import apiController from './controllers/apiController';
import dbRouter from './router/dbRouter';
import authRouter from './router/authRouter';
import type { ServerError } from '../types';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serving static files
app.use('/public', express.static(path.resolve(__dirname, '../client/public')));
app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../client/public/index.html'));
});

// Routes
app.use('/snapshots', dbRouter);
app.use('/user', authRouter);
app.post(
  '/api',
  apiController.gpuUsage,
  (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(res.locals.gpuUsage);
  }
);

app.get('/*', (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.get('*', (req: Request, res: Response, next: NextFunction) =>
  res.status(404).send(`Page not found`)
);

//Global Error Handler
app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr: ServerError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj: ServerError = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

export default app;
