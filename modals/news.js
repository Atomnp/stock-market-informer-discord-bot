const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const newsSchema = new Schema({
  date: {
    type: String,
  },
  title: {
    type: String,
  },
});

module.exports = mongoose.model("News", newsSchema);
