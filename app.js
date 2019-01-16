var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var path = require('path');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '54321hemanth@gmail.com',
        pass: 'hemanth3219'
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var mongoose = require("mongoose");


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/data");
var nameSchema = new mongoose.Schema({


    rname: String,
    rroll: String,
    rgender: String,
    rphone: Number,
    rhostel: String,
    rroom: Number,
    bname: String,
    broll: String,
    bgender: String,
    bphone: Number,
    bhostel: String,
    broom: Number,
    bdate: Date,
    bslot: String,
    iname: [],
    phone: [],
    mail: [],
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        default: 1
    }


});


var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.post("/success", (req, res) => {
    var rname = req.body.rname;
    var myData = new User(req.body);



    myData.save()
        .then(item => {
            res.sendFile(__dirname + "/success.html");



            const mailOptions = {
                from: 'Hemanth<54321hemanth@gmail.com>',
                to: req.body.rroll + '@iiitdm.ac.in',
                subject: 'Re. Celebration request',
                html: '  <div style="background-color:#377D6A; padding:1px; height: 55px;" ><h3 style="text-align:center;background-color:#377D6A;color:white;margin-top: 15px">Celebration request form</h3></div> <p style="padding-top:10%">Dear ' + rname + ', We have succesfully received your application. This is your final confirmation mail.</p>'

            };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.log(err)
                else
                    console.log(info);
            });



        

        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});


app.listen(port, () => {
    console.log("Server listening on port " + port);
});
