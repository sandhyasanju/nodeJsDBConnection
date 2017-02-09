var mysql = require("mysql");
var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var multer = require("multer");

var app = express();

var urlencodedParser = bodyParser.urlencoded( {extended: false});
app.use(express.static('public'));

app.get('/index.html',function(request,response){
    response.sendFile(__dirname + "/" + "index.html");
})

var Host = "localhost";
var Port = "3306";
var User = "root";
var Password = "root";
var Database = "db1";
var Table = "users";

var connection = mysql.createConnection({
    host: Host,
    port: Port,
    user: User,
    password: Password,
});

connection.connect(function(error){
    if(!error) {
        console.log("database is connected");
    } else {
        console.log("error while connecting to database");
    }
})
connection.query('use ' + Database);

connection.query("select * from users",function(err,result,fields){
    if(err) {
        throw err;
        console.log("error while executing query");
    }
    else {
        // result.send("suceess");
        console.log("success");
        console.log("data present in users");
        console.log(".................................");
        for(var i in result){
            var output = result[i];
            console.log(output.id +": " + output.firstName);
        }
    }
});

app.post('/process_post', urlencodedParser, function(request, response) {
    Submitted = {
        id: request.body.id,
        firstName: request.body.firstName,
    };

    connection.query("insert into users (id, firstName) values('"+ request.body.id +"' , '"+ request.body.firstName + "')" , function (err, result, fields) {
        if(err) throw err;
        else console.log("successfully inserted data into database");
        connection.end();
        response.end();
    });

    console.log(Submitted);

});

app.listen(3000,function(port){
    console.log("server running at port "+ port);
})

// connection.query("insert into users (id, firstName) values('5' , 'Sanju')" , function selectCb(err, result, fields) {
//     if(err) throw err;
//     else console.log("success");
// })