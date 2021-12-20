const router = require("express").Router();
const ping = require("ping");
const pretty = require("json-beautify");
const clone = require("../lib/clone.js");

router.get("/", (req, res, next) => {
  return res.render("./ping.ejs");
});

router.post("/", async (req, res, next) => {
  var body = req.body;

  try {
    var result = await ping.promise.probe(body.host);
    return res
      .header("Content-Type", "text/plain")
      .end(pretty(result, null, 2, 80));
  } catch (error) {
    return res
      .status(500)
      .header("Content-Type", "text/plain")
      .end(pretty(clone(error), null, 2, 80));
  }
});

module.exports = router;