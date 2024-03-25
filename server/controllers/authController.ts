import { Request, Response, NextFunction, RequestHandler, response } from 'express';
import User from '../Models/userModel';
const bcrypt = require('bcrypt');
const saltRounds: Number = 10;

export const authController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return next({
          status: 400,
          log: 'Error in createUser middleware',
          message: 'Username already exists. Please choose another username',
        });
      }
      const newUser = await User.create({ username, password });
      res.locals.newUser = newUser;
      return next();
    } catch (err) {
      return next({
        log: 'Error in createUser middleware',
        message: err.message,
      });
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;
    try {
      const existingUser = await User.findOne({ username });
      if (!existingUser) {
        return next({
          status: 401, // Unauthorized
          log: 'Error in login middleware',
          message: 'Invalid username or password',
        });
      }

      if(typeof password === 'number'){
        password = JSON.stringify(password);
      }

      const valid = await existingUser.comparePassword(password);
      console.log('valid: ', valid);
      res.locals.valid = valid;
      return next();

    } catch (err) {
      return next({
        log: 'Error in login middleware',
        message: err. message
      });
    }
  },
};
