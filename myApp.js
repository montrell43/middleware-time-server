require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

app.get('/now', (req, res, next) => {
  req.time = new Date().toString(); // Step 1: add time to the request object
  next(); // Step 2: pass to the next middleware
}, (req, res) => {
  res.json({ time: req.time }); // Step 3: send the time in a JSON response
});


app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});


app.get('/json', (req, res) => {
  let message = 'Hello json';
  
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    message = message.toUpperCase();
  }

  res.json({ message });
});

module.exports = app;
