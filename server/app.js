const express = require("express");
const sequelize = require("./utils/database.js");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
//const dbOperation = require("./database/mssql/dbOperation.js");
const cors = require("cors");

dotenv.config({ path: "./env" });

const app = express();

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



const port = process.env.PORTAPP || 3001;
app.listen(port,  () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
