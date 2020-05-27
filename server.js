// ==============================================================================
// DEPENDENCIES
// ==============================================================================
require('dotenv').config();
const express = require('express');
const sendMail = require('./routes/mail');
const path = require('path');

// ==============================================================================
// EXPRESS CONFIGURATION
// ==============================================================================

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle DATA PARSING
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
// ================================================================================
// ROUTER
// ================================================================================

//post
app.post('/email', (req, res) => {
    const {subject, email, text} = req.body;
    console.log('Data: ', req.body);

    sendMail(email, subject, text, function(err, data){
      if (err){
        res.status(500).json({message: 'Error: 01F4 (internal error)'})
      }
      else{
        res.json({message: 'Email Sent Successfully'})
      }
    });
});

//get
app.get('/', function(req, res){
  res.redirect('/login');
});
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contactpage.html'));
})
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
})
// =============================================================================
// LISTENER
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
