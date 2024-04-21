const express = require("express");
const brandController = require("./../controllers/brand.controller");
const admin = require("../middlewares/admin");
const manager = require("../middlewares/manager");
const router = express.Router();

router
  .route("/")
  .get(brandController.getAllBrands)
  .post(
    admin.authMiddleware,
    brandController.uploadImages,
    brandController.resizeImages,
    brandController.createBrand
  );

router
  .route("/:id")
  .get(brandController.getBrand)
  .patch(
    admin.authMiddleware,
    brandController.uploadImages,
    brandController.resizeImages,
    brandController.updateBrand
  )
  .delete(admin.authMiddleware, brandController.deleteBrand);

module.exports = router;
