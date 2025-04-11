// routes/projectRoutes.js
const express = require('express');
const router = express.Router();

// Dummy GET route
router.get('/', (req, res) => {
  res.json({ message: 'All projects will be listed here' });
});

module.exports = router;
