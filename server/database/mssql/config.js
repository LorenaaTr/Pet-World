const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config();

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE,
  options: JSON.parse(process.env.OPTIONS),
  port: parseInt(process.env.PORT)
};

module.exports = config;
