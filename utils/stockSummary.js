const Summary = require("../modals/summary");

exports.todaysSummary = (page) => {
  (async () => {
    const url = "http://www.nepalstock.com/";
    //to enable logging inside page.evaluate function
    page.on("console", (consoleObj) => console.log(consoleObj.text()));
    await page.goto(url, { waitUntil: "networkidle2" });

    let data = await page.evaluate(() => {
      const tds = Array.from(
        document.querySelectorAll(".panel-body>table>tbody")
      );
      return tds.map((td) => td.innerText);
    });
    let todaysSummary = data[0].split("\n");

    console.log(todaysSummary);

    Summary.find()
      .countDocuments()
      .then((count) => {
        console.log("count", count);
        if (count != 0) {
          Summary.remove({}, () => {
            console.log("summary removed");
          });
        }
        let summary = new Summary({
          summary: todaysSummary,
        });
        summary.save().then((res) => {
          console.log("new summary saved");
        });
      });
  })();
};
