const { User } = require('../models');
const token = require('../helpers/jwt');

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user) return { code: 400, message: 'Invalid fields' };
  const data = token.createToken({ id: user.id });
  return { code: 200, data };
};

const register = async ({ displayName, email, password, image }) => {
  const validUser = await User.findOne({ where: { email } });
  if (validUser) return { code: 409, message: 'User already registered' };
  const newUser = await User.create({ displayName, email, password, image });
  const data = token.createToken({ id: newUser.id });
  return { code: 201, data };
};

const findAll = async () => {
  const data = await User.findAll({ attributes: { exclude: ['password'] } });
  if (!data.length) return { code: 404, message: 'Not Found' };
  return { code: 200, data };
};

module.exports = {
  login,
  register,
  findAll,
};