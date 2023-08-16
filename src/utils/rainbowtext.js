// Part of the silleh leetle update - JI

// Import the 'chalk' library for text styling
const chalk = require("chalk");

// Define a function to create rainbow-colored text
const rainbowText = (text) => {
  // Define an array of colors for the rainbow effect
  const colors = [
    "red",
    "yellowBright",
    "yellow",
    "green",
    "blue",
    "magenta",
    "cyan",
  ];

  // Initialize an empty string to store the colored text
  let coloredText = "";

  // Loop through each character in the provided 'text'
  for (let i = 0; i < text.length; i++) {
    // Use the 'chalk' library to apply a color to the current character,
    // rotating through the 'colors' array using modulo to repeat the colors
    coloredText += chalk[colors[i % colors.length]](text[i]);
  }

  // Return the text with rainbow colors applied
  return coloredText;
};

// Export the 'rainbowText' function to make it accessible from other modules
module.exports = rainbowText;
