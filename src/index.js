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

// Routes
app.use('/api', apiRoutes);
app.use('/search', searchRoutes);
app.use('/', otherRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).render('404');
});


// Error handling middleware
app.use(errorHandling);

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