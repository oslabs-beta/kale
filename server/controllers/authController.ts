import { Request, Response, NextFunction } from 'express';
import User from '../Models/userModel';

const authController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    const { email, firstName, password } = req.body;
    // console.log(email, firstName, password);

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next({
          status: 400,
          log: 'Error in createUser middleware',
          message: 'Username already exists. Please choose another username',
        });
      }
      const newUser = await User.create({ email, firstName, password });
      // console.log('new user' + newUser);
      res.locals.newUser = newUser;
      return next();
    } catch (err) {
      return next({
        log: 'Error in createUser middleware',
        message: { err: 'An error occurred while creating user: ' + err },
      });
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body;
    if (!email || !password) {
      return next({
        status: 401, // Unauthorized
        log: 'Error in login middleware',
        message: 'Invalid username or password',
      });
    }
    try {
      const existingUser = await User.findOne({ email });
      // console.log(existingUser);
      if (!existingUser) {
        return next({
          status: 401, // Unauthorized
          log: 'Error in login middleware',
          message: 'Invalid username or password',
        });
      }

      if (typeof password === 'number') {
        password = JSON.stringify(password);
      }

      const valid = await existingUser.comparePassword(password);
      if (!valid) {
        return res
          .status(401)
          .json({ message: 'Invalid username or password' });
      }
      const { firstName, _id } = existingUser;
      res.locals.user = { firstName, _id };

      return next();
    } catch (err) {
      return next({
        log: 'Error in login middleware',
        message: { err: 'An error occurred while user login: ' + err },
      });
    }
  },
};

export default authController;
