require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Game = require('./models/Game');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ====================== PAGES ======================

// GET /upload - form to create new game
app.get('/upload', (req, res) => {
  res.render('upload');
});

// POST /game - REST route to create (used by form)
app.post('/game', async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.redirect('/list');
  } catch (err) {
    res.status(400).send('Error creating game: ' + err.message);
  }
});

// GET /list - show all games (server-rendered)
app.get('/list', async (req, res) => {
  const games = await Game.find().sort({ title: 1 });
  res.render('list', { games });
});

// GET /query - query page with AJAX form
app.get('/query', (req, res) => {
  res.render('query');
});

// ====================== REST ROUTES ======================

// GET /games - REST endpoint with query params (used by AJAX)
app.get('/games', async (req, res) => {
  try {
    const { maxPrice, genre, minRating } = req.query;
    let filter = {};

    if (maxPrice) filter.price = { $lte: parseFloat(maxPrice) };
    if (genre) filter.genre = genre;
    if (minRating) filter.rating = { $gte: parseFloat(minRating) }; // bonus field if you add it later

    const games = await Game.find(filter).sort({ price: 1 }); // sorted cheapest first
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ====================== START SERVER ======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});