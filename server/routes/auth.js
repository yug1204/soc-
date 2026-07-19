// routes/auth.js — Registration, Login, Demo, Google OAuth scaffold (NeDB version)
const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {
  findByEmail, findByGoogleId, createUser, updateUser, comparePassword, toPublic
} = require('../models/User');
const { issueToken } = require('../middleware/auth');

// ── Google OAuth (scaffold — activate with real CLIENT_ID) ───────────────────
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== 'your_google_client_id') {
  passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  process.env.GOOGLE_CALLBACK_URL,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await findByGoogleId(profile.id);
      if (!user) {
        user = await findByEmail(profile.emails[0].value);
        if (user) {
          user = await updateUser(user._id, {
            googleId:  profile.id,
            loginType: 'google',
          });
        } else {
          user = await createUser({
            name:      profile.displayName,
            email:     profile.emails[0].value,
            googleId:  profile.id,
            loginType: 'google',
            avatar:    profile.photos?.[0]?.value || null,
          });
        }
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));
}

// ── POST /api/auth/register ──────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    const existing = await findByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered. Please log in.' });
    }
    const user = await createUser({ name, email, passwordHash: password, loginType: 'manual' });
    issueToken(res, user._id);
    return res.status(201).json({ user: toPublic(user) });
  } catch (err) {
    console.error('[AUTH] Register error:', err);
    return res.status(500).json({ error: 'Server error during registration' });
  }
});

// ── POST /api/auth/login ─────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const user = await findByEmail(email);
    if (!user || !(await comparePassword(user, password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    issueToken(res, user._id);
    return res.json({ user: toPublic(user) });
  } catch (err) {
    console.error('[AUTH] Login error:', err);
    return res.status(500).json({ error: 'Server error during login' });
  }
});

// ── POST /api/auth/demo ──────────────────────────────────────────────────────
router.post('/demo', async (req, res) => {
  try {
    const demoEmail = `demo_${Date.now()}@soc.local`;
    const user = await createUser({
      name:      'Guest Analyst',
      email:     demoEmail,
      loginType: 'demo',
    });
    issueToken(res, user._id);
    return res.status(201).json({ user: toPublic(user) });
  } catch (err) {
    console.error('[AUTH] Demo error:', err);
    return res.status(500).json({ error: 'Server error creating demo session' });
  }
});

// ── GET /api/auth/me ─────────────────────────────────────────────────────────
router.get('/me', require('../middleware/auth').requireAuth, (req, res) => {
  return res.json({ user: toPublic(req.user) });
});

// ── POST /api/auth/logout ────────────────────────────────────────────────────
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'Logged out' });
});

// ── GET /api/auth/google-status — lets frontend check if OAuth is ready ───────
const googleEnabled = !!(
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_ID !== 'your_google_client_id' &&
  process.env.GOOGLE_CLIENT_SECRET &&
  process.env.GOOGLE_CLIENT_SECRET !== 'your_google_client_secret'
);

router.get('/google-status', (req, res) => {
  res.json({ enabled: googleEnabled });
});

// ── Google OAuth routes ──────────────────────────────────────────────────────
router.get('/google', (req, res, next) => {
  if (!googleEnabled) {
    // Redirect back to frontend with a clear error
    return res.redirect(
      (process.env.FRONTEND_ORIGIN || 'http://127.0.0.1:5500') +
      '/?error=google_not_configured'
    );
  }
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

router.get('/google/callback', (req, res, next) => {
  if (!googleEnabled) {
    return res.redirect('/?error=google_not_configured');
  }
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/?error=google_failed',
  })(req, res, () => {
    issueToken(res, req.user._id);
    res.redirect('/');
  });
});

module.exports = router;
