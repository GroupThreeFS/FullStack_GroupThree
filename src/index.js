const chalk = require('chalk');
const rainbowText = require('../src/utils/rainbowtext'); // Import the rainbowText utility

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('../src/config/mongodb');
require('../src/config/postgres');
const express = require('express');
const searchRoutes = require('../src/routes/search');
const apiRoutes = require('../src/routes/apiRoutes');
const otherRoutes = require('../src/routes/otherRoutes');
const errorHandling = require('../src/middleware/errorHandling');

// Import the required modules for user authentication
const bcrypt = require('bcrypt');
const fs = require('fs');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Initialize express session for user authentication
app.use(session({
  secret: 'your-secret-key', // Change this to a more secure value
  resave: false,
  saveUninitialized: true
}));

// Define a middleware to check if the user is logged in
function requireLogin(req, res, next) {
  if (req.session.user) {
    next(); // User is logged in, continue to the next middleware
  } else {
    res.redirect('/login'); // Redirect to login if not logged in
  }
}

// Routes
app.use('/api', apiRoutes);
app.use('/search', requireLogin, searchRoutes); // Protected route
app.use('/', otherRoutes);

// Implement user registration and login
const users = [];

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const user = users.find(user => user.username === req.body.username);
  if (!user) {
    return res.status(400).send('Cannot find user');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      req.session.user = user; // Set a session for the logged-in user
      res.redirect('/search');
    } else {
      res.status(401).send('Authentication failed');
    }
  } catch {
    res.status(500).send();
  }
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = { username: req.body.username, password: hashedPassword };
    users.push(user);
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.redirect('/login'); // Redirect to login page after successful registration
  } catch {
    res.status(500).send();
  }
});

// Update the search route
app.get('/search', (req, res) => {
  // Assuming you have a user session variable set during login
  const loggedInUser = req.session.user;

  // Log the user's information and search query
  console.log('User ID:', loggedInUser.username);
  console.log('Search Query:', req.query.q);

  // Render the search results page or API response as needed
  // ...

  // For demonstration purposes, sending a response
  res.send('Search results');
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).render('404');
});

// Error handling middleware
app.use(errorHandling);

// Load user data from users.json file (if it exists)
let db = { users: [], currentUser: null }; // Initialize the db object
if (fs.existsSync('users.json')) {
  const usersData = fs.readFileSync('users.json', 'utf8');
  db = JSON.parse(usersData);
}

app.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = { username: req.body.username, password: hashedPassword };
    db.users.push(user);
    db.currentUser = user; // Set the current user
    fs.writeFileSync('users.json', JSON.stringify(db, null, 2));
    res.redirect('/login'); // Redirect to login page after successful registration
  } catch {
    res.status(500).send();
  }
});

app.listen(PORT, () => {
  console.log(rainbowText(`Server running on http://localhost:${PORT}`));

  // Display all registered routes
  console.log(chalk.green('+ Available routes:'));
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      const methods = Object.keys(middleware.route.methods).join(', ').toUpperCase();
      console.log(chalk.cyan(`- ${methods} ${middleware.route.path}`));
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const methods = Object.keys(handler.route.methods).join(', ').toUpperCase();
          let path = middleware.regexp.source.replace('^', '').replace(/\\\//g, '/').replace('\/?(?=\\/|$)', '') + handler.route.path;
          path = path.replace(/\/\?\(\?=\S\|\$\)\/?/g, '/');
          console.log(chalk.cyan(`- ${methods} ${path}`));
        }
      });
    }
  });
});
