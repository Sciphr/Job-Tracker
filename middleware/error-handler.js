const errorHandlerMiddleware = (err, req, res, next) => {
  res.json({ message: err });
};

export default errorHandlerMiddleware;
