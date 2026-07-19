// =============================================
// PROGRESS.JS — XP, Badges, Completion, Notes
// Uses backend API with localStorage as cache/fallback.
// =============================================

var progressAPI = window.API_BASE || 'http://localhost:3001';

// ─── In-memory progress cache (loaded once per session) ───
let _progressCache = null;

async function _loadProgress() {
  if (_progressCache) return _progressCache;
  try {
    const res = await fetch(progressAPI + '/api/progress', { credentials: 'include' });
    if (res.ok) {
      _progressCache = await res.json();
      // Also write to localStorage for offline resilience
      localStorage.setItem('soc_progress_cache', JSON.stringify(_progressCache));
      return _progressCache;
    }
  } catch (e) {
    console.warn('[PROGRESS] API unavailable, using localStorage cache');
  }
  // Offline fallback — read last known cache
  const cached = localStorage.getItem('soc_progress_cache');
  _progressCache = cached ? JSON.parse(cached) : {
    completedDays: [], totalXP: 0, streak: 0, lastStudyDate: null, badges: [], notes: []
  };
  return _progressCache;
}

function _invalidateCache() {
  _progressCache = null;
  localStorage.removeItem('soc_progress_cache');
}

// ─── Completion Tracking ──────────────────────
function getCompletedDays() {
  // Sync read from cache (populated by app.js init call to loadProgressAsync)
  return _progressCache ? _progressCache.completedDays : [];
}

function isDayComplete(dayNum) {
  return getCompletedDays().includes(dayNum);
}

function isDayUnlocked(dayNum) {
  if (dayNum === 1) return true;
  return isDayComplete(dayNum - 1);
}

async function markDayComplete(dayNum, xpReward) {
  try {
    const res = await fetch(`${progressAPI}/api/progress/complete/${dayNum}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ xp: xpReward || 50 }),
    });
    if (res.ok) {
      const data = await res.json();
      // Update cache from server response
      _progressCache = {
        completedDays: data.user.completedDays,
        totalXP:       data.user.totalXP,
        streak:        data.user.streak,
        lastStudyDate: data.user.lastStudyDate,
        badges:        data.user.badges,
        notes:         _progressCache ? _progressCache.notes : [],
      };
      localStorage.setItem('soc_progress_cache', JSON.stringify(_progressCache));
      if (data.newBadges && data.newBadges.length > 0) checkBadges(data.user.completedDays.length);
      return !data.alreadyDone;
    }
  } catch (e) {
    console.warn('[PROGRESS] complete API failed, using localStorage:', e.message);
  }
  // Offline fallback
  const days = getCompletedDays();
  if (!days.includes(dayNum)) {
    days.push(dayNum);
    if (_progressCache) { _progressCache.completedDays = days; _progressCache.totalXP += (xpReward || 50); }
    localStorage.setItem('soc_progress_cache', JSON.stringify(_progressCache));
    return true;
  }
  return false;
}

async function unmarkDay(dayNum, xpReward) {
  try {
    const res = await fetch(`${progressAPI}/api/progress/uncomplete/${dayNum}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ xp: xpReward || 50 }),
    });
    if (res.ok) {
      const data = await res.json();
      _progressCache = {
        ..._progressCache,
        completedDays: data.user.completedDays,
        totalXP:       data.user.totalXP,
      };
      localStorage.setItem('soc_progress_cache', JSON.stringify(_progressCache));
      return;
    }
  } catch (e) {
    console.warn('[PROGRESS] uncomplete API failed:', e.message);
  }
  // Offline fallback
  if (_progressCache) {
    _progressCache.completedDays = _progressCache.completedDays.filter(d => d !== dayNum);
    _progressCache.totalXP = Math.max(0, (_progressCache.totalXP || 0) - (xpReward || 50));
    localStorage.setItem('soc_progress_cache', JSON.stringify(_progressCache));
  }
}

// ─── XP System ───────────────────────────────
function getTotalXP() {
  return _progressCache ? (_progressCache.totalXP || 0) : 0;
}

function addXP(amount) {
  if (_progressCache) _progressCache.totalXP = (_progressCache.totalXP || 0) + amount;
}

function subtractXP(amount) {
  if (_progressCache) _progressCache.totalXP = Math.max(0, (_progressCache.totalXP || 0) - amount);
}

function getLevel(xp) {
  if (xp >= 10000) return { level: 10, title: 'Master Defender',    next: Infinity };
  if (xp >= 7000)  return { level: 9,  title: 'Threat Hunter',      next: 10000 };
  if (xp >= 5000)  return { level: 8,  title: 'DFIR Specialist',    next: 7000 };
  if (xp >= 3500)  return { level: 7,  title: 'Incident Handler',   next: 5000 };
  if (xp >= 2500)  return { level: 6,  title: 'Detection Engineer', next: 3500 };
  if (xp >= 1500)  return { level: 5,  title: 'Log Analyst',        next: 2500 };
  if (xp >= 800)   return { level: 4,  title: 'SIEM Operator',      next: 1500 };
  if (xp >= 400)   return { level: 3,  title: 'Security Watcher',   next: 800 };
  if (xp >= 150)   return { level: 2,  title: 'Network Novice',     next: 400 };
  return            { level: 1,  title: 'Recruit',              next: 150 };
}

// ─── Badges ──────────────────────────────────
const BADGES = [
  { id: 'first_day',      emoji: '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">play_circle</span>',        name: 'First Blood',      desc: 'Complete your first lesson',  req: 1   },
  { id: 'streak_7',       emoji: '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">local_fire_department</span>', name: 'Week Warrior',     desc: 'Maintain a 7-day streak',     req: 7   },
  { id: 'phase_one',      emoji: '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">military_tech</span>',        name: 'Foundation Laid',  desc: 'Complete 30 lessons',         req: 30  },
  { id: 'streak_30',      emoji: '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">whatshot</span>',             name: 'Dedicated',        desc: 'Maintain a 30-day streak',    req: 30  },
  { id: 'halfway',        emoji: '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">flash_on</span>',             name: 'Halfway Hero',     desc: 'Complete 60 lessons',         req: 60  },
  { id: 'streak_60',      emoji: '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">electric_bolt</span>',        name: 'Unstoppable',      desc: 'Maintain a 60-day streak',    req: 60  },
  { id: 'phase_three',    emoji: '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">radar</span>',               name: 'Advanced Operator',desc: 'Complete 90 lessons',         req: 90  },
  { id: 'soc_analyst',    emoji: '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">workspace_premium</span>',    name: 'SOC Analyst',      desc: 'Complete all 120 lessons',    req: 120 },
];

function getEarnedBadges() {
  return _progressCache ? (_progressCache.badges || []) : [];
}

function checkBadges(completedCount) {
  const earned = new Set(getEarnedBadges());
  const newBadges = [];
  BADGES.forEach(badge => {
    if (!earned.has(badge.id) && completedCount >= badge.req) {
      earned.add(badge.id);
      newBadges.push(badge);
    }
  });
  return newBadges;
}

// ─── Notes ───────────────────────────────────
async function saveNote(dayNum, text) {
  try {
    await fetch(`${progressAPI}/api/progress/note/${dayNum}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ text }),
    });
    // Update local cache
    if (_progressCache) {
      const existing = _progressCache.notes.find(n => n.day === dayNum);
      if (existing) existing.text = text;
      else _progressCache.notes.push({ day: dayNum, text });
      localStorage.setItem('soc_progress_cache', JSON.stringify(_progressCache));
    }
  } catch (e) {
    console.warn('[PROGRESS] saveNote API failed:', e.message);
    // Fallback to localStorage
    localStorage.setItem(`soc_notes_day_${dayNum}`, text);
  }
}

function getNote(dayNum) {
  if (_progressCache) {
    const note = _progressCache.notes.find(n => n.day === dayNum);
    return note ? note.text : '';
  }
  return localStorage.getItem(`soc_notes_day_${dayNum}`) || '';
}

// ─── Phase Progress ───────────────────────────
function getPhaseProgress(phase) {
  const allDays = [];
  phase.weeks.forEach(w => w.days.forEach(d => allDays.push(d.day)));
  const completed = getCompletedDays();
  const doneInPhase = allDays.filter(d => completed.includes(d)).length;
  return { total: allDays.length, done: doneInPhase, pct: Math.round((doneInPhase / allDays.length) * 100) };
}

// ─── Overall Stats ────────────────────────────
function getOverallStats() {
  const completed = getCompletedDays();
  const xp        = getTotalXP();
  const level     = getLevel(xp);
  const badges    = getEarnedBadges();
  const streak    = _progressCache ? (_progressCache.streak || 0) : 0;
  return { completedCount: completed.length, xp, level, badgeCount: badges.length, streak };
}

// ─── Competitive Results ──────────────────────
async function saveCompResult(score, total, testId) {
  try {
    await fetch(`${progressAPI}/api/progress/comp-result`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ testId, score, total }),
    });
    // Update local cache
    if (_progressCache) {
      if (!_progressCache.compResults) _progressCache.compResults = [];
      _progressCache.compResults.push({ testId, score, total, pct: Math.round((score/total)*100) });
    }
  } catch (e) {
    console.warn('[PROGRESS] saveCompResult API failed:', e.message);
    // Fallback to localStorage
    const results = JSON.parse(localStorage.getItem('soc_comp_results') || '[]');
    results.push({ testId, score, total, pct: Math.round((score/total)*100), date: new Date().toISOString() });
    localStorage.setItem('soc_comp_results', JSON.stringify(results));
  }
}

function getCompResults() {
  if (_progressCache && _progressCache.compResults) return _progressCache.compResults;
  return JSON.parse(localStorage.getItem('soc_comp_results') || '[]');
}

// ─── Bootstrap: called once at app start ──────
async function loadProgressAsync() {
  return await _loadProgress();
}
