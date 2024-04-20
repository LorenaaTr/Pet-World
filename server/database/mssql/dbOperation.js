const config = require("./config");

const sql = require("mssql");

const getTest = async () => {
  try {
    let pool = await sql.connect(config);
    let tests = pool.request().query("SELECT * from Test");
    console.log(tests);
    return tests;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getTest };
