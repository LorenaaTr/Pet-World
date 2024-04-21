const Brand = require("../database/mongodb/models/brands.model");
const catchAsync = require("../utils/catchAsync");
const sharp = require("sharp");
const multer = require("multer");
const factory = require("../controllers/handlerFactory");
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

exports.uploadImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 6 }
]);

exports.resizeImages = catchAsync(async (req, res, next) => {
  if (!req.files || !req.files.imageCover || !req.files.images) {
    return next();
  }

  const imageCoverFilename = `brands-${Date.now()}-cover.jpeg`;
  const imageFilenames = req.files.images.map(
    (file, i) => `brands-${Date.now()}-${i + 1}.jpeg`
  );

  await sharp(req.files.imageCover[0].buffer)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/brands/${imageCoverFilename}`);

  cloudinary.uploader.upload(
    `./public/img/brands/${imageCoverFilename}`,
    {
      folder: "LabCourse2",
      public_id: imageCoverFilename
    },
    function (error, result) {
      console.log(result, error);
    }
  );

  req.body.imageCover = imageCoverFilename;

  await Promise.all(
    req.files.images.map(async (file, i) => {
      await sharp(file.buffer)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/brands/${imageFilenames[i]}`);

      cloudinary.uploader.upload(
        `./public/img/brands/${imageFilenames[i]}`,
        {
          folder: "LabCourse2",
          public_id: imageFilenames[i]
        },
        function (error, result) {
          console.log(result, error);
        }
      );
    })
  );

  req.body.images = imageFilenames;

  next();
});
exports.getAllBrands = factory.getAll(Brand);
exports.getBrand = factory.getOne(Brand);
exports.createBrand = factory.createOne(Brand);
exports.updateBrand = factory.updateOne(Brand);
exports.deleteBrand = factory.deleteOne(Brand);
