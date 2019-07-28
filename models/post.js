var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  created: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Post", postSchema);
