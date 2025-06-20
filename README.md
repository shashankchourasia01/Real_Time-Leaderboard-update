# 🏆 Real-Time Leaderboard System

This project is a backend service designed to track players' scores in real-time and maintain a dynamic leaderboard. Built using **Node.js**, **Socket.IO**, and **MongoDB**, the system supports real-time updates, leaderboard filtering, and performance optimization features.

---

## 🚀 Features

- 🔄 **Real-time score updates** using WebSockets (Socket.IO)
- 📊 **Fetch top N players** based on score
- 🌍 **Filter leaderboard** by region or game mode
- ⏱️ **Daily reset** logic using TTL (Time-To-Live)
- ⚡ **Optimized performance** using indexes and caching strategies

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **WebSockets:** Socket.IO
- **Database:** MongoDB (can be adapted for Redis)
- **Caching & Optimization:** MongoDB Indexes / Redis (optional)

---

## 📂 Folder Structure

real-time-leaderboard/
├── controllers/
│ └── leaderboardController.js
├── models/
│ └── Player.js
├── routes/
│ └── leaderboardRoutes.js
├── sockets/
│ └── socketHandler.js
├── .env
├── server.js
└── README.md

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/real-time-leaderboard.git
   cd real-time-leaderboard

📡 Socket Events
Event	Description
updateScore	Client emits updated player score
getTopPlayers	Client requests top N leaderboard
filterByRegion	Fetch leaderboard by region/mode

🔁 Bonus Logic
TTL Daily Reset: Player scores auto-reset every 24 hours using TTL index on createdAt field.

Indexes: Indexes on score, region, and game mode to boost query performance.

✅ Evaluation Focus
Real-time data handling

NoSQL modeling and optimization

Scalable architecture

Efficient leaderboard algorithms
