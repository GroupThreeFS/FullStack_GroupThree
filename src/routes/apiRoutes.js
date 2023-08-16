const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");

// Define routes and map them to controller functions

// Route to get all games
router.get("/Games", searchController.getAllGames);

// Route to get a specific game by its ID
router.get("/Games/:gameId", searchController.getGameById);

// Route to get the developer of a specific game
router.get("/Games/:gameId/Developer", searchController.getGameDeveloper);

// Route to get the console information of a specific game
router.get("/Games/:gameId/Console", searchController.getGameConsole);

// Route to get all developers
router.get("/Developers", searchController.getAllDevelopers);

// Route to get a specific developer by their ID
router.get("/Developers/:developerId", searchController.getDeveloperById);

// Route to get all consoles
router.get("/Consoles", searchController.getAllConsoles);

// Route to get a specific console by its ID
router.get("/Consoles/:consoleId", searchController.getConsoleById);

// Export the router to be used in the main Express application
module.exports = router;
