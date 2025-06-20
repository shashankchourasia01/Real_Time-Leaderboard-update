const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./utils/db');
const leaderboardRoutes = require('./routes/leaderboard');
const Player = require('./models/Player');

const app = express();
const server = http.createServer(app);


const io = socketIo(server, {
  cors: {
    origin: "*", // Change this to frontend URL in production
    methods: ["GET", "POST"]
  },
  transports: ['websocket', 'polling'] // Ensures compatibility
});

// Connect MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

//  API Routes
app.use('/api/leaderboard', leaderboardRoutes);

//  WebSocket Logic
io.on('connection', (socket) => {
  console.log(` New WebSocket client connected: ${socket.id}`);

  socket.on('update_score', async (data) => {
    try {
      const { username, score, region, gameMode } = data;

      if (!username || typeof score !== 'number') {
        console.error(" Invalid score update data:", data);
        return;
      }

      const player = await Player.findOneAndUpdate(
        { username },
        { $inc: { score }, region, gameMode },
        { new: true, upsert: true }
      );

      console.log(`Score updated: ${player.username} - ${player.score}`);
      io.emit('score_updated', player); // Broadcast update
    } catch (err) {
      console.error(" Error in update_score:", err.message);
    }
  });

  socket.on('disconnect', () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);
  });
});

//  Start Server logic
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
