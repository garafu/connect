const router = require("express").Router();

router.get("/", (req, res, next) => {
  return res.render("./index.ejs");
});

module.exports = router;