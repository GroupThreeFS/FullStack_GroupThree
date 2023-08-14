/*This is where PostgreSQL connection settings will go*/
const { Pool } = require('pg');
const chalk = require('chalk');
const rainbowText = require('../utils/rainbowtext'); // Import the rainbowText utility

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

pool.connect((err) => {
  if (err) {
    console.error(chalk.red('Error connecting to PostgreSQL:'), err);
  } else {
    console.log(chalk.green('Connected to') + ' ' + rainbowText('PostgreSQL'));
  }
});

module.exports = pool;