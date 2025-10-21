export const errorHandler = (err, req, res, next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Something went wrong';
  
    res.status(status).json({
      status,
      message,
      data: status === 500 ? { error: err.message } : err,
    });
  };
  