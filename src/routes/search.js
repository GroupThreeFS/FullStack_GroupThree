/*This is where the search function will go that will route to the search models*/
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/', (req, res) => {
    res.render('query');
});

router.get('/search', searchController.getAllGames);

// ... other routes ...

module.exports = router;