var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require("mysql");

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'db1'
});

// var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})


connection.connect(function(err){
  if(!err){
    console.log("Database is connected");
  } else {
    console.log("Error connecting database");
  }
});

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   connection.query('select id, firstName from users ',
function(err, result, fields) {
    if (err) throw err;
    else {
        console.log('data present in users');
        console.log('----------------------------------');
        for (var i in result) {
            var users = result[i];
            console.log(users.id +': '+ users.firstName);
        }
    }
});
//    connection.query('insert into  users  (id, firstName) values (' + req.body.id + ', ' + req.body.firstName + ')',
// function selectCb(err, results) {
//     if (!err){ 
//       // throw err;
//             res.send('success');

//       console.log("The solution is:" ,response);}
//     else {
//       throw err;
//       // res.send('success');
//             console.log("Error while performing query");
//     }
// });
 response = {
      id:req.body.id,
      firstName:req.body.firstName
   };
    connection.query('insert into users(id,firstName) values(' + req.body.id + ',' + req.body.firstName + ')', function(error,result) {
    connection.end();
    if(!error) {
      // throw error
      console.log("error while executing query");
      // console.log("The solution is:" ,response);
    } else {
      // throw error
      // res.send("success");
      console.log("success");
    }
  });
  
   console.log(response);
   res.end(JSON.stringify(response));
})

// app.get("/",function(request,response){
  // connection.query('SELECT * from users', function(error, rows, fields) {
  //   connection.end();
  //   if(!error) {
  //     console.log("The solution is:" ,rows);
  //   } else {
  //     console.log("Error while performing query");
  //   }
  // });
  // response.send("Hello you have been connected to the database");
// });
app.listen(3000);
module.exports = app;
