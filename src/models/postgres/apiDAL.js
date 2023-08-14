// API data access layer for postgres
const pool = require('../../config/postgres');

exports.getAllGames = async () => {
  const query = 'SELECT * FROM Games';
  const { rows } = await pool.query(query);
  return rows;
};

exports.getGameById = async (gameId) => {
  const query = 'SELECT * FROM Games WHERE GameID = $1';
  const { rows } = await pool.query(query, [gameId]);
  return rows[0];
};

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

exports.getAllDevelopers = async () => {
  const query = 'SELECT * FROM Developers';
  const { rows } = await pool.query(query);
  return rows;
};

exports.getDeveloperById = async (developerId) => {
  const query = 'SELECT * FROM Developers WHERE DeveloperID = $1';
  const { rows } = await pool.query(query, [developerId]);
  return rows[0];
};

exports.getAllConsoles = async () => {
  const query = 'SELECT * FROM Consoles';
  const { rows } = await pool.query(query);
  return rows;
};

exports.getConsoleById = async (consoleId) => {
  const query = 'SELECT * FROM Consoles WHERE PlatformID = $1';
  const { rows } = await pool.query(query, [consoleId]);
  return rows[0];
};