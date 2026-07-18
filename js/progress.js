// =============================================
// PROGRESS TRACKER — XP, Badges, Completion
// =============================================

const COMPLETED_KEY = 'soc_completed_days';
const XP_KEY = 'soc_total_xp';
const NOTES_PREFIX = 'soc_notes_day_';

// ── Completion Tracking ──────────────────────
function getCompletedDays() {
  return JSON.parse(localStorage.getItem(COMPLETED_KEY) || '[]');
}

function isDayComplete(dayNum) {
  return getCompletedDays().includes(dayNum);
}

function markDayComplete(dayNum, xpReward) {
  const completed = getCompletedDays();
  if (!completed.includes(dayNum)) {
    completed.push(dayNum);
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));
    addXP(xpReward || 50);
    checkBadges(completed.length);
    return true; // newly completed
  }
  return false; // already done
}

function unmarkDay(dayNum, xpReward) {
  const completed = getCompletedDays().filter(d => d !== dayNum);
  localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));
  subtractXP(xpReward || 50);
}

// ── XP System ────────────────────────────────
function getTotalXP() {
  return parseInt(localStorage.getItem(XP_KEY) || '0');
}

function addXP(amount) {
  const current = getTotalXP();
  localStorage.setItem(XP_KEY, current + amount);
}

function subtractXP(amount) {
  const current = getTotalXP();
  localStorage.setItem(XP_KEY, Math.max(0, current - amount));
}

function getLevel(xp) {
  if (xp >= 10000) return { level: 10, title: 'Master Defender', next: Infinity };
  if (xp >= 7000)  return { level: 9,  title: 'Threat Hunter',   next: 10000 };
  if (xp >= 5000)  return { level: 8,  title: 'DFIR Specialist',  next: 7000 };
  if (xp >= 3500)  return { level: 7,  title: 'Incident Handler', next: 5000 };
  if (xp >= 2500)  return { level: 6,  title: 'Detection Engineer', next: 3500 };
  if (xp >= 1500)  return { level: 5,  title: 'Log Analyst',      next: 2500 };
  if (xp >= 800)   return { level: 4,  title: 'SIEM Operator',    next: 1500 };
  if (xp >= 400)   return { level: 3,  title: 'Security Watcher', next: 800 };
  if (xp >= 150)   return { level: 2,  title: 'Network Novice',   next: 400 };
  return           { level: 1,  title: 'Recruit',           next: 150 };
}

// ── Badges / Achievements ─────────────────────
const BADGES = [
  { id: 'first_day',      emoji: '🌱', name: 'First Steps',       desc: 'Complete your first lesson',         req: 1   },
  { id: 'week_one',       emoji: '📅', name: 'Week Warrior',       desc: 'Complete 7 lessons',                 req: 7   },
  { id: 'fortnight',      emoji: '⚔️', name: 'Fortnight Fighter',  desc: 'Complete 14 lessons',                req: 14  },
  { id: 'phase_one',      emoji: '🏅', name: 'Foundation Laid',    desc: 'Complete 30 lessons',                req: 30  },
  { id: 'siem_samurai',   emoji: '🥷', name: 'SIEM Samurai',       desc: 'Complete 50 lessons',                req: 50  },
  { id: 'halfway',        emoji: '⚡', name: 'Halfway Hero',        desc: 'Complete 60 lessons',                req: 60  },
  { id: 'threat_hunter',  emoji: '🎯', name: 'Threat Hunter',      desc: 'Complete 90 lessons',                req: 90  },
  { id: 'centurion',      emoji: '💯', name: 'Centurion',          desc: 'Complete 100 lessons',               req: 100 },
  { id: 'soc_analyst',    emoji: '🏆', name: 'SOC Analyst',        desc: 'Complete all 120 lessons',           req: 120 },
];

function getEarnedBadges() {
  return JSON.parse(localStorage.getItem('soc_badges') || '[]');
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

  if (newBadges.length > 0) {
    localStorage.setItem('soc_badges', JSON.stringify([...earned]));
  }
  return newBadges;
}

// ── Notes ─────────────────────────────────────
function saveNote(dayNum, text) {
  localStorage.setItem(NOTES_PREFIX + dayNum, text);
}

function getNote(dayNum) {
  return localStorage.getItem(NOTES_PREFIX + dayNum) || '';
}

// ── Phase Progress ─────────────────────────────
function getPhaseProgress(phase) {
  const allDays = [];
  phase.weeks.forEach(w => w.days.forEach(d => allDays.push(d.day)));
  const completed = getCompletedDays();
  const doneInPhase = allDays.filter(d => completed.includes(d)).length;
  return { total: allDays.length, done: doneInPhase, pct: Math.round((doneInPhase / allDays.length) * 100) };
}

// ── Overall Stats ──────────────────────────────
function getOverallStats() {
  const completed = getCompletedDays();
  const xp = getTotalXP();
  const level = getLevel(xp);
  const badges = getEarnedBadges();
  const streak = parseInt(localStorage.getItem('soc_streak_count') || '0');
  return { completedCount: completed.length, xp, level, badgeCount: badges.length, streak };
}

export {
  getCompletedDays, isDayComplete, markDayComplete, unmarkDay,
  getTotalXP, addXP, getLevel,
  BADGES, getEarnedBadges, checkBadges,
  saveNote, getNote,
  getPhaseProgress, getOverallStats
};
