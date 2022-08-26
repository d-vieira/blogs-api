const userService = require('../services/user');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { data, code, message } = await userService.login({ email, password });
  if (!data) return res.status(code).json({ message });
  return res.status(code).json({ token: data });
};

module.exports = { 
  login,
};
