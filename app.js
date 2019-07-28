var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var expressSanitizer = require("express-sanitizer");
var methodOverride = require("method-override");
var app = express();
var Post = require("./models/post");
var Comment = require("./models/comment");

// Settings
app.set("view engine", "ejs");
app.use(express.static("public/"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

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

//--------------------------------------------Routes-----------------------------------
//-----------Startseite--------------
app.get("/", (req, res) => {
  res.render("index");
});
//----------------Show all Posts----------------------
app.get("/posts", (req, res) => {
  Post.find({}, (err, allPosts) => {
    if (err) {
      console.log("Posts konnten nicht gefunden werden: " + err);
    }
    res.render("posts", { allPosts: allPosts });
  });
});

app.get("/posts/create", (req, res) => {
  res.render("postsCreate");
});
// New Post --Post Request
app.post("/posts/create", (req, res) => {
  Post.create(req.body.post, (err, createdPost) => {
    if (err) {
      console.log("Post erstellen Fehler:" + err);
    } else {
      console.log("Post: " + createdPost.title + " wurde erstellt");
      res.redirect("/posts");
    }
  });
});
//-------------Post Detail View ----------------
app.get("/posts/:id", (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
    if (err) {
      console.log("Post konnte nicht gefunden werden: " + err);
    } else {
      res.render(postsDetail, {
        foundPost: foundPost
      });
    }
  });
});

// Post.create(
//   {
//     title: "So machst du jetzt geld junge",
//     content:
//       "Joa hier würde halt stehen, wie du mein Produkt kaufen kannst, damit du scheinbar geld machst :)))"
//   },
//   (err, createdPost) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(createdPost.title + " wurde erstellt");
//     }
//   }
// );

//Start Server
app.listen(3000, err => {
  if (err) {
    console.log("Server-Fehler: " + err);
  } else {
    console.log("Server: verbunden");
  }
});
