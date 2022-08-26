const { User } = require('../models');
const token = require('../helpers/jwt');

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user) return { code: 400, message: 'Invalid fields' };

  const data = token.createToken({ id: user.id });
  return { code: 200, data };
};

module.exports = {
  login,
};