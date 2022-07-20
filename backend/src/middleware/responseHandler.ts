export const defaultRespose = (data: any, statusCode = 200, message = 'OK', isError = false) => {
  return {
    statusCode,
    isError,
    message,
    data,
  };
};

export const responseHandler = (req, res, next) => {
  res.sendFormat = (data: any, statusCode = 200, message = 'OK', isError = false) => {
    res.json(defaultRespose(data, statusCode, message, isError));
  };
  next();
};
