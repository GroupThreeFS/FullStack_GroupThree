const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('register'); // Render the register.ejs file
});

// Other routes can go here

module.exports = router;