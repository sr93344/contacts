const {constants}  = require('../constants');

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  let title = '';
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      title = 'Validation Error';
      res.status(400);
        break;
    case constants.UNAUTHORIZED_ERROR:
        title = 'Unauthorized Error';
        res.status(401);
        break;
    case constants.FORBIDDEN_ERROR:
        title = 'Forbidden Error';
        res.status(403);
    break;
    case constants.NOT_FOUND_ERROR:
        title = 'Not Found Error';
        res.status(404);
        break;  
    case constants.SERVER_ERROR:
        title = 'Server Error';
        res.status(500);
        break;  
    default:
        console.log('No Error, All Good!');
        break;
  }
  res.status(statusCode)
    .json({
      title: title,
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
}

module.exports = { errorHandler };