const jwt = require("jsonwebtoken");
const { ApiError } = require("../errors/ApiError");
module.exports = function (role) {
  return function (req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return next(ApiError.unauthorized("user is unauthorized"));
      }
      const decoded = jwt.verify(token, process.env.SECRET);
      if (decoded.role !== role) {
        req.user = decoded;
        return next(ApiError.forbidden("you dont have rights"));
      }
      next()
    } catch (err) {
      throw err;
    }
  };
};
