const router = require("express").Router();
const { Connection } = require("tedious");
const pretty = require("json-beautify");
const clone = require("../lib/clone.js");

router.get("/", (req, res, next) => {
  return res.render("./mssql.ejs");
});

router.post("/", async (req, res, next) => {
  var body = req.body;

  try {
    var con = new Connection({
      server: body.host,
      authentication: {
        type: "default",
        options: {
          userName: body.username,
          password: body.password
        }
      },
      options: {
        encrypt: (body.ssl === "on" ? true : undefined),
        port: (body.port ? parseInt(body.port) : undefined),
        database: body.database
      }
    });
    con.on("connect", (error) => {
      if (error) {
        var data = clone(error);
        res.status(500).end(pretty(data, null, 2, 80));
      } else {
        res.end("success");
      }
      con.close();
    });
    con.connect();

  } catch (error) {
    return res.status(500).end(pretty(error, null, 2, 80));
  }
});

module.exports = router;