// API data access layer for postgres
const pool = require("../../config/postgres");

// Function to fetch all games from the 'Games' table
exports.getAllGames = async () => {
  const query = "SELECT * FROM Games";
  const { rows } = await pool.query(query);
  return rows;
};

// Function to fetch a specific game by its ID from the 'Games' table
exports.getGameById = async (gameId) => {
  const query = "SELECT * FROM Games WHERE GameID = $1";
  const { rows } = await pool.query(query, [gameId]);
  return rows[0];
};

// Function to fetch the developer of a specific game from the 'Developers' table
exports.getGameDeveloper = async (gameId) => {
  const query = `
    SELECT Developers.* 
    FROM Developers 
    JOIN Games ON Developers.DeveloperID = Games.DeveloperID 
    WHERE Games.GameID = $1
  `;
  const { rows } = await pool.query(query, [gameId]);
  return rows[0];
};

// Function to fetch the console information of a specific game from the 'Consoles' table
exports.getGameConsole = async (gameId) => {
  const query = `
    SELECT Consoles.* 
    FROM Consoles 
    JOIN Games ON Consoles.PlatformID = Games.PlatformID 
    WHERE Games.GameID = $1
  `;
  const { rows } = await pool.query(query, [gameId]);
  return rows[0];
};

// Similar functions for fetching developers, consoles, and searching for games based on queries
// They follow a similar structure and logic with SQL queries and parameter binding

// Function to search for games based on a query
exports.searchGames = async (query) => {
  const regex = `%${query}%`; // SQL LIKE query

  const gamesQuery = `
      SELECT g.GameName, c.ReleaseDate, g.Players, g.Genre, d.DeveloperName, g.GameRating 
      FROM Games g
      JOIN Developers d ON g.DeveloperID = d.DeveloperID
      JOIN Consoles c ON g.PlatformID = c.PlatformID
      WHERE g.GameName ILIKE $1 OR g.Genre ILIKE $1 OR g.Players::TEXT ILIKE $1 OR g.ReleaseYear::TEXT ILIKE $1 OR g.GameRating::TEXT ILIKE $1 OR d.DeveloperName ILIKE $1 OR c.Platform ILIKE $1
  `;

  const { rows } = await pool.query(gamesQuery, [regex]);

  return rows.map((game) => ({
    "Game Name": game.gamename,
    "Release Date": game.releasedate, // You might want to format this to match MongoDB's format
    Players: game.players,
    Genre: game.genre,
    DeveloperName: game.developername,
    Rating: game.gamerating,
  }));
};

// Function to fetch all games with details from 'Developers' and 'Consoles' tables
exports.getAllGamesWithDetails = async () => {
  const gamesQuery = `
      SELECT g.GameName, c.ReleaseDate, g.Players, g.Genre, d.DeveloperName, g.GameRating 
      FROM Games g
      JOIN Developers d ON g.DeveloperID = d.DeveloperID
      JOIN Consoles c ON g.PlatformID = c.PlatformID
  `;

  const { rows } = await pool.query(gamesQuery);

  return rows.map((game) => ({
    "Game Name": game.gamename,
    "Release Date": game.releasedate,
    Players: game.players,
    Genre: game.genre,
    DeveloperName: game.developername,
    Rating: game.gamerating,
  }));
};
