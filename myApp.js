require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

// Root route for "/"
app.get('/', (req, res) => {
  res.send('Welcome to the Express app!');
});


// Root-level logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Route: GET /json with MESSAGE_STYLE env variable
app.get('/json', (req, res) => {
  const message = process.env.MESSAGE_STYLE === 'uppercase'
    ? 'HELLO JSON'
    : 'Hello json';
  res.json({ message });
});

// Route: GET /now with chained middleware
app.get('/now', (req, res, next) => {
  req.time = new Date().toString(); // Add current time to req
  next();
}, (req, res) => {
  res.json({ time: req.time }); // Send time in response
});

module.exports = app;