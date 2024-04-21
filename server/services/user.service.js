const userRepository = require("../repositories/user.repository");
const User = require("../database/mssql/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const exphbs = require("express-handlebars");
const path = require("path");
const fs = require("fs");

const sendEmail = async (user, token, templateFileName, subject) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.USER_PASSWORD
    }
  });

  try {
    const templatePath = path.join(
      __dirname,
      "../utils/mail/templates",
      templateFileName
    );
    const template = fs.readFileSync(templatePath, "utf-8");

    const html = template
      .replace("{{firstName}}", user.firstName)
      .replace("{{link}}", `http://localhost:3000/${token}/set-password`);

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: subject,
      html: html
    });

    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

exports.sendEmailToUser = async (user, token) => {
  await sendEmail(user, token, "welcome.hbs", "Welcome to Paws&Care!");
};

exports.sendForgetPasswordLinkToUser = async (user, token) => {
  await sendEmail(user, token, "forgotPassword.hbs", "Forget Password Link");
};
exports.findUserByEmail = async (email) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

exports.generateTokenForUser = async (user) => {
  const payload = { email: user.email, sub: user.id };
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d"
  });
  user.token = token;
  await user.save();
  return token;
};

exports.forgetPasswordSetPassword = async (
  token,
  { password, confirmation_password }
) => {
  const decoded = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );
  const user = await userRepository.findUserByEmail(decoded.email);

  if (password !== confirmation_password) {
    throw new Error("Passwords are not the same!");
  }

  const hashPassword = await userRepository.hashPassword(password);
  user.password = hashPassword;
  user.confirmation_password = hashPassword;
  user.token = null;
  await user.save();

  return user;
};

exports.register = async (
  firstName,
  email,
  password,
  confirmation_password,
  role
) => {
  if (password !== confirmation_password) {
    return {
      status: 400,
      message: "Password and Confirm Password don't match"
    };
  }

  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    return {
      status: 400,
      message: "User already exists"
    };
  }

  const hashPassword = await userRepository.hashPassword(password);

  const newUser = {
    firstName,
    email,
    password: hashPassword,
    confirmation_password: hashPassword,
    role
  };

  const createdUser = await userRepository.createUser(newUser);

  const token = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "5d"
  });
  const registerUser = {
    firstName,
    email
  };

  return { user: registerUser, token };
};

exports.refreshToken = async (refreshToken) => {
  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_KEY
    );

    if (!decodedToken) {
      return {
        status: 400,
        message: "Invalid token"
      };
    }

    const { id, email } = decodedToken;

    const user = await userRepository.findById(id);

    if (!user) {
      return {
        status: 400,
        message: "User not found"
      };
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2h"
      }
    );

    const newRefreshToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_REFRESH_SECRET_KEY,
      {
        expiresIn: "1d"
      }
    );

    return {
      status: 200,
      message: "Token refreshed successfully",
      access_token: accessToken,
      refresh_token: newRefreshToken
    };
  } catch (error) {
    return {
      status: 400,
      message: "Invalid or expired refresh token"
    };
  }
};

exports.login = async (email, password) => {
  try {
    if (!email || !password) {
      return {
        status: 400,
        message: "All Fields are Required"
      };
    }

    const user = await userRepository.findUserByEmail(email);

    if (!user || !user.isActive) {
      return {
        status: 400,
        message: "Invalid credentials"
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const access_token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "2h"
        }
      );
      const refreshToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_REFRESH_SECRET_KEY,
        {
          expiresIn: "1d"
        }
      );

      return {
        status: 200,
        message: "Login Success",
        access_token: access_token,
        refresh_token: refreshToken
      };
    } else {
      return {
        status: 400,
        message: "Invalid credentials"
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Unable to Login"
    };
  }
};

exports.deactivateUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    console.log(user);
    if (!user) {
      throw new Error("User not found");
    }

    user.isActive = false;
    await user.save();

    return { message: "User deactivated successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to deactivate user");
  }
};

exports.getCurrentUser = async (userId) => {
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return {
      status: 404,
      message: "User not found"
    };
  }
  const currentUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    country: user.country,
    streetAddress: user.streetAddress,
    about: user.about,
    imageCover: user.imageCover,
    email: user.email,
    role: user.role
  };
  return currentUser;
};

exports.updateUser = async (
  user,
  firstName,
  lastName,
  country,
  streetAddress,
  about,
  imageCover,
  email,
  password,
  role
) => {
  if (email && email !== user.email) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already exists");
    }
    user.email = email;
  }

  if (firstName && firstName !== user.firstName) {
    user.firstName = firstName;
  }

  if (country && country !== user.country) {
    user.country = country;
  }

  if (lastName && lastName !== user.lastName) {
    user.lastName = lastName;
  }
  if (about && about !== user.about) {
    user.about = about;
  }
  if (streetAddress && streetAddress !== user.streetAddress) {
    user.streetAddress = streetAddress;
  }
  if (imageCover && imageCover !== user.imageCover) {
    user.imageCover = imageCover;
  }

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user.password = hashPassword;
  }

  if (role && ["user", "admin", "veterinary", "manager"].includes(role)) {
    user.role = role;
  }

  await user.save();

  const updatedUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    country: user.country,
    streetAddress: user.streetAddress,
    about: user.about,
    imageCover: user.imageCover,
    email: user.email,
    role: user.role
  };

  return updatedUser;
};
exports.getAllUsers = async () => {
  const users = await userRepository.getAllUsers({
    attributes: ["id", "firstName", "email", "role", "isActive"]
  });
  return users;
};
exports.findUserById = async (userId) => {
  try {
    const user = await userRepository.findById(userId);
    if (!user) {
      return {
        status: 404,
        message: "User not found"
      };
    }
    return {
      status: 200,
      user: user
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error finding user"
    };
  }
};
