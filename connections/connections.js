
require('dotenv').config();
var mysql = require("mysql");

var connection;

if(process.env.JAWSDB_URL)
{	connection = mysql.createConnection(process.env.JAWSDB_URL);
} 
else{
	connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "Wingchuncat123!",
	database: "jobmancer"
  });
}
connection.connect(function(err){
	if(err){
		console.log("error connecting: " + err.stack);
		return;
	}
	console.log("connected as id " + connection.threadId);
});

module.exports = connection;


//add to orms.js
//INSERT INTO accounts (id, username, pass, email) VALUES (1, `test`, `test`, `test@test.com`);
//INSERT INTO accounts (id, username, pass, email) VALUES (1, egreen, evangreen44, test@test.com);
