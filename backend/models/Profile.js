const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: String,
  title: String,
  bio: String,
  image: String   // image URL (later we’ll add upload)
});

module.exports = mongoose.model("Profile", profileSchema);
