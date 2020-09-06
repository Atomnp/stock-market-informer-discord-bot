const TopGainers = require("../modals/topGainers");
const puppeteer = require("puppeteer");

exports.todaysTopGainers = (page) => {
  (async () => {
    const url = "http://www.nepalstock.com/";
    //to enable logging inside page.evaluate function
    page.on("console", (consoleObj) => console.log(consoleObj.text()));
    await page.goto(url, { waitUntil: "networkidle2" });

    let data = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll("#top-gainers tbody"));

      return tds.map((td) => td.innerText);
    });

    console.log(data);
    let gainers = data[0].split("\n");
    let topGainers = gainers.slice(1, gainers.length - 1);

    console.log(topGainers);

    TopGainers.find()
      .countDocuments()
      .then((count) => {
        console.log("count", count);
        if (count != 0) {
          TopGainers.remove({}, () => {
            console.log("topGainers removed");
          });
        }
        let tg = new TopGainers({
          topGainers,
        });
        tg.save().then((res) => {
          console.log("new topGainers saved");
        });
      });
  })();
};
