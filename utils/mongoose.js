const mongoose = require("mongoose");
const { fetchAndSave } = require("./modifyNews");
const { todaysSummary } = require("./stockSummary");
const { todaysTopGainers } = require("./topGainers");
const puppeteer = require("puppeteer");

module.exports = {
  init: () => {
    console.log("here");
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    mongoose.connect(process.env.MONGOOSE_URL, dbOptions).then(async () => {
      console.log("conneted to mongoose sucessfully");
      let browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      let page = await browser.newPage();

      setTimeout(() => {
        fetchAndSave(page);
        todaysSummary(page);
        todaysTopGainers(page);
      }, 15 * 60 * 1000);
    });
  },
};
