var db = require("../models");
const Op = db.Sequelize.Op
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
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

app.get("*", function (req, res) {
  res.render("404");
});
};
