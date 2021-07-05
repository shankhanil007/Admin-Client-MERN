const jwt = require("jsonwebtoken");
const config = require("config");
const e = require("express");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    if ("admin" in decoded) {
      req.user = decoded.admin;
      next();
    } else if ("client" in decoded) {
      req.user = decoded.client;
      next();
    } else {
      req.user = decoded.user;
      next();
    }
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
