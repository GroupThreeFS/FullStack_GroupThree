const fs = require("fs");
const path = require("path");

class Logger {
  constructor(logsFolderPath) {
    this.logsFolderPath = logsFolderPath || "./logs";
  }

  getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  logSearch(userId, query) {
    const currentDate = this.getCurrentDate();
    const logMessage = `[${currentDate}] USER ID: ${userId} - SEARCHED FOR '${query}'`;

    const logFilePath = path.join(this.logsFolderPath, `${currentDate}.log`);

    fs.mkdirSync(this.logsFolderPath, { recursive: true });
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
