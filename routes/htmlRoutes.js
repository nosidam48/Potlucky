var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
});

app.get("/host", function (req, res) {
  res.render("host");
});

app.get("/host2", function (req, res) {
  res.render("host2");
});

app.get("/view", function (req, res) {
  res.render("view");
});

app.get("*", function (req, res) {
  res.render("404");
});
};
