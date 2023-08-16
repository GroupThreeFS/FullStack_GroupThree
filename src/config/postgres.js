// Import the required modules
const { Pool } = require("pg");
const chalk = require("chalk");
const rainbowText = require("../utils/rainbowtext"); // Import the rainbowText utility

// Create a new connection pool with PostgreSQL connection settings
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

// Connect to the PostgreSQL database using the connection pool
pool.connect((err) => {
  if (err) {
    // If there's an error during connection, log the error using chalk for styling
    console.error(chalk.red("Error connecting to PostgreSQL:"), err);
  } else {
    // If the connection is successful, log a success message with colorful text
    console.log(
      chalk.green("+ Connected to") + " " + rainbowText("PostgreSQL")
    );
  }
});

// Export the connection pool to be used in other parts of the application
module.exports = pool;
