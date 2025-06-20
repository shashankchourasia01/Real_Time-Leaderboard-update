const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// GET top N players
router.get('/top/:n', async (req, res) => {
  try {
    const topN = parseInt(req.params.n);
    if (isNaN(topN) || topN <= 0) {
      return res.status(400).json({ error: "Invalid number provided" });
    }

    const players = await Player.find().sort({ score: -1 }).limit(topN);
    res.json(players);
  } catch (err) {
    console.error("❌ Error in /top/:n route:", err.message);
    res.status(500).json({ error: "Server error while fetching leaderboard" });
  }
});

// GET filtered leaderboard
router.get('/filter', async (req, res) => {
  try {
    const { region, gameMode } = req.query;
    const filter = {};

    if (region) filter.region = region;
    if (gameMode) filter.gameMode = gameMode;

    const players = await Player.find(filter).sort({ score: -1 }).limit(10);
    res.json(players);
  } catch (err) {
    console.error("❌ Error in /filter route:", err.message);
    res.status(500).json({ error: "Server error while filtering leaderboard" });
  }
});

router.post('/add', async (req, res) => {
    try {
      const { username, score, region, gameMode } = req.body;
  
      if (!username || score == null) {
        return res.status(400).json({ error: "Username and score are required." });
      }
  
      const player = new Player({ username, score, region, gameMode });
      await player.save();
  
      res.status(201).json({ message: "Player added successfully", player });
    } catch (err) {
      console.error("❌ Error adding player:", err.message);
      res.status(500).json({ error: "Server error while adding player" });
    }
  });

module.exports = router;
