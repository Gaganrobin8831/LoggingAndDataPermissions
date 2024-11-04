function  successResponse(res, data, message, statusCode = 200)  {
    return res.status(statusCode).json({
      status: 'success',
      message,
      data,
    });
  };
  
  function  errorResponse(res, error = 'Something went wrong', statusCode = 500){
    return res.status(statusCode).json({
      status: 'error',
      message: error,
    });
  };


  function validationErrorResponse(res, errors, message, statusCode = 400) {
    return res.status(statusCode).json({
        status: 'fail',
        message,
        errors,
      });
  }
  
  
  module.exports = {
    successResponse,
    errorResponse,
    validationErrorResponse,
  };
  