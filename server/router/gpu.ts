// Initialize express router
import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import { apiController } from '../controllers/apiController';
const gpuRouter = express.Router();

// Set up routes
gpuRouter.get('/', (req, res) => {
  console.log(req.body);
  res.status(200).json('Hello, world!');
});

gpuRouter.post(
  '/',
  apiController.getGpuMemoryUsageByNode,
  apiController.getGpuMemoryFreeByNode,
  (req, res) => {
    res.status(200).json(res.locals.metrics);
  }
);

gpuRouter.put('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

gpuRouter.delete('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

export default gpuRouter;
