const { ObjectID } = require("mongodb"); // You still need ObjectID for your queries
const client = require("../../config/mongodb"); // Import the connected client

const dbName = "VideoGameSearch"; // Replace with your MongoDB database name
const db = client.db(dbName);

// Function to fetch all games from the 'Game' collection
exports.getAllGames = async () => {
  const collection = db.collection("Game");
  return await collection.find({}).toArray();
};

// Function to fetch a specific game by its ID from the 'Game' collection
exports.getGameById = async (gameid) => {
  const collection = db.collection("Game");

  // Convert gameid to integer
  gameid = parseInt(gameid);

  console.log("Fetching game with ID:", gameid);

  try {
    return await collection.findOne({ GameID: { $eq: gameid } });
  } catch (error) {
    console.error("Error fetching game by ID:", error);
    return null;
  }
};

// Function to fetch the developer of a specific game from the 'Developer' collection
exports.getGameDeveloper = async (gameid) => {
  const collection = db.collection("Game");

  // Convert gameid to integer
  gameid = parseInt(gameid);

  const game = await collection.findOne({ GameID: gameid });
  if (game) {
    const developersCollection = db.collection("Developer");

    // Convert game.DeveloperID to integer (if it's not already)
    const developerIdInt = parseInt(game.DevevloperID);

    return await developersCollection.findOne({ DeveloperID: developerIdInt });
  }
  return null;
};

// Function to fetch the console information of a specific game from the 'Console' collection
exports.getGameConsole = async (gameid) => {
  const collection = db.collection("Game");

  // Convert gameid to integer
  gameid = parseInt(gameid);

  const game = await collection.findOne({ GameID: gameid });
  console.log("Fetched game:", game); // Log the fetched game

  if (game) {
    const consolesCollection = db.collection("Console");

    // Convert game.ConsoleID to integer (if it's not already)
    const consoleIdInt = parseInt(game.ConsoleID);

    const consoleData = await consolesCollection.findOne({
      PlatformID: consoleIdInt,
    });
    console.log("Fetched console:", consoleData); // Log the fetched console
    return consoleData;
  }
  return null;
};

// Similar functions for fetching developers, consoles, and searching for games based on queries
// They follow a similar structure and logic with database queries and conversions

// Function to search for games based on a query
exports.searchGames = async (query) => {
  const gameCollection = db.collection("Game");
  const developerCollection = db.collection("Developer");
  const consoleCollection = db.collection("Console");

  const regex = new RegExp(query, "i"); // Case-insensitive search

  const games = await gameCollection
    .find({
      $or: [
        { Name: regex },
        { Genre: regex },
        { Players: regex.toString() }, // Convert to string for matching
        { Year: regex.toString() }, // Convert to string for matching
        { GameRating: regex.toString() }, // Convert to string for matching
      ],
    })
    .toArray();

  const results = [];
  for (const game of games) {
    const developer = await developerCollection.findOne({
      DeveloperID: game.DevevloperID,
    });
    const consoleData = await consoleCollection.findOne({
      PlatformID: game.ConsoleID,
    });

    results.push({
      "Game Name": game.Name,
      "Release Date": consoleData.ReleaseDate,
      Players: game.Players,
      Genre: game.Genre,
      DeveloperName: developer.Name,
      Rating: game.GameRating,
    });
  }

  return results;
};

// Function to search for all games, fetching details from 'Developer' and 'Console' collections
exports.searchAllGames = async () => {
  const gameCollection = db.collection("Game");
  const developerCollection = db.collection("Developer");
  const consoleCollection = db.collection("Console");

  const games = await gameCollection.find({}).toArray();

  const results = [];
  for (const game of games) {
    const developer = await developerCollection.findOne({
      DeveloperID: game.DevevloperID,
    });
    const consoleData = await consoleCollection.findOne({
      PlatformID: game.ConsoleID,
    });

    results.push({
      "Game Name": game.Name,
      "Release Date": consoleData.ReleaseDate,
      Players: game.Players,
      Genre: game.Genre,
      DeveloperName: developer.Name,
      Rating: game.GameRating,
    });
  }

  return results;
};
