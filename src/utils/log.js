const fs = require("fs");
const path = require("path");

class Logger {
  constructor(logsFolderPath) {
    // Initialize the logger with the specified logs folder path or a default path
    this.logsFolderPath = logsFolderPath || path.join(__dirname, "..", "logs");
  }

  getCurrentDate() {
    // Get the current date and format it as "YYYY-MM-DD"
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  logSearch(userId, query) {
    // Generate a log message with user ID, search query, and current date
    const currentDate = this.getCurrentDate();
    const logMessage = `[${currentDate}] USER ID: ${userId} - SEARCHED FOR '${query}'`;

    // Create a log file path based on the current date
    const logFilePath = path.join(this.logsFolderPath, `${currentDate}.log`);
    console.log("Log file path:", logFilePath);

    try {
      // Create the logs folder if it doesn't exist (with recursive option)
      fs.mkdirSync(this.logsFolderPath, { recursive: true });

      // Append the log message to the log file
      fs.appendFileSync(logFilePath, logMessage + "\n");
    } catch (err) {
      console.error("Error writing to log file:", err);
    }
  }
}

// Export the Logger class to be used in other parts of the application
module.exports = Logger;

module.exports = Logger;

// const Logger = require("./path/to/Logger"); // Update the path accordingly

// // Create an instance of Logger with the desired logs folder path
// const logger = new Logger("./logs");

// // Simulate a user search and log it
// const userId = "user123";
// const query = "example search query";
// logger.logSearch(userId, query);

// // You can repeat the above logSearch call whenever a user performs a search

// //const Logger = require('./log'); // Replace //with actual path to log.js

// //const logger = new Logger('./logs'); // //Provide your logs folder path here

// //const searchQuery = 'eggs'; // Replace with //the actual search query

// //logger.logSearch(searchQuery);
