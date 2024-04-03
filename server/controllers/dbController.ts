import { Request, Response, NextFunction } from 'express';
import Snapshot from '../Models/snapshotModel';

const dbController = {
  getSnapshot: async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    try {
      const snapshots = await Snapshot.find({ user: userId });
      res.locals.snapshots = snapshots;
      return next();
    } catch (err) {
      return next({
        log: 'Error in getSnapshot middleware: ' + err,
        message: 'Error while fetching snapshots.',
      });
    }
  },

  postSnapshot: async (req: Request, res: Response, next: NextFunction) => {
    const { userId, podName, metrics } = req.body.snapshot;
    try {
      if (!userId || !podName || !metrics) {
        return next({
          status: 400,
          log: 'Error in postSnapshot middleware: invalid input data',
          message:
            'Cannot create new snapshot. Please provide all required information.',
        });
      }
      const newSnapshot = await Snapshot.create({
        user: userId,
        podName,
        metrics,
      });
      res.locals.newSnapshot = newSnapshot;
      return next();
    } catch (err) {
      return next({
        log: 'Error in postSnapshot middleware: ' + err,
        message: 'Error while creating new snapshot.',
      });
    }
  },

  deleteSnapshot: async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    try {
      if (!_id) {
        return next({
          status: 400,
          log: 'Error in deleteSnapshot middleware: snapshot id not provided',
          message:
            'Cannot create delete snapshot. Please provide all required information.',
        });
      }
      const deletedSnapshot = await Snapshot.findOneAndDelete({ _id });
      if (!deletedSnapshot) {
        return next({
          status: 400,
          log: 'Error in deleteSnapshot middleware: snapshot not found',
          message:
            'The entry you want to delete does not exist in the database',
        });
      }
      res.locals.deletedSnapshot = deletedSnapshot;
      return next();
    } catch (err) {
      return next({
        log: 'Error in deleteSnapshot middleware: ' + err,
        message: 'Error while deleting snapshot.',
      });
    }
  },
};

export default dbController;
