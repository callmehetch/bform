var express = require("express");
var nodemailer = require('nodemailer');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var path = require('path');


app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://<dbuser>:<dbpassword>@ds029828.mlab.com:29828/heroku_qdh3qffk");
var nameSchema = new mongoose.Schema({
    
    
  rname : String,
    rroll :String,
    rgender : String,
    rphone : Number,
    rhostel : String,
    rroom : Number,
    bname : String,
    broll : String,
     bgender : String,
    bphone : Number,
    bhostel : String,
    broom : Number,
    bdate : Date,
    bslot : String,
 
        name : String,
    mail : String,
  
    
        

  
    
    
});


var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.get('/send',function(req,res){
    var mailOptions={
        to : req.query.to,
        subject : req.query.subject,
        text : req.query.text
    }

});

app.post("/success", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
             res.sendFile(__dirname + "/success.html");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});


app.listen(port, () => {
    console.log("Server listening on port " + port);
});
