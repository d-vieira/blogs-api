const userService = require('../services/user');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { data, code, message } = await userService.login({ email, password });
  if (!data) return res.status(code).json({ message });
  return res.status(code).json({ token: data });
};

const register = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { data, code, message } = await userService.register({
    displayName,
    email,
    password,
    image,
  });
  if (!data) return res.status(code).json({ message });
  return res.status(code).json({ token: data });
};

const findAll = async (_req, res) => {
  const { data, code, message } = await userService.findAll();
  if (!data) return res.status(code).json({ message });
  return res.status(code).json(data);
};

const findOne = async (req, res) => {
  const { data, code, message } = await userService.findOne(req.params.id);
  if (!data) return res.status(code).json({ message });
  return res.status(code).json(data);
};

module.exports = { 
  login,
  register,
  findAll,
  findOne,
};
