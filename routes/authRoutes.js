import { register, login, updateUser } from '../controllers/authController.js';
import authenticateUser from '../middleware/auth.js';
import express from 'express';
import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP address. Try again in 15 min',
});
const authRouter = express.Router();

authRouter.route('/register').post(apiLimiter, register);
authRouter.route('/login').post(apiLimiter, login);
authRouter.route('/updateUser').patch(authenticateUser, updateUser);

export default authRouter;
