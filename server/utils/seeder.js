const bcrypt = require("bcrypt");
const User = require("../database/mssql/models/user");
const dotenv = require("dotenv");

dotenv.config();
const users = [
  {
    firstName: "Admin",
    email: "admin@pawscare.com",
    password: process.env.PASSWORD_ADMIN,
    confirmation_password: process.env.PASSWORD_ADMIN,
    role: "admin"
  },
  {
    firstName: "Manager",
    email: "manager@pawscare.com",
    password: process.env.PASSWORD_MANAGER,
    confirmation_password: process.env.PASSWORD_MANAGER,
    role: "manager"
  },
  {
    firstName: "Veterinary",
    email: "veterinary@pawscare.com",
    password: process.env.PASSWORD_VETERINARY,
    confirmation_password: process.env.PASSWORD_VETERINARY,
    role: "veterinary"
  },
  {
    firstName: "user",
    email: "user@pawscare.com",
    password: process.env.PASSWORD_USER,
    confirmation_password: process.env.PASSWORD_USER,
    role: "user"
  }
];

async function seed() {
  try {
    const salt = await bcrypt.genSalt(10);

    for (let user of users) {
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
      user.confirmation_password = hashedPassword;
    }

    await User.bulkCreate(users);

    console.log("Seed complete");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
