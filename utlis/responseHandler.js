module.exports = {
    handleSuccess: (res, message, data, statusCode = 200) => {
      res.status(statusCode).send({
        success: true,
        message: message,
        data: data
      });
    },
  
    handleError: (res, err, defaultMessage, statusCode = 500) => {
      res.status(statusCode).send({
        success: false,
        message: err.message || defaultMessage
      });
    }
  };
  