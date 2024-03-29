// create an auth router that will handle all authentication routes
import express from 'express';
import { authController } from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/signup', authController.createUser, (req, res) => {
  return res.status(200).json(res.locals.newUser);
});

authRouter.post('/login', authController.login, (req, res) => {
  return res.status(200).json(res.locals.valid);
});

export default authRouter;
