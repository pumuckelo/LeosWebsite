var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var expressSanitizer = require("express-sanitizer");

var app = express();

// Settings
app.set("view engine", "ejs");
app.use(express.static("public/"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());

//Connect to Database
mongoose.connect(
  "mongodb://localhost:27017/leoswebsite",
  {
    useNewUrlParser: true
  },
  err => {
    if (err) {
      console.log("Datenbank-Fehler: " + err);
    } else {
      console.log("Datenbank: Verbunden");
    }
  }
);
