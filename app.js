const path = require("path");
const bodyparser = require("body-parser");
const express = require("express");
const app = express();

app.use("/public", express.static(path.join(__dirname, "/public")));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use("/", require("./routes/index.js"));
app.use("/postgresql", require("./routes/postgresql.js"));
app.use("/mysql", require("./routes/mysql.js"));
app.use("/mssql", require("./routes/mssql.js"));

app.listen(3000);