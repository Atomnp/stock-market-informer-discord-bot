const TopGainers = require("../modals/topGainers");
module.exports = {
  name: "topGainers",
  execute: (message) => {
    TopGainers.find().then((data) => {
      data = data[0].topGainers;
      let displayMessage = "Symbols   \tLTP       \tPtChange  \t%Change";
      displayMessage +=
        "\n___________________________________________________________________________";
      displayMessage +=
        "\n---------------------------------------------------------------------------\n";

      data.forEach((topGainers) => {
        console.log("before all", topGainers);
        topGainers = topGainers.split("\t");
        console.log("after split", topGainers);
        let str = "";
        topGainers = topGainers.join(`\t     `);
        console.log("after join", topGainers);

        displayMessage = displayMessage.concat(
          `${topGainers}\n___________________________________________________________________________\n`
        );
      });
      message.channel.send(`\`\`\`${displayMessage}\`\`\``);
    });
  },
};
