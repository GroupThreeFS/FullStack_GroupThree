const { ObjectID } = require('mongodb'); // You still need ObjectID for your queries
const client = require('../../config/mongodb'); // Import the connected client

const dbName = 'VideoGameSearch'; // Replace with your MongoDB database name
const db = client.db(dbName);

exports.getAllGames = async () => {
    const collection = db.collection('Game');
    return await collection.find({}).toArray();
};

exports.getGameById = async (gameId) => {
    const collection = db.collection('Game');
    return await collection.findOne({ _id: ObjectID(gameId) });
};

exports.getGameDeveloper = async (gameId) => {
    const collection = db.collection('Game');
    const game = await collection.findOne({ _id: ObjectID(gameId) });
    if (game) {
        const developersCollection = db.collection('Developer');
        return await developersCollection.findOne({ _id: ObjectID(game.developerId) });
    }
    return null;
};

exports.getGameConsole = async (gameId) => {
    const collection = db.collection('Game');
    const game = await collection.findOne({ _id: ObjectID(gameId) });
    if (game) {
        const consolesCollection = db.collection('Console');
        return await consolesCollection.findOne({ _id: ObjectID(game.consoleId) });
    }
    return null;
};

exports.getAllDevelopers = async () => {
    const collection = db.collection('Developer');
    return await collection.find({}).toArray();
};

exports.getDeveloperById = async (developerId) => {
    const collection = db.collection('Developer');
    return await collection.findOne({ _id: ObjectID(developerId) });
};

exports.getAllConsoles = async () => {
    const collection = db.collection('Console');
    return await collection.find({}).toArray();
};

exports.getConsoleById = async (consoleId) => {
    const collection = db.collection('Console');
    return await collection.findOne({ _id: ObjectID(consoleId) });
};

