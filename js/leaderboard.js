// =============================================
// LEADERBOARD.JS — Real leaderboard from API
// Falls back to seeded data when offline.
// =============================================

// Seed data shown while API loads or when offline
const SEED_PLAYERS = [
  { name: 'Arjun Mehta',   xp: 9800, days: 112, initials: 'AM', color: '#00ff00' },
  { name: 'Sarah Connor',  xp: 8900, days: 105, initials: 'SC', color: '#ffd43b' },
  { name: 'Ravi Kumar',    xp: 7600, days: 98,  initials: 'RK', color: '#74c0fc' },
  { name: 'Emily Zhang',   xp: 6500, days: 87,  initials: 'EZ', color: '#cc5de8' },
  { name: 'Marcus Webb',   xp: 5200, days: 74,  initials: 'MW', color: '#ff6b6b' },
  { name: 'Priya Nair',    xp: 4100, days: 62,  initials: 'PN', color: '#20c997' },
  { name: "James O'Brien", xp: 3300, days: 51,  initials: 'JO', color: '#ffa94d' },
  { name: 'Ana Rodrigues', xp: 2400, days: 38,  initials: 'AR', color: '#f06595' },
  { name: 'Kevin Park',    xp: 1600, days: 24,  initials: 'KP', color: '#a9e34b' },
];

async function getLeaderboard() {
  try {
    const apiBase = window.API_BASE || 'http://localhost:3001';
    const res = await fetch(apiBase + '/api/leaderboard', { credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      return data; // Already shaped by server
    }
  } catch (e) {
    console.warn('[LEADERBOARD] API unavailable, using seed data');
  }

  // Offline fallback — merge seed data with local user
  const profile  = typeof getProfile === 'function' ? getProfile() : null;
  const userXp   = typeof getTotalXP === 'function' ? getTotalXP() : 0;
  const userDays = typeof getCompletedDays === 'function' ? getCompletedDays().length : 0;
  const userName = profile ? profile.name : 'You';

  const userEntry = {
    name:     userName,
    xp:       userXp,
    days:     userDays,
    initials: typeof getInitials === 'function' ? getInitials(userName) : '?',
    color:    '#00ff41',
    isUser:   true,
  };

  const all = [...SEED_PLAYERS, userEntry];
  all.sort((a, b) => b.xp - a.xp);
  return all.slice(0, 10).map((p, i) => ({ ...p, rank: i + 1 }));
}

function getUserRank() {
  // Sync estimate from local data
  const userXp = typeof getTotalXP === 'function' ? getTotalXP() : 0;
  const beat = SEED_PLAYERS.filter(p => p.xp < userXp).length;
  return SEED_PLAYERS.length - beat + 1;
}

// Keep these for competitive-test.js compatibility
function saveCompResult(score, total, testId) {
  if (typeof window.saveCompResult === 'function') return;
  // Delegate to progress.js
  if (typeof saveCompResult !== 'undefined') return;
  const results = JSON.parse(localStorage.getItem('soc_comp_results') || '[]');
  results.push({ score, total, testId, date: new Date().toISOString(), pct: Math.round((score/total)*100) });
  localStorage.setItem('soc_comp_results', JSON.stringify(results));
}

function getCompResults() {
  if (typeof window._progressCache !== 'undefined' && window._progressCache) {
    return window._progressCache.compResults || [];
  }
  return JSON.parse(localStorage.getItem('soc_comp_results') || '[]');
}

function isCompTestUnlocked(weekNum) {
  const days = typeof getCompletedDays === 'function' ? getCompletedDays().length : 0;
  return days >= weekNum * 14;
}

function hasPassedTest(testId) {
  return getCompResults().some(r => r.testId === testId && r.pct >= 60);
}
