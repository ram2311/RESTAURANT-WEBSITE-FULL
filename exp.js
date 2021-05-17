const express = require('express');
var bodyParser = require("body-parser");
var app = express();

//setting middleware
app.use(express.static('public')); //Serves resources from public folder

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/food-culture", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})

var app = express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/feedback', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var suggestions = req.body.suggestions;
    var data = {
        "name": name,
        "email": email,
        "mobile": mobile,
        "suggestions": suggestions
    }
    db.collection('feedback').insertOne(data, function (err, collection) {
        if (err) throw err;
        console.log(data , "Record inserted Successfully");

    });
})

app.get('/', function (req, res) {
res.sendFile(__dirname + '/foodculture.html')
res.set({
    'Access-control-Allow-Origin': '*'
});
}).listen(3000)

app.get('/feedback.html', (req, res) => res.sendFile(__dirname + '/feedback.html'))
app.get('/menu.html', (req, res) => res.sendFile(__dirname + '/menu.html'))
app.get('/onlinereservation.html', (req, res) => res.sendFile(__dirname + '/onlinereservation.html'))

app.listen(5000);