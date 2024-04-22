const express = require("express");
const sequelize = require("./utils/database.js");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRoute = require("./routes/auth");
const session = require("express-session");
const User = require("./database/mssql/models/user");
const jwt = require("jsonwebtoken");
const dbOperation = require("./database/mssql/dbOperation.js");
const exphbs = require("express-handlebars").create();
const cors = require("cors");
const categoryRouter = require("./routes/category.route");


require("./utils/cloudinary");



//const dbOperation = require("./database/mssql/dbOperation.js");

const app = express();

dotenv.config({ path: "./env" });



const DB = process.env.DATABASEMongo.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB)
.then(() => {
  console.log("DB connection successful!");
})
.catch((error) => {
  console.error("Error connecting to the database:", error);
});

app.use(logger("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Define your routes here
// Example: app.use("/users", require("./routes/users"));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRoute);
app.use("/category", categoryRouter);



const port = process.env.PORTAPP || 3001;
app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await sequelize.sync();
});
module.exports = app;
