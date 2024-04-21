const User = require("../database/mssql/models/user");
const jwt = require("jsonwebtoken");
exports.authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Authorization header missing");
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ where: { id: decodedToken.id } });

    if (!user) {
      throw new Error("Invalid Token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ status: "failed", message: "Unauthorized" });
  }
};
