// verifyRole.js
const jwt = require("jsonwebtoken");
const config = require("../config/config");

function verifyRole(requiredRole) {
  return function (req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).send({ message: "No token provided." });

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Failed to authenticate token." });

      if (decoded.role < requiredRole) {
        return res.status(403).send({ message: "Insufficient permissions." });
      }

      next();
    });
  };
}

module.exports = verifyRole;
