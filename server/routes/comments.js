const router = require('express').Router();
const Comment = require('../models/Comment');
const { requireAuth } = require('../middleware/auth');

// GET /api/comments/:dayId
router.get('/:dayId', async (req, res) => {
  try {
    const { dayId } = req.params;
    const comments = await Comment.find({ dayId }).sort({ timestamp: 1 }).limit(50);
    res.json({ comments });
  } catch (err) {
    console.error('[COMMENTS GET]', err);
    res.status(500).json({ error: 'Server error fetching comments' });
  }
});

// POST /api/comments/:dayId
router.post('/:dayId', requireAuth, async (req, res) => {
  try {
    const { dayId } = req.params;
    const { text } = req.body;
    
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Comment text is required' });
    }

    const comment = new Comment({
      dayId: parseInt(dayId, 10),
      userId: req.user._id,
      authorName: req.user.name,
      text: text.trim()
    });

    await comment.save();
    res.status(201).json({ comment });
  } catch (err) {
    console.error('[COMMENTS POST]', err);
    res.status(500).json({ error: 'Server error posting comment' });
  }
});

module.exports = router;
