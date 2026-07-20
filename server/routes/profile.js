// routes/profile.js — Read and update user profile (NeDB version)
const router = require('express').Router();
const { requireAuth } = require('../middleware/auth');
const { updateUser, deleteUser, toPublic } = require('../models/User');

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

// DELETE /api/profile — delete the user's account
router.delete('/', async (req, res) => {
  try {
    await deleteUser(req.user._id);
    // Note: If you want to delete their progress data too, you can add that logic here in the future
    return res.json({ success: true, message: 'Account deleted successfully' });
  } catch (err) {
    console.error('[PROFILE] delete error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
