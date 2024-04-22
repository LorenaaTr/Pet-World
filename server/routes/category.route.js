const express = require("express");
const categoryController = require("../controllers/category.controller");
const admin = require("../middlewares/admin");
const router = express.Router();

router
  .route("/")
  .get(categoryController.getAll)
  .post(
    admin.authMiddleware,
    categoryController.uploadCategoryImages,
    categoryController.resizeCategoryImages,
    categoryController.createCategory
  );

router
  .route("/:id")
  .get(categoryController.getCategoryById)
  .patch(
    admin.authMiddleware,
    categoryController.uploadCategoryImages,
    categoryController.resizeCategoryImages,
    categoryController.updateCategory
  )
  .delete(admin.authMiddleware, categoryController.deleteCategory);
module.exports = router;
