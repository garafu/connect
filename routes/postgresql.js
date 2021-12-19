const router = require("express").Router();
const { Client } = require("pg");
const pretty = require("json-beautify");

router.get("/", (req, res, next) => {
  return res.render("./postgresql.ejs");
});

router.post("/", async (req, res, next) => {
  var body = req.body;

  try {
    var client = new Client({
      user: body.user,
      host: body.host,
      database: body.database,
      password: body.password,
      port: body.port,
      ssl: (body.ssl === "on" ? true : undefined)
    });

    await client.connect();

  } catch (error) {
    return res.status(500).end(pretty(error, null, 2, 80));
  }

  return res.end("success");
});

module.exports = router;