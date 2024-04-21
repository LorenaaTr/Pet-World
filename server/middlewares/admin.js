const User = require("../database/mssql/models/user");
const jwt = require("jsonwebtoken");
exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ where: { id: decodedToken.id } });

    if (!user) {
      throw new Error("Invalid Token");
    }

    if (user.role !== "admin") {
      throw new Error("User is not authorized to access this resource");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ status: "failed", message: "Unauthorized" });
  }
};
