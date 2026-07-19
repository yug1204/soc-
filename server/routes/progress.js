// routes/progress.js — Day completion, XP, streak, notes (NeDB version)
const router = require('express').Router();
const { requireAuth } = require('../middleware/auth');
const { findById, updateUser, toPublic, todayStr } = require('../models/User');

router.use(requireAuth);

// ── GET /api/progress ────────────────────────────────────────────────────────
router.get('/', (req, res) => {
  const u = req.user;
  return res.json({
    completedDays: u.completedDays || [],
    totalXP:       u.totalXP       || 0,
    streak:        u.streak        || 0,
    lastStudyDate: u.lastStudyDate || null,
    badges:        u.badges        || [],
    notes:         u.notes         || [],
    compResults:   u.compResults   || [],
  });
});

// ── POST /api/progress/complete/:day ─────────────────────────────────────────
router.post('/complete/:day', async (req, res) => {
  try {
    const dayNum = parseInt(req.params.day, 10);
    const xp     = parseInt(req.body.xp || 50, 10);

    if (isNaN(dayNum) || dayNum < 1 || dayNum > 120) {
      return res.status(400).json({ error: 'Invalid day number (must be 1-120)' });
    }

    let user = req.user;
    const completed = user.completedDays || [];

    if (completed.includes(dayNum)) {
      return res.json({ alreadyDone: true, newBadges: [], user: toPublic(user) });
    }

    const newCompleted = [...completed, dayNum];
    let newXP     = (user.totalXP || 0) + xp;
    let newStreak = user.streak || 0;

    // Streak logic
    const today     = todayStr();
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (user.lastStudyDate === today) {
      // already studied today
    } else if (user.lastStudyDate === yesterday) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }

    // Badge check
    const count = newCompleted.length;
    const THRESHOLDS = [
      { id: 'first_day',   req: 1   },
      { id: 'phase_one',   req: 30  },
      { id: 'halfway',     req: 60  },
      { id: 'phase_three', req: 90  },
      { id: 'soc_analyst', req: 120 },
    ];
    const existing = new Set(user.badges || []);
    const newBadges = [];
    THRESHOLDS.forEach(b => {
      if (count >= b.req && !existing.has(b.id)) {
        existing.add(b.id);
        newBadges.push(b.id);
      }
    });

    user = await updateUser(user._id, {
      completedDays: newCompleted,
      totalXP:       newXP,
      streak:        newStreak,
      lastStudyDate: today,
      badges:        [...existing],
    });

    return res.json({ alreadyDone: false, newBadges, user: toPublic(user) });
  } catch (err) {
    console.error('[PROGRESS] complete error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ── POST /api/progress/uncomplete/:day ───────────────────────────────────────
router.post('/uncomplete/:day', async (req, res) => {
  try {
    const dayNum = parseInt(req.params.day, 10);
    const xp     = parseInt(req.body.xp || 50, 10);
    let user     = req.user;

    const newCompleted = (user.completedDays || []).filter(d => d !== dayNum);
    const newXP        = Math.max(0, (user.totalXP || 0) - xp);

    user = await updateUser(user._id, { completedDays: newCompleted, totalXP: newXP });
    return res.json({ user: toPublic(user) });
  } catch (err) {
    console.error('[PROGRESS] uncomplete error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ── POST /api/progress/note/:day ─────────────────────────────────────────────
router.post('/note/:day', async (req, res) => {
  try {
    const dayNum = parseInt(req.params.day, 10);
    const { text = '' } = req.body;
    let user = req.user;
    const notes = [...(user.notes || [])];
    const idx = notes.findIndex(n => n.day === dayNum);
    if (idx >= 0) notes[idx] = { day: dayNum, text };
    else notes.push({ day: dayNum, text });
    await updateUser(user._id, { notes });
    return res.json({ ok: true });
  } catch (err) {
    console.error('[PROGRESS] note save error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ── GET /api/progress/note/:day ──────────────────────────────────────────────
router.get('/note/:day', (req, res) => {
  const dayNum = parseInt(req.params.day, 10);
  const note   = (req.user.notes || []).find(n => n.day === dayNum);
  return res.json({ text: note ? note.text : '' });
});

// ── POST /api/progress/comp-result ───────────────────────────────────────────
router.post('/comp-result', async (req, res) => {
  try {
    const { testId, score, total } = req.body;
    const pct     = Math.round((score / total) * 100);
    const results = [...(req.user.compResults || []), { testId, score, total, pct, date: new Date().toISOString() }];
    await updateUser(req.user._id, { compResults: results });
    return res.json({ ok: true, pct });
  } catch (err) {
    console.error('[PROGRESS] comp-result error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
