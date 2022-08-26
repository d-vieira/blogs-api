const jwt = require('jsonwebtoken');

const JWT_CONFIG = { algorithm: 'HS256', expiresIn: '1d' };

const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, JWT_CONFIG);
  return token;
};

const verifyToken = (token) => {
  const data = jwt.verify(token, process.env.JWT_SECRET);
  return data;
};

module.exports = { createToken, verifyToken };
