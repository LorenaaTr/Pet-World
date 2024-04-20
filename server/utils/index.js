const config = require("../mssql/config");
const { Sequelize } = require("sequelize");
const User = require("./models/user");
//const Products = require("../mongodb/models/products");

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.server,
  dialect: "mssql",
  port: config.port,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

//const orderProducts = sequelize.define("order_products", {});
// Order.belongsTo(User);
// User.hasMany(Order);

//Order.belongsToMany(Products, { through: orderProducts });
//Products.belongsToMany(Order, { through: orderProducts });

sequelize.sync({ alter: true });

module.exports = sequelize;
