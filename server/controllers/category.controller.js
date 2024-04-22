const Category = require("../database/mongodb/models/categories.model");
const categoryService = require("../services/category.service");
const mongoose = require("mongoose");
const multer = require("multer");
const catchAsync = require("../utils/catchAsync");
const sharp = require("sharp");
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
  fileFilter: multerFilter
});

exports.uploadCategoryImages = upload.fields([
  { name: "imageCover", maxCount: 1 }
]);

exports.resizeCategoryImages = catchAsync(async (req, res, next) => {
  if (!req.files || !req.files.imageCover) {
    return next();
  }

  const imageCoverFilename = `category-${Date.now()}-cover.jpeg`;

  await sharp(req.files.imageCover[0].buffer)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/category/${imageCoverFilename}`);

  cloudinary.uploader.upload(
    `./public/img/category/${imageCoverFilename}`,
    {
      folder: "LabCourse2",
      public_id: imageCoverFilename
    },
    function (error, result) {
      console.log(result, error);
    }
  );

  req.body.imageCover = imageCoverFilename;

  next();
});
exports.createCategory = async (req, res, next) => {
  try {
    const { name, type, imageCover, parentId } = req.body;

    const newCategory = await categoryService.createCategory(
      name,
      type,
      imageCover,
      parentId
    );

    res.status(201).json({ success: true, category: newCategory });
  } catch (error) {
    next(error);
  }
};
exports.getAll = async (req, res, next) => {
  try {
    const categories = await categoryService.findAll();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.status(200).json({ success: true, category });
  } catch (error) {
    next(error);
  }
};
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    res.status(200).json({ success: true, category });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    next(error);
  }
};
