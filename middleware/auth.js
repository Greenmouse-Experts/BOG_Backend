/* eslint-disable consistent-return */
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('authorization');
  // console.log(token)
  if (!token) {
    return res.status(401).send({
      success: false,
      message: 'Access Denied. Authorization token not passed',
    });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: 'Authorization token is expired. Try to login again',
    });
  }
};
