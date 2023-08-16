// Import the required module
const { MongoClient } = require("mongodb");

// Get the MongoDB connection URI from an environment variable
const uri = process.env.MONGO_URI;

// Create a new MongoClient instance with options
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to the MongoDB database using the MongoClient instance
client.connect((err) => {
  if (err) {
    // If there's an error during connection, log the error
    console.error("Error connecting to MongoDB:", err);
  } else {
    // If the connection is successful, log a success message
    console.log("Connected to MongoDB");
  }
});

// Export the MongoClient instance to be used in other parts of the application
module.exports = client;
