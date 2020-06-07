// ==============================================================================
// DEPENDENCIES
// ==============================================================================
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

//Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;

// require('dotenv').config();
// const express = require('express');
// const sendMail = require('./routes/mail');
// const path = require('path');
// var session = require('express-session');
// var bodyParser = require('body-parser');
// const mysql = require('mysql2')

// const db = require('./config/database');
// // ==============================================================================
// // EXPRESS CONFIGURATION
// // ==============================================================================

// const app = express();

// const PORT = process.env.PORT || 8080;

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.use(express.static('public'));

// db.authenticate()
//     .then(() => console.log('Database connected...'))
//     .catch(err => console.log('Error: ' + err))

// // ================================================================================
// // ROUTER
// // ================================================================================

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);
// require("./routes/authRoutes")(app);

// // =============================================================================
// // LISTENER
// // =============================================================================
// app.listen(PORT, function () {
//   console.log("App listening on PORT: " + PORT);
// });
