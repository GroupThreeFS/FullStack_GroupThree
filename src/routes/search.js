const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");
const { generateUrl } = require("../utils/apiNav");

// Route to render the query page
router.get("/", (req, res) => {
  res.render("query"); // Render the 'query' view template
});

// Route to handle search results
router.get("/results", searchController.searchGames);

// Export the router to be used in the main Express application
module.exports = router;
