// variables to require models and passport
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // A get route to retrieve all events from event table
  app.get("/api/events", function (req, res) {
    db.events.findAll({}).then(function (dbEvents) {
      res.json(dbEvents);
    });
  });

  // A post route at /host that takes the information from the event form and creates a new event with that information
  app.post("/host", function (req, res) {
    console.log(req.body.date);
    console.log(req.body.date + " " + req.body.time);
    // Creating the new event table with form info
    db.eventTable.create({ host_name: req.body.host_name, event_name: req.body.eventName, event_location: req.body.location, event_date: (req.body.date + "T" + req.body.time+":00.000Z"), event_description: req.body.description, category: req.body.type }).then(function (dbEvents) {
      console.log(dbEvents.get({ plain: true }));
      // display host2 and send it the event_id 
      res.render("host2", { event_id: dbEvents.get({ plain: true }).id })


    });
  });
  
  // Create a new example
  app.post("/host2", function (req, res) {
    console.log(req.body);
    // If there are multiple items
    db.itemTable.destroy({
      where: {
          event_id: req.body.mydata
      }
  })
    if (Array.isArray(req.body.itemName)) {
      // A for loop to add each item from the forms to the itemtable
      for (var i = 0; i < req.body.itemName.length; i++)
        db.itemTable.create({ event_id: req.body.mydata, item: req.body.itemName[i], quantity: req.body.quantity[i], item_type: req.body.type[i], cost: req.body.cost[i] }).then(function (dbItems) {
        });
    }
    // Else just insert one item to the itemtable
    else {
      db.itemTable.create({ event_id: req.body.mydata, item: req.body.itemName, quantity: req.body.quantity, item_type: req.body.type, cost: req.body.cost }).then(function (dbItems) {
      });
    }
  });
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      username: req.body.username,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.email,
        id: req.user.id
      });
    }
  });
};

