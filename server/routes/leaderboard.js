// routes/leaderboard.js — Real leaderboard from NeDB
const router = require('express').Router();
const { requireAuth } = require('../middleware/auth');
const { db, toPublic } = require('../models/User');

// GET /api/leaderboard — top 10 by XP
router.get('/', requireAuth, async (req, res) => {
  try {
    const users = await db.users.find({})
      .sort({ totalXP: -1 })
      .limit(10);

    const leaderboard = users.map((u, idx) => ({
      rank:     idx + 1,
      name:     u.name,
      xp:       u.totalXP || 0,
      days:     (u.completedDays || []).length,
      isUser:   u._id === req.user._id,
      avatar:   u.avatar || null,
      initials: u.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
    }));

    return res.json(leaderboard);
  } catch (err) {
    console.error('[LEADERBOARD] error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
