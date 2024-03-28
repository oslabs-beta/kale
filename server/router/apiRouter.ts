// Initialize express router
import express from 'express';
import { apiController } from '../controllers/apiController';
const apiRouter = express.Router();

apiRouter.post(
  '/',
  // apiController.gpuUsage,
  // apiController.nodeGpuUsage,
  apiController.getGpuMemoryUsageByNode,
  apiController.getGpuMemoryFreeByNode,
  (req, res) => {
    res.status(200).json(res.locals.metrics);
  }
);

export default apiRouter;
