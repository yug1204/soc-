// index.js — SOC Analyst Academy API server (NeDB version — no MongoDB required)
require('dotenv').config();
const express      = require('express');
const cors         = require('cors');
const cookieParser = require('cookie-parser');
const passport     = require('passport');
const path         = require('path');
const fs           = require('fs');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Ensure data directory exists ──────────────────────────────────────────────
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// ── Initialize Database ────────────────────────────────────────────────────────
const connectDB = require('./config/db');
connectDB();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://127.0.0.1:5500',
  credentials: true,
}));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/progress',    require('./routes/progress'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/profile',     require('./routes/profile'));

// ── Serve Frontend ────────────────────────────────────────────────────────────
// In production, serve the frontend files from the root directory
app.use(express.static(path.join(__dirname, '..')));

// Fallback all other routes to index.html (for SPA routing if needed)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Not Found' });
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: 'nedb', timestamp: new Date().toISOString() });
});

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

// ── Error handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[SERVER]', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════════╗
  ║   SOC Analyst Academy API  [NeDB]          ║
  ║   http://localhost:${PORT}                    ║
  ║   Health: http://localhost:${PORT}/api/health ║
  ╚════════════════════════════════════════════╝
  `);
});

module.exports = app;
