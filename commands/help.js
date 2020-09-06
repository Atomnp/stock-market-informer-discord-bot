description = {
  summary: "Shows summary from Nepal stock exchange website",
  news: "scrap top 5 news from sharesansar and disply",
  topgainers: "shows top gainers from nepalstock exchange site",
};

module.exports = {
  name: "help",
  execute: (message) => {
    let displayMessage = "*****You can Use following commands****\n";
    for (i in description) {
      displayMessage += "!" + i + ": " + description[i] + "\n";
    }
    message.channel.send(`\`\`\`${displayMessage}\`\`\``);
  },
};
