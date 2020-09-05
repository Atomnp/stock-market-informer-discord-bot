const Summary = require("../modals/summary");
module.exports = {
  name: "summary",
  execute: (message) => {
    Summary.find().then((data) => {
      data = data[0].summary;
      let displayMessage = "";
      data.forEach((summary) => {
        displayMessage = displayMessage.concat(
          `${summary}\n___________________________________________________________________________\n`
        );
      });
      message.channel.send(`\`\`\`${displayMessage}\`\`\``);
    });
  },
};
