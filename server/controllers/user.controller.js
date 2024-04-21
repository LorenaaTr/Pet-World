const User = require("../database/mssql/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const userService = require("../services/user.service");
const userRepository = require("../repositories/user.repository");
const multer = require("multer");
const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");
const Brand = require("../database/mongodb/models/brands.model");
const Products = require("../database/mongodb/models/products");
const Category = require("../database/mongodb/models/categories.model");
const multerStorage = multer.memoryStorage();
const cloudinary = require("../utils/cloudinary");
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserImages = upload.fields([{ name: "imageCover", maxCount: 1 }]);

exports.resizeUserImages = catchAsync(async (req, res, next) => {
  if (!req.files || !req.files.imageCover) {
    return next();
  }

  const imageCoverFilename = `user-${Date.now()}-cover.jpeg`;

  await sharp(req.files.imageCover[0].buffer)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/user/${imageCoverFilename}`);

  cloudinary.uploader.upload(
    `./public/img/user/${imageCoverFilename}`,
    {
      folder: "LabCourse2",
      public_id: imageCoverFilename,
    },
    function (error, result) {
      console.log(result, error);
    }
  );

  req.body.imageCover = imageCoverFilename;

  next();
});
exports.register = async (req, res) => {
  try {
    const { firstName, email, password, confirmation_password, role } =
      req.body;
    const response = await userService.register(
      firstName,
      email,
      password,
      confirmation_password,
      role
    );

    if (response.status === 400) {
      return res.status(400).send({
        status: "failed",
        message: response.message,
      });
    }

    const { user, token } = response;

    res.status(201).send({
      status: "success",
      message: "Registration Success",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "failed", message: "Unable to Register" });
  }
};

exports.googleLogin = async (req, res, next) => {
  try {
    const googleUser = req.user;

    let user = await User.findOne({
      where: { email: googleUser.emails[0].value },
    });

    if (!user) {
      user = await User.create({
        username: googleUser.displayName,
        email: googleUser.emails[0].value,
        password: "",
        googleId: googleUser.id,
      });
    } else if (!user.googleId) {
      user.googleId = googleUser.id;
      await user.save();
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ user, token });
  } catch (err) {
    next(err);
  }
};

exports.refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  try {
    const result = await userService.refreshToken(refreshToken);

    res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Unable to refresh token",
    });
  }
};

exports.deactivateUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const result = await userService.deactivateUser(parseInt(userId));
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to deactivate user" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await userService.login(email, password);
    res.status(response.status).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "failed", message: "Unable to Login" });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const currentUser = await userService.getCurrentUser(req.user.id);
    res.send({ status: "success", data: currentUser });
  } catch (error) {
    console.log(error);
    res.send({ status: "failed", message: "Unable to get current user" });
  }
};
exports.createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    about,
    country,
    streetAddress,
    imageCover,
    email,
    role,
    password,
    confirmation_password,
  } = req.body;

  const userRequest = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    about: abouty,
    country: country,
    imageCover: imageCover,
    streetAddress: streetAddress,
    email: email.trim().toLowerCase(),
    role: role,
    password: password,
    confirmation_password: confirmation_password,
  };

  const existingUser = await User.findOne({
    where: { email: userRequest.email },
  });
  if (existingUser) {
    return res.status(400).json({
      status: 400,
      message: "Email already exists",
    });
  }

  const payload = { email: userRequest.email };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "5d",
  });
  const user = await User.create({
    ...userRequest,
    token,
  });

  await userService.sendEmailToUser(user, token);

  res.json(user);
};

exports.updateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      country,
      email,
      streetAddress,
      about,
      imageCover,
      password,
      role,
    } = req.body;

    const userResponse = await userService.findUserById(req.params.userId);

    if (userResponse.status === 404 || !userResponse.user) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }
    const user = userResponse.user;

    if (req.user.role !== "admin" && role) {
      return res
        .status(403)
        .send({ status: "failed", message: "Unauthorized" });
    }

    const userModel = await userRepository.findById(user.id);

    const updatedUser = await userService.updateUser(
      userModel,
      firstName,
      lastName,
      country,
      streetAddress,
      about,
      imageCover,
      email,
      password,
      role
    );

    res.send({ status: "success", data: updatedUser });
  } catch (error) {
    console.log(error);
    res.send({ status: "failed", message: "Unable to update user" });
  }
};

exports.forgetPasswordEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userService.findUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User not found",
      });
    }

    const token = await userService.generateTokenForUser(user);

    await userService.sendForgetPasswordLinkToUser(user, token);

    res.json({ message: "Confirmation email is sent to the user!" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.forgotOrSetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmation_password } = req.body;

    if (!token) {
      throw new Error("Token is required");
    }

    if (!password || !confirmation_password) {
      throw new Error("Password and confirmPassword are required");
    }

    const user = await userService.forgetPasswordSetPassword(token, {
      password,
      confirmation_password,
    });

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.send({ status: "success", data: users });
  } catch (error) {
    console.log(error);
    res.send({ status: "failed", message: "Unable to get users" });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const user = await userService.findUserById(req.params.userId);
    res.send({ status: "success", data: user });
  } catch (error) {
    console.log(error);
    res.send({ status: "failed", message: "Unable to get user" });
  }
};
