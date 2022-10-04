import StatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const auth = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
    const error = new Error('You are not authenticated :O');
    res.status(StatusCodes.FORBIDDEN);
    return next(error);
  }

  const token = authorizationHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (err) {
    const error = new Error('Token not legitimate');
    return next(error);
  }
};

export default auth;
