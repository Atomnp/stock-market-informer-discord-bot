const News = require("../modals/news");
const puppeteer = require("puppeteer");

exports.fetchAndSave = () => {
  (async () => {
    const url = "https://www.sharesansar.com/category/ipo-fpo-news";
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    let data = await page.evaluate(() => {
      let dates = Array.from(
        document.querySelectorAll(".newslist>div>div>p>span")
      );
      let data = Array.from(document.querySelectorAll(".featured-news-title"));
      let news = [];
      for (let i = 0; i < dates.length; i++) {
        news.push({ date: dates[i].outerText, title: data[i].innerHTML });
      }
      return news;
    });
    console.log("here");
    News.find().countDocuments((count) => {
      if (count != 0) {
        News.remove({}, () => {
          console.log("removed every items from news collection");
        });
      }
      data.forEach((newsItem) => {
        let news = new News({
          date: newsItem.date,
          title: newsItem.title,
        });
        news.save().then((res) => {
          console.log("new news saved");
        });
      });
    });
  })();
};
