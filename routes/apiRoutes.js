var db = require("../models");
console.log(db.itemTable);

module.exports = function(app) {
  app.get("/api/events", function(req, res) {
    db.events.findAll({}).then(function(dbEvents) {
      res.json(dbEvents);
    });
  });

  app.post("/host", function(req, res) {
    console.log(req.body.date + " " + req.body.time + ":00");
    
    db.eventTable.create({host_name: req.body.hostName, host_id: 1, event_name: req.body.eventName, event_location: req.body.location, event_date: req.body.date + " " + req.body.time + ":00", event_description: req.body.description, category: req.body.type}).then(function(dbEvents) {
      console.log(dbEvents.get({plain: true}));
      res.render("host2", {event_id: dbEvents.get({plain: true}).id})
      
    
    });
  });
  // Create a new example
  app.post("/host2", function(req, res) {
    console.log(req.body);
    if (Array.isArray(req.body.yourName)) {
    for (var i = 0; i < req.body.yourName.length; i++)
    db.itemTable.create({event_id: req.body.mydata[i], item: req.body.itemName[i], quantity: req.body.quantity[i], item_type: req.body.type[i], cost: req.body.cost[i], bringer_id: 2, bringer_name: req.body.yourName[i]}).then(function(dbItems) {
      // console.log(res.json(dbItems));
    });
  }
  else {
    db.itemTable.create({event_id: req.body.mydata, item: req.body.itemName, quantity: req.body.quantity, item_type: req.body.type, cost: req.body.cost, bringer_id: 2, bringer_name: req.body.yourName}).then(function(dbItems) {

      // console.log(res.json(dbItems));
    });
  }
  });

  // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });
};
