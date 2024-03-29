import { dbController } from '../controllers/dbController';
import express, { Request, Response } from 'express';
const dbRouter = express.Router();

dbRouter.get('/', dbController.getSnapshot, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.snapshots);
});

dbRouter.post('/', dbController.postSnapshot, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.newSnapshot);
});

dbRouter.delete(
  '/:_id',
  dbController.deleteSnapshot,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.deletedSnapshot);
  }
);

export default dbRouter;
