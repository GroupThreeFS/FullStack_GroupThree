const fs = require("fs");
const path = require("path");

class Logger {
  // Constructor to initialize the logs folder path
  constructor(logsFolderPath) {
    // Set the logs folder path; if not provided, use default "./logs"
    this.logsFolderPath = logsFolderPath || "./logs";
  }

  // Helper function to get the current date in "YYYY-MM-DD" format
  getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Method to log a user's search query
  logSearch(userId, query) {
    // Get the current date in "YYYY-MM-DD" format
    const currentDate = this.getCurrentDate();

    // Construct the log message with user ID and search query
    const logMessage = `[${currentDate}] USER ID: ${userId} - SEARCHED FOR '${query}'`;

    // Create the log file path using the current date
    const logFilePath = path.join(this.logsFolderPath, `${currentDate}.log`);

    // Create the logs folder if it doesn't exist (recursive: true ensures nested directories are created)
    fs.mkdirSync(this.logsFolderPath, { recursive: true });

    // Append the log message to the log file
    fs.appendFileSync(logFilePath, logMessage + "\n");
  }
}

module.exports = Logger;

module.exports = Logger;
const Logger = require("./path/to/Logger"); // Update the path accordingly

// Create an instance of Logger with the desired logs folder path
const logger = new Logger("./logs");

// Simulate a user search and log it
const userId = "user123";
const query = "example search query";
logger.logSearch(userId, query);

// You can repeat the above logSearch call whenever a user performs a search

//const Logger = require('./log'); // Replace //with actual path to log.js

//const logger = new Logger('./logs'); // //Provide your logs folder path here

//const searchQuery = 'eggs'; // Replace with //the actual search query

//logger.logSearch(searchQuery);
