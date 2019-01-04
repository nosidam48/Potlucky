var db = require("../models");
const Op = db.Sequelize.Op
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index", {user: req.user});
});


app.get("/host", function (req, res) {
  res.render("host");
});
app.get("/host/:id", function (req, res) {
  res.render("host2", {event_id: req.params.id});
});
app.get("/view", function (req, res) {
  db.eventTable.findAll({
    limit: 10
    // where: {event_date: {
    //   [Op.gte]: Date.now()
    // },
    // sort: [event_date, ascending]
  
  }).then(function(dbEvents) {
    res.render("view", {
      events: dbEvents
    });
});
});
app.get("/login", function(req, res) {
  if (req.user) {
    res.redirect("/");
  }
  res.render("login");
});
app.get("/signup", function(req, res) {
  if (req.user) {
    res.redirect("/")
  }
  res.render("signup");
});
app.get("*", function (req, res) {
  res.render("404");
});
};
