// API data access layer for postgres
const pool = require("../../config/postgres");

// Function to retrieve all games from the database
exports.getAllGames = async () => {
  const query = "SELECT * FROM Games";
  const { rows } = await pool.query(query);
  return rows;
};

// Function to retrieve a game by its ID from the database
exports.getGameById = async (gameId) => {
  const query = "SELECT * FROM Games WHERE GameID = $1";
  const { rows } = await pool.query(query, [gameId]);
  return rows[0];
};

// Function to retrieve the developer of a game by its ID from the database
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

// Function to retrieve the console associated with a game by its ID from the database
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

// Function to retrieve all developers from the database
exports.getAllDevelopers = async () => {
  const query = "SELECT * FROM Developers";
  const { rows } = await pool.query(query);
  return rows;
};

// Function to retrieve a developer by their ID from the database
exports.getDeveloperById = async (developerId) => {
  const query = "SELECT * FROM Developers WHERE DeveloperID = $1";
  const { rows } = await pool.query(query, [developerId]);
  return rows[0];
};

// Function to retrieve all consoles from the database
exports.getAllConsoles = async () => {
  const query = "SELECT * FROM Consoles";
  const { rows } = await pool.query(query);
  return rows;
};

// Function to retrieve a console by its ID from the database
exports.getConsoleById = async (consoleId) => {
  const query = "SELECT * FROM Consoles WHERE PlatformID = $1";
  const { rows } = await pool.query(query, [consoleId]);
  return rows[0];
};
