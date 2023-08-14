// const { MongoClient, ObjectID } = require('mongodb');
// require('dotenv').config();

// const uri = process.env.MONGO_URI;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// const dbName = 'yourDatabaseName'; // Replace with your MongoDB database name
// const db = client.db(dbName);

// exports.getAllGames = async () => {
//     const collection = db.collection('games');
//     return await collection.find({}).toArray();
// };

// exports.getGameById = async (gameId) => {
//     const collection = db.collection('games');
//     return await collection.findOne({ _id: ObjectID(gameId) });
// };

// exports.getGameDeveloper = async (gameId) => {
//     const collection = db.collection('games');
//     const game = await collection.findOne({ _id: ObjectID(gameId) });
//     if (game) {
//         const developersCollection = db.collection('developers');
//         return await developersCollection.findOne({ _id: ObjectID(game.developerId) });
//     }
//     return null;
// };

// exports.getGameConsole = async (gameId) => {
//     const collection = db.collection('games');
//     const game = await collection.findOne({ _id: ObjectID(gameId) });
//     if (game) {
//         const consolesCollection = db.collection('consoles');
//         return await consolesCollection.findOne({ _id: ObjectID(game.consoleId) });
//     }
//     return null;
// };

// exports.getAllDevelopers = async () => {
//     const collection = db.collection('developers');
//     return await collection.find({}).toArray();
// };

// exports.getDeveloperById = async (developerId) => {
//     const collection = db.collection('developers');
//     return await collection.findOne({ _id: ObjectID(developerId) });
// };

// exports.getAllConsoles = async () => {
//     const collection = db.collection('consoles');
//     return await collection.find({}).toArray();
// };

// exports.getConsoleById = async (consoleId) => {
//     const collection = db.collection('consoles');
//     return await collection.findOne({ _id: ObjectID(consoleId) });
// };

// client.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MongoDB:', err);
//     } else {
//         console.log('Connected to MongoDB');
//     }
// });

// module.exports = client;