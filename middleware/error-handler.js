import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  res.json({ message: err });
};

export default errorHandlerMiddleware;
