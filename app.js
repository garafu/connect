const path = require("path");
const bodyparser = require("body-parser");
const { Client } = require("pg");
const express = require("express");
const app = express();

app.use("/public", express.static(path.join(__dirname, "/public")));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get("/", (req, res, next) => {
  return res.render("index.ejs");
});

app.post("/", async (req, res, next) => {
  var body = req.body;

  try {
    var client = new Client({
      // connectionString: body.connectionString
      user: body.user,
      host: body.host,
      database: body.database,
      password: body.password,
      port: body.port,
      ssl: true
    });

    await client.connect();

  } catch (error) {
    return res.status(500).json(error.message);
  }

  return res.json("success");
});

app.listen(3000);