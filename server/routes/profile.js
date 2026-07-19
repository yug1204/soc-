// routes/profile.js — Read and update user profile (NeDB version)
const router = require('express').Router();
const { requireAuth } = require('../middleware/auth');
const { updateUser, toPublic } = require('../models/User');

router.use(requireAuth);

// GET /api/profile
router.get('/', (req, res) => {
  return res.json({ user: toPublic(req.user) });
});

// PUT /api/profile — update name and/or avatar
router.put('/', async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const updates = {};
    if (name && name.trim())   updates.name   = name.trim();
    if (avatar !== undefined)  updates.avatar = avatar;

    const user = await updateUser(req.user._id, updates);
    return res.json({ user: toPublic(user) });
  } catch (err) {
    console.error('[PROFILE] update error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
