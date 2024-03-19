// Initialize express router
const express = require('express');
const router = express.Router();

// Set up routes
router.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

router.post('/', (req, res) => {
  res.status(201).send('Hello, world!');
});

router.put('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

router.delete('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

module.exports = router;
