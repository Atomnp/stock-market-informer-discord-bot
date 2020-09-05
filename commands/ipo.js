const News = require("../modals/news");
module.exports = {
  name: "ipo",
  execute: (message) => {
    News.find().then((data) => {
      let displayMessage = "";
      let i = 0;
      data.forEach((news) => {
        if (i < 4) {
          displayMessage = displayMessage.concat(
            `${news.date}\n----------------\n ${news.title}\n ___________________________________________________________________________\n`
          );
        }
        i++;
      });
      message.channel.send(`\`\`\` ${displayMessage}\`\`\``);
    });
  },
};
