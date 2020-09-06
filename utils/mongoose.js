const mongoose = require("mongoose");
const { fetchAndSave } = require("./modifyNews");
const { todaysSummary } = require("./stockSummary");
const { todaysTopGainers } = require("./topGainers");

module.exports = {
  init: () => {
    console.log("here");
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    mongoose.connect(process.env.MONGOOSE_URL, dbOptions).then(() => {
      console.log("conneted to mongoose sucessfully");

      setTimeout(() => {
        fetchAndSave();
        todaysSummary();
        todaysTopGainers();
      }, 15 * 60 * 1000);
      todaysTopGainers();
    });
  },
};
