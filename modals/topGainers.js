const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const topGainersSchema = new Schema({
  topGainers: {
    type: [String],
  },
});

module.exports = mongoose.model("TopGainers", topGainersSchema);
