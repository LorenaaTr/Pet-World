const User = require("../database/mssql/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.createUser = async (newUser) => {
  const user = new User(newUser);
  await user.save();
  return user;
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ where: { email: email } });
};

exports.hashPassword = async (password) => {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
};

exports.findById = async (userId) => {
  return await User.findByPk(userId);
};
exports.getAllUsers = async (options) => {
  const users = await User.findAll(options);
  return users;
};
