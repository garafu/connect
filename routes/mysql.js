const router = require("express").Router();
const mysql = require("mysql2/promise");
const pretty = require("json-beautify");

router.get("/", (req, res, next) => {
  return res.render("./mysql.ejs");
});

router.post("/", async (req, res, next) => {
  var body = req.body;

  try {
    var con = await mysql.createConnection({
      host: body.host,
      port: body.port,
      database: body.database,
      user: body.user,
      password: body.password,
      ssl: {
        rejectUnauthorized: (body.ssl === "on" ? true : undefined)
      }
    });
    await con.connect();
    await con.end();

  } catch (error) {
    return res.status(500).end(pretty(error, null, 2, 80));
  }

  return res.end("success");
});

module.exports = router;