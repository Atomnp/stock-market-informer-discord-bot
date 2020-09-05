const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const summarySchema = new Schema({
  summary: {
    type: [String],
  },
});

module.exports = mongoose.model("Summary", summarySchema);
