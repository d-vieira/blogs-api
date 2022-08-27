const joi = require('joi');

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const login = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: 'Some required fields are missing' });
  next();
};

const registerSchema = joi.object({
  displayName: joi.string().min(8).required().messages({ 
    'any.required': '"displayName" length must be at least 8 characters long',
  }),
  email: joi.string().email().required().messages({
    'any.required': '"email" must be a valid email',
  }),
  password: joi.string().min(6).required().messages({
    'any.required': '"password" length must be at least 6 characters long',
  }),
  image: joi.string(),
});

const register = (req, res, next) => {
  const validation = registerSchema.validate(req.body);
  const { error } = validation;
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

const categorySchema = joi.object({
  name: joi.string().required(),
});

const category = (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) return res.status(400).json({ message: '"name" is required' });
  next();
};

module.exports = {
  login,
  register,
  category,
};
