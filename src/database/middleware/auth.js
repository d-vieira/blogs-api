const jwtHelpers = require('../helpers/jwt');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const data = jwtHelpers.verifyToken(authorization);
    req.userId = data.id;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = auth;
