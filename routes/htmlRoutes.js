var db = require("../models");
const Op = db.Sequelize.Op
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.eventTable.findAll({
      limit: 1,
      order: [["event_date"]],
      where: {
        event_date: {
          [Op.gte]: Date.now()
        }
      }
    }).then(function (dbEvents) {
      res.render("index", { events: dbEvents, user: req.user });
    })
  });

  // A get route at host to display the host.handlebars page
  app.get("/host", function (req, res) {
    res.render("host", { user: req.user });
  });

  // A get route at host/:id to diplay the host 2 form with the event ID accessible
  app.get("/host/:id", function (req, res) {
    db.itemTable.findAll({
      where: {
        event_id: req.params.id
      }
    }).then(function (dbItems) {
      res.render("host2", {
        event_id: req.params.id,
        user: req.user,
        items: dbItems
      });
    });
  });
  // A get route at view/:category to display the events by a certain category (category decided by the HTML dropdown bar)
  app.get("/view/:category?", function (req, res) {
    // If there's a category create a variable to hold the current category from req.params
    if (req.params.category) {
      var category = req.params.category.toLowerCase();
    }
    // Else let category be null (display all events)
    else {
      var category = { [Op.ne]: null };
    }
    var search = "event_date";
    db.eventTable.findAll({
      order: [[search]],
      limit: 20,
      where: {
        "category": category,
        event_date: {
          [Op.gte]: Date.now()
        }
      }
    }).then(function (dbEvents) {
      res.render("view", {
        events: dbEvents,
        user: req.user
      });
    });
  });

  // A get route for view2/:id that diplays the items for a specific event by the eventID (req.params.id)
  app.get("/view2/:id?", function (req, res) {
    var eventId = req.params.id;

    return Promise.all([
      db.itemTable.findAll({
        where: {
          event_id: eventId
        }
      }),
      db.eventTable.findOne({
        where: {
          id: eventId
        }
      })
    ]).then(function(values) {
      const dbItems = values[0]
      const dbEvents = values[1]
        res.render("view2", {
          user: req.user,
          items: dbItems,
          events: dbEvents,
          helpers: {
            math: function (value, options) { return parseInt(value) + 1; }
          }
        })
      })
    })

  // A get route to display the login page
  app.get("/login", function (req, res) {
    if (req.user) {
      res.redirect("/");
    }
    res.render("login");
  });
  // A get route to display the signup page
  app.get("/signup", function (req, res) {
    if (req.user) {
      res.redirect("/")
    }
    res.render("signup");
  });

  // A get route for showing which parties a user is hosting by category
  app.get("/hostview/:category?", function(req, res) {
    if (req.params.category) {
      var category = req.params.category;
    }
    else {
      var category = { [Op.ne]: null };
    }
    db.eventTable.findAll({
      where: {
        "category": category,
        "host_name": req.user.username
      }
    }).then(function (dbEvents) {
      res.render("view", {
        user: req.user,
        events: dbEvents,
        hv: true
      })
    })
  
  })

  // A get route for showing all parties hosted by the current user
  app.get("/hostview2/:id", function(req, res) {
    db.itemTable.findAll({
      where: {
        event_id: req.params.id
      }
    }).then(function (dbItems) {
      res.render("host2", {
        event_id: req.params.id,
        user: req.user,
        items: dbItems
      });
    });
  })
  // A get route to display the homepage if the route is anything unknown
  app.get("*", function (req, res) {
    res.render("index");
  });
};
