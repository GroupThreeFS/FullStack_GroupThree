const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/Games', searchController.getAllGames);
router.get('/Games/:gameId', searchController.getGameById);
router.get('/Games/:gameId/Developer', searchController.getGameDeveloper);
router.get('/Games/:gameId/Console', searchController.getGameConsole);
router.get('/Developers', searchController.getAllDevelopers);
router.get('/Developers/:developerId', searchController.getDeveloperById);
router.get('/Consoles', searchController.getAllConsoles);
router.get('/Consoles/:consoleId', searchController.getConsoleById);

module.exports = router;