// ==============================================================================
// DEPENDENCIES
// ==============================================================================
require('dotenv').config();
const express = require('express');
const sendMail = require('./routes/mail');
const path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var orm = require('./connections/orm')
// ==============================================================================
// EXPRESS CONFIGURATION
// ==============================================================================

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle DATA PARSING
/*
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
*/
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// ================================================================================
// ROUTER
// ================================================================================

//post
app.post('/email', (req, res) => {
  const { subject, email, text } = req.body;
  console.log('Data: ', req.body);

  sendMail(email, subject, text, function (err, data) {
    if (err) {
      res.status(500).json({ message: 'Error: 01F4 (internal error)' })
    }
    else {
      res.json({ message: 'Email Sent Successfully' })
    }
  });
});

app.post('/auth', function (request, response) {
  var email = request.body.email;
  var password = request.body.password;
  if (email && password) {
    orm.fetchPasswordForUser(email, password, function (results) {
      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.email = email;
        response.redirect('/home');
      } else {
        response.send('Incorrect Email and/or Password!');
      }
      response.end();
    });
  } 
  else {
    response.send('Please enter Email and Password!');
    response.end();
  }
});

app.post('/signinauth', function (request, response) {
  var email = request.body.email;
  var password = request.body.password;
  if (email && password) {
    orm.createAccount(email, password, function (results) {
      if (results.length > 0) {
        request.session.email = email;
        request.session.password = password;
        response.redirect('/login');
      } else {
        response.send('Invalid Email and/or Password!');
      }
      response.end();
    });
  } 
  else {
    response.send('Please enter a valid Email and Password!');
    response.end();
  }
});


//get

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.get('/resumeBuilder', function(req, res) {
// 	if (req.session.loggedin) {
//     res.sendFile(path.join(__dirname, 'public', 'get-started.html'));
// 		res.send('Welcome, ' + req.session.email + '!');
// 	} else {
// 		res.send('Please login to view this page!');
// 	}
// 	res.end();
// });

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contactpage.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// =============================================================================
// LISTENER
// =============================================================================

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
