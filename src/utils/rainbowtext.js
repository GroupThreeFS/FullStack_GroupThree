// Part of the silleh leetle update - JI

const chalk = require("chalk");

const rainbowText = (text) => {
  // Define an array of chalk color functions
  const colors = [
    "red",
    "yellowBright",
    "yellow",
    "green",
    "blue",
    "magenta",
    "cyan",
  ];

  let coloredText = "";
  for (let i = 0; i < text.length; i++) {
    // Apply a chalk color function from the array based on the index
    coloredText += chalk[colors[i % colors.length]](text[i]);
  }

  return coloredText;
};

// Export the rainbowText function to be used in other parts of the application
module.exports = rainbowText;
