const Sequelize = require("sequelize");
const sequelize = require("../../../utils/database");

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    firstName: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING(50)
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    confirmation_password: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    role: {
      type: Sequelize.ENUM("user", "admin", "veterinary", "manager"),
      defaultValue: "user"
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    country: {
      type: Sequelize.STRING(100)
    },
    streetAddress: {
      type: Sequelize.STRING(100)
    },
    about: {
      type: Sequelize.STRING(300)
    },
    imageCover: {
      type: Sequelize.STRING(100)
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true
    },
    googleId: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  {
    timestamps: true,
    tableName: "users"
  }
);



module.exports = User;
