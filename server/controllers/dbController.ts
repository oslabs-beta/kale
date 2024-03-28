import { Request, Response, NextFunction, RequestHandler } from 'express';
import Snapshot from '../Models/snapshotModel';

export const dbController = {
  getSnapshot: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const snapshots = await Snapshot.find();
      res.locals.snapshots = snapshots;
      return next();
    } catch (err) {
      return next({
        log: 'Error in getSnapshot middleware',
        message: err.message,
      });
    }
  },

  postSnapshot: async (req: Request, res: Response, next: NextFunction) => {
    const { user, podName, metrics } = req.body.snapshot;
    try {
      if (!user || !podName || !metrics) {
        return next({
          status: 400,
          log: 'Error in postSnapshot middleware',
          message:
            'Cannot create new snapshot. Please provide all required information.',
        });
      }
      const newSnapshot = await Snapshot.create({ user, podName, metrics });
      res.locals.newSnapshot = newSnapshot;
      return next();
    } catch (err) {
      return next({
        log: 'Error in postSnapshot middleware',
        message: err.message,
      });
    }
  },

  deleteSnapshot: async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    try {
      if (!_id) {
        return next({
          status: 400,
          log: 'Error in deleteSnapshot middleware',
          message:
            'Cannot create delete snapshot. Please provide all required information.',
        });
      }
      const deletedSnapshot = await Snapshot.findOneAndDelete({ _id });
      if (!deletedSnapshot) {
        return next({
          status: 400,
          log: 'Error in deleteSnapshot middleware',
          message:
            'The entry you want to delete does not exist in the database',
        });
      }
      res.locals.deletedSnapshot = deletedSnapshot;
      return next();
    } catch (err) {
      return next({
        log: 'Error in deleteSnapshot middleware',
        message: err.message,
      });
    }
  },
};
