var db = require("../models");
const Op = db.Sequelize.Op
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index", { user: req.user });
  });


app.get("/host", function (req, res) {
  res.render("host", {user: req.user});
});
app.get("/host/:id", function (req, res) {
  res.render("host2", {event_id: req.params.id});
});
app.get("/view/:category?", function (req, res) {
  if (req.params.category) {
    var category = req.params.category;
  }
  else{
    var category = {[Op.ne]: null};
  }
  var search = "event_date";
  db.eventTable.findAll({
    order: [[search]],
    limit: 10,
    where: {
      "category": category,
      event_date: {
      [Op.gte]: Date.now()
    }
  }
  }).then(function(dbEvents) {
    res.render("view", {
      events: dbEvents
    });
});
});
app.get("/viewby/:search/:category?", function (req, res) {
  console.log(req.params.category);
  console.log(category);
  if (req.params.category) {
    var category = req.params.category;
  }
  else{
    var category = {[Op.ne]: null};
  }
  console.log(category);
  var search = req.params.search;
  db.eventTable.findAll({
    order: [search],
    limit: 10,
    where: {
      "category": category,
      event_date: {
      [Op.gte]: Date.now()
    }
  }
  }).then(function(dbEvents) {
    res.render("view", {
      events: dbEvents
    });
});
});

app.get("/view2", function (req, res) {
  res.render("view2")
})

app.get("/view2/:id?", function (req, res) {
  
})

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
