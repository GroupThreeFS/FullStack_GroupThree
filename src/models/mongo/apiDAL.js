const { ObjectID } = require('mongodb'); // You still need ObjectID for your queries
const client = require('../../config/mongodb'); // Import the connected client

const dbName = 'VideoGameSearch'; // Replace with your MongoDB database name
const db = client.db(dbName);

exports.getAllGames = async () => {
    const collection = db.collection('Game');
    return await collection.find({}).toArray();
};

exports.getGameById = async (gameid) => {
    const collection = db.collection('Game');
    
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

exports.getGameDeveloper = async (gameid) => {
    const collection = db.collection('Game');
    
    // Convert gameid to integer
    gameid = parseInt(gameid);
    
    const game = await collection.findOne({ GameID: gameid });
    if (game) {
        const developersCollection = db.collection('Developer');
        
        // Convert game.DevevloperID to integer (if it's not already)
        const developerIdInt = parseInt(game.DevevloperID);
        
        return await developersCollection.findOne({ DeveloperID: developerIdInt });
    }
    return null;
};

exports.getGameConsole = async (gameid) => {
    const collection = db.collection('Game');
    
    // Convert gameid to integer
    gameid = parseInt(gameid);
    
    const game = await collection.findOne({ GameID: gameid });
    console.log("Fetched game:", game); // Log the fetched game

    if (game) {
        const consolesCollection = db.collection('Console');
        
        // Convert game.ConsoleID to integer (if it's not already)
        const consoleIdInt = parseInt(game.ConsoleID);
        
        const consoleData = await consolesCollection.findOne({ PlatformID: consoleIdInt });
        console.log("Fetched console:", consoleData); // Log the fetched console
        return consoleData;
    }
    return null;
};

exports.getAllDevelopers = async () => {
    const collection = db.collection('Developer');
    return await collection.find({}).toArray();
};

exports.getDeveloperById = async (developerid) => {
    const collection = db.collection('Developer');
    
    // Convert developerid to integer
    developerid = parseInt(developerid);
    
    console.log("Fetching developer with DeveloperID:", developerid);
    
    try {
        return await collection.findOne({ DeveloperID: { $eq: developerid } });
    } catch (error) {
        console.error("Error fetching developer by DeveloperID:", error);
        return null;
    }
};

exports.getAllConsoles = async () => {
    const collection = db.collection('Console');
    return await collection.find({}).toArray();
};

exports.getConsoleById = async (platformid) => {
    const collection = db.collection('Console');
    
    // Convert platformid to integer
    platformid = parseInt(platformid);
    
    console.log("Fetching console with PlatformID:", platformid);
    
    try {
        return await collection.findOne({ PlatformID: { $eq: platformid } });
    } catch (error) {
        console.error("Error fetching console by PlatformID:", error);
        return null;
    }
};

