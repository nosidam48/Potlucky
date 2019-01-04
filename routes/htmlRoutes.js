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


<<<<<<< HEAD
  app.get("/host", function (req, res) {
    res.render("host", { user: req.user });
  });
  app.get("/host/:id", function (req, res) {
    res.render("host2", { event_id: req.params.id });
  });
  app.get("/view/:category?/:search?", function (req, res) {
    if (req.params.category) {
      var category = req.params.category;
    }
    else {
      var category = "";
    }
    if (req.params.search) {
      var search = req.params.search;
    }
    else {
      var search = "event_date";
    }
    db.eventTable.findAll({
      limit: 10,
      where: {
        "category": category,
        event_date: {
          [Op.gte]: Date.now()
        }
      },
      order: [search]

    }).then(function (dbEvents) {
      res.render("view", {
        events: dbEvents
      });
    });
  });
  app.get("/login", function (req, res) {
    if (req.user) {
      res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  app.get("/signup", function (req, res) {
    if (req.user) {
      res.redirect("/")
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  app.get("*", function (req, res) {
    res.render("404");
  });
=======
app.get("/host", function (req, res) {
  res.render("host", {user: req.user});
});
app.get("/host/:id", function (req, res) {
  res.render("host2", {event_id: req.params.id});
});
app.get("/view/:category?/:search?", function (req, res) {
  if (req.params.category) {
    var category = req.params.category;
  }
  else{
    var category = {[Op.ne]: null};
  }
  if (req.params.search) {
    var search = req.params.search;
  }
  else {
    var search = "event_date";
  }
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
>>>>>>> 54e92fb2bab26300dd497678569b21cd14b6acc5
};
