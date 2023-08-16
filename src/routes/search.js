const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { generateUrl } = require('../utils/apiNav');

router.get('/', (req, res) => {
    res.render('query');
});

router.get('/results', searchController.searchGames); // New route for search results

module.exports = router;