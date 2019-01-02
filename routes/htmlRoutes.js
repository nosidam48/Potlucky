var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
});

app.get("/host", function (req, res) {
  res.render("host");

});

app.get("/view", function (req, res) {
  db.eventTable.findAll({
    limit: 10,
    where: {event_date: {
      [Op.gte]: Date.now()
    },
    sort: [event_date, ascending]
  }
  }).then(function(dbEvents) {
    res.render("view", {
      events: dbEvents
    });
});
});

app.get("/host2", function (req, res) {
  res.render("host2");
});

});

app.get("*", function (req, res) {
  res.render("404");
});
};
