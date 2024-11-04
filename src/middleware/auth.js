const { validateToken } = require('../middleware/validate');

function checkAuth(req, res, next) {
  const token = req.cookies.authToken; 
  if (!token) {
    return validationErrorResponse(res,error,"Please Register First",400)
  }

  try {
      const userPayload = validateToken(token); 
      req.user = userPayload; 
      next(); 
  } catch (error) {
      console.log('Invalid token:', error.message);
      return validationErrorResponse(res,error,"Something Wrong",400)
  }
}


module.exports = {
  checkAuth,
};
