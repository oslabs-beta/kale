import { Request, Response, NextFunction, RequestHandler } from 'express';
import Snapshot from '../Models/snapshotModel';
export const dbController = {
  getSnapshot: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const snapshots = await Snapshot.find();
      if (snapshots.length === 0) {
        return next({
          status: 400,
          log: 'Error in getSnapshots middleware',
          message: 'There are no snapshots in the database',
        });
      }
      res.locals.snapshots = snapshots;
      return next();
    } catch (err) {
      return next(err);
    }
  },

  postSnapshot: async (req: Request, res: Response, next: NextFunction) => {
    const { podName, date, metrics } = req.body;
    try {
      if (
        !podName ||
        !date ||
        !metrics ||
        !metrics.gpuUsage ||
        !metrics.memoryUsage
      ) {
        return next({
          status: 400,
          log: 'Error in postSnapshot middleware',
          message:
            'Cannot create new snapshot. Please provide all required information.',
        });
      }
      const newSnapshot = await Snapshot.create({ podName, date, metrics });
      res.locals.newSnapshot = newSnapshot;
      return next();
    } catch (err) {
      return next(err);
    }
  },

  deleteSnapshot: async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.body;
    try {
      if (!_id) {
        return next({
          status: 400,
          log: 'Error in deleteSnapshot middleware',
          message:
            'Cannot create delete snapshot. Please provide all required information.',
        });
      }
      const deletedSnapshot = await Snapshot.findOneAndDelete({_id});
      if(!deletedSnapshot){
        return next({
            status: 400,
            log: 'Error in deleteSnapshot middleware',
            message: 'The entry you want to delete does not exist in the database'
        })
      }
      res.locals.deletedSnapshot = deletedSnapshot;
      return next();
    } catch (err) {
      return next(err);
    }
  },
};
