/*May contain the logic for each route*/
const Logger = require("../utils/log");
const logger = new Logger();
const postgresDAL = require("../models/postgres/apiDAL");
const mongoDAL = require("../models/mongo/apiDAL");

// Function to fetch all games from different databases or a combination of them
exports.getAllGames = async (req, res) => {
  try {
    let games;
    if (req.query.db === "postgres") {
      games = await postgresDAL.getAllGames();
    } else if (req.query.db === "mongo") {
      games = await mongoDAL.getAllGames();
    } else {
      const postgresGames = await postgresDAL.getAllGames();
      const mongoGames = await mongoDAL.getAllGames();
      games = [...postgresGames, ...mongoGames];
    }
    res.json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ error: "Failed to fetch games" });
  }
};

// Function to fetch a specific game by its ID from different databases or a combination of them
exports.getGameById = async (req, res) => {
  try {
    let game;
    if (req.query.db === "postgres") {
      game = await postgresDAL.getGameById(req.params.gameId);
    } else if (req.query.db === "mongo") {
      game = await mongoDAL.getGameById(req.params.gameId);
    } else {
      const postgresGame = await postgresDAL.getGameById(req.params.gameId);
      const mongoGame = await mongoDAL.getGameById(req.params.gameId);
      game = { ...postgresGame, ...mongoGame }; // Merge data from different databases
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch game by ID" });
  }
};

// Similar functions for fetching game developer, game console, developers, etc.
// They follow a similar structure and logic with database options

// Function to search for games based on a query
exports.searchGames = async (req, res) => {
  try {
    let results;
    const query = req.query.query || ""; // Get the search query
    const userId = "anon"; // Placeholder for user ID
    logger.logSearch(userId, query); // Log the search query

    if (!query) {
      // Fetch all games if no search query is provided
      if (req.query.db === "postgres") {
        results = await postgresDAL.getAllGamesWithDetails();
      } else if (req.query.db === "mongo") {
        results = await mongoDAL.searchAllGames(); // Use the new function here
      } else {
        const postgresResults = await postgresDAL.getAllGamesWithDetails();
        const mongoResults = await mongoDAL.searchAllGames(); // And here
        results = [...postgresResults, ...mongoResults];
      }
    } else {
      // Search for games based on the provided query
      if (req.query.db === "postgres") {
        results = await postgresDAL.searchGames(query);
      } else if (req.query.db === "mongo") {
        results = await mongoDAL.searchGames(query);
      } else {
        const postgresResults = await postgresDAL.searchGames(query);
        const mongoResults = await mongoDAL.searchGames(query);
        results = [...postgresResults, ...mongoResults];
      }
    }

    // Pagination logic
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedResults = results.slice(startIndex, endIndex);

    // Render the results using a template engine (assuming it's defined elsewhere)
    res.render("results", {
      results: paginatedResults,
      page,
      totalPages: Math.ceil(results.length / limit),
      query: query, // Pass the search query
      db: req.query.db, // Pass the database option
    });
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
};
