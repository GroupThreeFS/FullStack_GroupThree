require('dotenv').config();
const express = require('express');
const path = require('path');
//const searchRoutes = require('../src/routes/searchRoutes');
const otherRoutes = require('../src/routes/otherRoutes');
const errorHandling = require('../src/middleware/errorHandling');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
//app.use('/search', searchRoutes);
app.use('/', otherRoutes);

// Error handling middleware
app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});