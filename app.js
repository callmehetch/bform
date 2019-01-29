var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var nodemailer = require('nodemailer');


app.listen(process.env.PORT || 3000, () => console.log('App is running successfully!'))

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
mongoose.connect("mongodb://itshemanthkumar:hemanth3219@ds157864.mlab.com:57864/bform", { useNewUrlParser: true });

mongoose.Promise = global.Promise;

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

app.post("/success", (req, res) => {
    var rname = req.body.rname;
    var myData = new User(req.body);



    myData.save()
        .then(item => {
         res.sendFile(__dirname + "views/success.html");
            
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
            res.status(400).send(err);
        });
});



    app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});


app.get('/admin', function(req, res) {
   
    User.find({}, function(err, users) {
  if (err) throw err;
        
        else{
            
            
 
        
  console.log(users);
             }
});
    
    
});

app.use("*", (req,res) => {
		res.sendFile(path.join(__dirname, 'views/404.html'));
	});