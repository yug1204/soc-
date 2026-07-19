// routes/leaderboard.js — Real leaderboard from NeDB
const router = require('express').Router();
const { requireAuth } = require('../middleware/auth');
const { User } = require('../models/User');

// GET /api/leaderboard — Return top users sorted by totalXP
router.get('/', requireAuth, async (req, res) => {
  try {
    const users = await User.find({})
      .sort({ totalXP: -1 })
      .limit(50);

    const leaderboard = users.map((u, idx) => ({
      rank:     idx + 1,
      name:     u.name,
      xp:       u.totalXP || 0,
      days:     (u.completedDays || []).length,
      isUser:   u._id.toString() === req.user._id.toString(),
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
