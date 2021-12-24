const router = require("express").Router();
const pretty = require("json-beautify");
const clone = require("../lib/clone.js");

var serializeHeader = function (text = "") {
  var headers = {}, rows, items;

  rows = text.split(/\r\n|\n/g);

  for (let row of rows) {
    items = (row || "").match(/^(.*?): (.*)/) || [];
    if (items.length === 3) {
      headers[items[1]] = items[2];
    }
  }

  return headers;
};

var deserializeHeader = function (arr = {}) {
  var text = "";

  for (let key in arr) {
    text += `${key}: ${(arr[key] || "").toString()}\n`;
  }

  return text;
};

router.get("/", (req, res, next) => {
  return res.render("./https.ejs");
});

router.post("/", async (req, res, next) => {
  var form = req.body;
  var headers = serializeHeader(form.header);
  var body = form.body;

  const webclient = require("../lib/webclient.js");
  try {
    var response = await webclient.request({
      method: form.method,
      url: form.url,
      headers,
      body
    });
    return res
      .status(200)
      .header("Content-Type", "text/plain")
      .end(
        `HTTP/${response.httpVersion} ${response.statusCode} ${response.statusMessage}\n` +
        deserializeHeader(response.headers) +
        `\n` +
        response.data
      );
  } catch (error) {
    return res
      .status(500)
      .header("Content-Type", "text/plain")
      .end(pretty(clone(error), null, 2, 80));
  }
});

module.exports = router;