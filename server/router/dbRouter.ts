import express, { Request, Response } from 'express';
import dbController from '../controllers/dbController';

const dbRouter = express.Router();

// get snapshots from database based on user id
dbRouter.get('/', dbController.getSnapshot, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.snapshots);
});

// post new snapshot to database
dbRouter.post('/', dbController.postSnapshot, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.newSnapshot);
});

// delete snapshot from database based on snapshot_id
dbRouter.delete(
  '/:_id',
  dbController.deleteSnapshot,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.deletedSnapshot);
  }
);

export default dbRouter;
