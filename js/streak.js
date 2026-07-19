// =============================================
// STREAK ENGINE — Track daily learning streaks
// =============================================

const STREAK_KEY = 'soc_streak_count';
const LAST_VISIT_KEY = 'soc_last_visit';
const HISTORY_KEY = 'soc_visit_history';
const START_DATE_KEY = 'soc_start_date';

function getToday() {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

function initStreak() {
  const today = getToday();
  const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
  let streak = parseInt(localStorage.getItem(STREAK_KEY) || '0');
  let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');

  // First ever visit
  if (!lastVisit) {
    localStorage.setItem(START_DATE_KEY, today);
    streak = 1;
    history.push(today);
    localStorage.setItem(STREAK_KEY, streak);
    localStorage.setItem(LAST_VISIT_KEY, today);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    return { streak, isNew: true, wasReset: false };
  }

  const last = new Date(lastVisit);
  const now = new Date(today);
  const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Same day — no change
    return { streak, isNew: false, wasReset: false };
  } else if (diffDays === 1) {
    // Consecutive day — increment streak
    streak += 1;
    history.push(today);
  } else {
    // Missed day(s) — reset streak
    const oldStreak = streak;
    streak = 1;
    history.push(today);
    localStorage.setItem(STREAK_KEY, streak);
    localStorage.setItem(LAST_VISIT_KEY, today);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    return { streak, isNew: true, wasReset: true, oldStreak };
  }

  localStorage.setItem(STREAK_KEY, streak);
  localStorage.setItem(LAST_VISIT_KEY, today);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return { streak, isNew: true, wasReset: false };
}

function getStreak() {
  return parseInt(localStorage.getItem(STREAK_KEY) || '0');
}

function getVisitHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
}

function getStreakLevel(streak) {
  if (streak >= 100) return { label: 'LEGEND', color: '#ff0080', emoji: '💎' };
  if (streak >= 60)  return { label: 'ELITE', color: '#cc00ff', emoji: '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">electric_bolt</span>' };
  if (streak >= 30)  return { label: 'VETERAN', color: '#ff6b35', emoji: '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">whatshot</span>' };
  if (streak >= 14)  return { label: 'CONSISTENT', color: '#00ccff', emoji: '🌊' };
  if (streak >= 7)   return { label: 'ON A ROLL', color: '#00ff88', emoji: '✨' };
  if (streak >= 3)   return { label: 'BUILDING', color: '#88ff00', emoji: '🌱' };
  return { label: 'STARTING', color: '#ffffff', emoji: '🚀' };
}

// Generate heatmap data for the last N days
function getHeatmapData(days = 60) {
  const history = new Set(getVisitHistory());
  const result = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    result.push({
      date: dateStr,
      active: history.has(dateStr),
      dayLabel: d.toLocaleDateString('en-US', { weekday: 'short' }),
      fullLabel: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    });
  }
  return result;
}

// Render the streak heatmap calendar into a container element
function renderHeatmap(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const data = getHeatmapData(60);
  
  const weeks = [];
  let week = [];
  data.forEach((d, i) => {
    week.push(d);
    if (week.length === 7 || i === data.length - 1) {
      weeks.push(week);
      week = [];
    }
  });

  container.innerHTML = `
    <div class="heatmap-grid">
      ${weeks.map(wk => `
        <div class="heatmap-week">
          ${wk.map(d => `
            <div class="heatmap-cell ${d.active ? 'active' : ''}" 
                 title="${d.fullLabel}${d.active ? ' ✓ Studied' : ''}">
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
    <div class="heatmap-legend">
      <span>60 days ago</span>
      <div class="legend-cells">
        <div class="heatmap-cell"></div>
        <div class="heatmap-cell active" style="opacity:0.3"></div>
        <div class="heatmap-cell active" style="opacity:0.6"></div>
        <div class="heatmap-cell active"></div>
      </div>
      <span>Today</span>
    </div>
  `;
}

// Request browser notification permission
async function requestNotificationPermission() {
  if ('Notification' in window) {
    const perm = await Notification.requestPermission();
    localStorage.setItem('soc_notifications', perm === 'granted' ? 'true' : 'false');
    return perm === 'granted';
  }
  return false;
}

// Show a streak reminder notification
function showStreakNotification(streak) {
  const canNotify = localStorage.getItem('soc_notifications') === 'true';
  if (!canNotify || !('Notification' in window)) return;

  const msgs = [
    `<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">bolt</span> ${streak} day uptime! Don't break it — study now!`,
    `<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">electric_bolt</span> Perfect uptime! ${streak} days straight!`,
    `🎯 SOC Analyst in progress — ${streak} days strong!`,
    `💪 Keep going! Your ${streak}-day streak is waiting!`
  ];
  const msg = msgs[Math.floor(Math.random() * msgs.length)];
  
  new Notification('SOC Analyst Daily Reminder', {
    body: msg,
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🛡️</text></svg>'
  });
}

// streak.js loaded as plain script - functions available globally
