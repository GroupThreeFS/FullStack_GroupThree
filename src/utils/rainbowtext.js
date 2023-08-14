// Part of the silleh leetle update - JI

const chalk = require('chalk');

const rainbowText = (text) => {
  const colors = ['red', 'yellowBright', 'yellow', 'green', 'blue', 'magenta', 'cyan'];
  let coloredText = '';
  for (let i = 0; i < text.length; i++) {
    coloredText += chalk[colors[i % colors.length]](text[i]);
  }
  return coloredText;
};

module.exports = rainbowText;