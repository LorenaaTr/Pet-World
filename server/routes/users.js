var express = require("express");
var router = express.Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const UserController = require("../controllers/user.controller");

router.post("/register", UserController.register);
router.patch("/:token/setPassword", UserController.forgotOrSetPassword);
router.patch("/forgotPassword", UserController.forgetPasswordEmail);
router.post("/create", admin.authMiddleware, UserController.createUser);
router.post("/refreshToken", UserController.refreshToken);
router.post(
  "/:userId/deactivate",
  admin.authMiddleware,
  UserController.deactivateUser
);
router.post("/login", UserController.userLogin);
router.get("/me", auth.authMiddleware, UserController.getCurrentUser);
router.get("/:userId", UserController.getUserById);
router.get("/", UserController.getAllUsers);
router.patch(
  "/profile/:id",
  auth.authMiddleware,
  UserController.uploadUserImages,
  UserController.resizeUserImages,
  UserController.updateUser
);
router.patch(
  "/updateUser/:userId",
  admin.authMiddleware,
  UserController.uploadUserImages,
  UserController.resizeUserImages,
  UserController.updateUser
);

module.exports = router;
