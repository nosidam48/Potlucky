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
      where: {event_date: {
        [Op.gte]: Date.now()
      }
    }
    }).then(function (dbEvents) {
    res.render("index", { event: dbEvents, user: req.user });
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
      var category = req.params.category;
    }
    // Else let category be null (display all events)
    else {
      var category = { [Op.ne]: null };
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
    }).then(function (dbEvents) {
      res.render("view", {
        events: dbEvents,
        user: req.user
      });
    });
  });

  // app.get("/mypage", function(req, res) {
  //   let user = req.user.username
  //   db.eventTable.findAll({
  //     where: {
  //       host_name: user
  //     }
  //   })
  // })

  // A get route for searching events in different ways
  app.get("/viewby/:search/:category?", function (req, res) {
    if (req.params.category) {
      var category = req.params.category;
    }
    else {
      var category = { [Op.ne]: null };
    }
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
    }).then(function (dbEvents) {
      res.render("view", {
        events: dbEvents,
        user: req.user
      });
    });
  });

  // A get route for view2 that displays the view2 page
  app.get("/view2", function (req, res) {
    res.render("view2", { user: req.user })
  })

  // app.get("/view2/:id?", function (req, res) {
  //   var eventId = req.params.id;
  //   db.eventTable.findAll({
  //     where: {
  //       id: eventId
  //     }
  //   }).then(function(dbEvent) {
  //     res.render("view2", {
  //     events: dbEvent,
  //     })
  // })
  // });

  // A get route for view2/:id that diplays the items for a specific event by the eventID (req.params.id)
  app.get("/view2/:id?", function (req, res) {
    var eventId = req.params.id;
    db.itemTable.findAll({
      where: {
        event_id: eventId
      }
    }).then(function (dbItems) {
      res.render("view2", {
        user: req.user,
        items: dbItems,
        helpers: {
          math: function (value, options) { return parseInt(value) + 1; },
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
  // A get route to display the homepage if the route is anything unknown
  app.get("*", function (req, res) {
    res.render("index");
  });
};
