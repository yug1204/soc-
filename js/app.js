// =============================================
// APP.JS — Main Application Controller
// =============================================
import { CURRICULUM, getAllDays, getDayData, getTodayDayNumber } from './curriculum.js';
import { initStreak, getStreak, getStreakLevel, renderHeatmap, requestNotificationPermission } from './streak.js';
import {
  isDayComplete, markDayComplete, unmarkDay,
  getTotalXP, getLevel,
  BADGES, getEarnedBadges, checkBadges,
  saveNote, getNote,
  getPhaseProgress, getOverallStats
} from './progress.js';

// ── App State ─────────────────────────────────
let currentView = 'dashboard';
let currentDayNum = 1;

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Handle first-time start
  if (!localStorage.getItem('soc_start_date')) {
    localStorage.setItem('soc_start_date', new Date().toISOString().split('T')[0]);
  }

  const streakResult = initStreak();

  // Show welcome / streak reset toast
  if (streakResult.isNew && streakResult.wasReset) {
    showToast(`Streak reset! You missed a day. Starting fresh at 1 🔄`, 'warning');
  } else if (streakResult.isNew && streakResult.streak === 1) {
    showToast(`Welcome to SOC Analyst Academy! Let's start your journey 🛡️`, 'success');
  } else if (streakResult.isNew) {
    showToast(`Day ${streakResult.streak} streak! Keep it going 🔥`, 'success');
  }

  setupNavigation();
  navigateTo('dashboard');

  // Ask for notification permission once
  if (!localStorage.getItem('soc_notifications')) {
    setTimeout(async () => {
      const granted = await requestNotificationPermission();
      if (granted) showToast('Notifications enabled! We\'ll remind you daily 🔔', 'success');
    }, 3000);
  }
});

// ── Navigation ────────────────────────────────
function setupNavigation() {
  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-nav');
      navigateTo(view);
    });
  });
}

function navigateTo(view, payload = {}) {
  currentView = view;

  // Update nav active state
  document.querySelectorAll('[data-nav]').forEach(b => b.classList.remove('active'));
  const activeNav = document.querySelector(`[data-nav="${view}"]`);
  if (activeNav) activeNav.classList.add('active');

  // Hide all views
  document.querySelectorAll('.view').forEach(v => {
    v.style.display = 'none';
    v.classList.remove('view-active');
  });

  // Show target view
  const target = document.getElementById(`view-${view}`);
  if (target) {
    target.style.display = 'block';
    setTimeout(() => target.classList.add('view-active'), 10);
  }

  // Render the view
  switch (view) {
    case 'dashboard':   renderDashboard();   break;
    case 'today':       renderTodayLesson(payload.day || getTodayDayNumber()); break;
    case 'curriculum':  renderCurriculum();  break;
    case 'achievements':renderAchievements(); break;
  }
}

// ── DASHBOARD ─────────────────────────────────
function renderDashboard() {
  const stats = getOverallStats();
  const streak = getStreak();
  const level = getLevel(stats.xp);
  const sl = getStreakLevel(streak);
  const todayDay = getTodayDayNumber();
  const todayData = getDayData(todayDay);

  // XP progress to next level
  const prevLevelXP = getLevel(stats.xp - 1)?.level !== level.level
    ? (level.level > 1 ? getPrevLevelXP(level.level) : 0)
    : 0;
  const xpIntoLevel = stats.xp - prevLevelXP;
  const xpForLevel = level.next === Infinity ? stats.xp : level.next - prevLevelXP;
  const xpPct = level.next === Infinity ? 100 : Math.min(100, Math.round((xpIntoLevel / xpForLevel) * 100));

  const el = document.getElementById('view-dashboard');
  el.innerHTML = `
    <div class="dashboard-grid">
      <!-- Streak Hero Card -->
      <div class="card streak-hero glow-card" onclick="window.goToView('curriculum')">
        <div class="streak-fire">${sl.emoji}</div>
        <div class="streak-number" style="color:${sl.color}">${streak}</div>
        <div class="streak-label">Day Streak</div>
        <div class="streak-badge" style="color:${sl.color}">${sl.label}</div>
      </div>

      <!-- Today's Lesson Card -->
      <div class="card today-card" onclick="window.goToLesson(${todayDay})">
        <div class="card-tag">📅 TODAY'S LESSON — DAY ${todayDay}</div>
        <h3>${todayData ? todayData.topic : 'Course Complete!'}</h3>
        <p>${todayData ? todayData.description?.substring(0, 100) + '...' : 'Congratulations on completing all 120 days!'}</p>
        <div class="today-meta">
          <span class="badge-pill">${todayData?.duration || ''}</span>
          <span class="badge-pill">${todayData?.difficulty || ''}</span>
          ${isDayComplete(todayDay) ? '<span class="badge-pill done">✅ Complete</span>' : '<span class="badge-pill cta">▶ Start Now</span>'}
        </div>
      </div>

      <!-- XP / Level Card -->
      <div class="card xp-card">
        <div class="card-tag">⚡ XP & LEVEL</div>
        <div class="level-display">
          <span class="level-num">LVL ${level.level}</span>
          <span class="level-title">${level.title}</span>
        </div>
        <div class="xp-bar-wrap">
          <div class="xp-bar" style="width:${xpPct}%"></div>
        </div>
        <div class="xp-text">${stats.xp.toLocaleString()} XP ${level.next !== Infinity ? `→ ${level.next.toLocaleString()} XP` : '(MAX)'}</div>
      </div>

      <!-- Stats Row -->
      <div class="card stats-card">
        <div class="stat-grid">
          <div class="stat-item">
            <div class="stat-num">${stats.completedCount}</div>
            <div class="stat-lbl">Days Done</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">${120 - stats.completedCount}</div>
            <div class="stat-lbl">Remaining</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">${stats.badgeCount}</div>
            <div class="stat-lbl">Badges</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">${Math.round((stats.completedCount / 120) * 100)}%</div>
            <div class="stat-lbl">Complete</div>
          </div>
        </div>
      </div>

      <!-- Streak Heatmap -->
      <div class="card heatmap-card">
        <div class="card-tag">📊 ACTIVITY — LAST 60 DAYS</div>
        <div id="heatmap-container"></div>
      </div>

      <!-- Phase Progress -->
      <div class="card phases-card">
        <div class="card-tag">🗺️ PHASE PROGRESS</div>
        ${CURRICULUM.phases.map(ph => {
          const prog = getPhaseProgress(ph);
          return `
            <div class="phase-progress-row">
              <div class="phase-info">
                <span class="phase-dot" style="background:${ph.color}"></span>
                <span class="phase-name">${ph.title.replace('Phase ', 'P')}</span>
                <span class="phase-days">Days ${ph.days}</span>
              </div>
              <div class="phase-bar-wrap">
                <div class="phase-bar" style="width:${prog.pct}%;background:${ph.color}"></div>
              </div>
              <span class="phase-pct">${prog.pct}%</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Render heatmap after DOM is ready
  setTimeout(() => renderHeatmap('heatmap-container'), 50);
}

function getPrevLevelXP(level) {
  const thresholds = [0, 0, 150, 400, 800, 1500, 2500, 3500, 5000, 7000, 10000];
  return thresholds[level] || 0;
}

// ── TODAY'S LESSON ─────────────────────────────
function renderTodayLesson(dayNum) {
  currentDayNum = dayNum;
  const day = getDayData(dayNum);
  const el = document.getElementById('view-today');

  if (!day) {
    el.innerHTML = `<div class="center-msg"><h2>🎓 Course Complete!</h2><p>You've finished all 120 days. You're a SOC Analyst!</p></div>`;
    return;
  }

  const done = isDayComplete(dayNum);
  const note = getNote(dayNum);

  el.innerHTML = `
    <div class="lesson-header">
      <div class="lesson-breadcrumb">
        <span style="color:${day.phaseColor}">${day.phaseTitle}</span>
        <span class="bc-sep">›</span>
        <span>${day.weekTitle}</span>
      </div>
      <div class="lesson-day-badge">Day ${dayNum} / 120</div>
    </div>

    <h1 class="lesson-title">${day.topic}</h1>
    <p class="lesson-desc">${day.description}</p>

    <div class="lesson-meta-row">
      <span class="meta-tag">⏱️ ${day.duration}</span>
      <span class="meta-tag diff-${day.difficulty.toLowerCase()}">${day.difficulty}</span>
      <span class="meta-tag xp-tag">+${day.xp} XP</span>
      ${done ? '<span class="meta-tag done-tag">✅ Completed</span>' : ''}
    </div>

    <!-- YouTube Player -->
    <div class="video-section">
      <div class="video-label">
        <span class="yt-icon">▶</span>
        <div>
          <div class="video-title">${day.video.title}</div>
          <div class="video-channel">by ${day.video.channel}</div>
        </div>
        <a href="${day.video.url}" target="_blank" class="open-yt-btn">Open in YouTube ↗</a>
      </div>
      <div class="video-wrapper">
        <iframe 
          src="${day.video.embed}" 
          title="${day.video.title}"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    </div>

    <!-- Resources -->
    <div class="resources-section">
      <h3 class="section-heading">📚 Additional Resources</h3>
      <div class="resource-grid">
        ${day.resources.map(r => `
          <a href="${r.url}" target="_blank" class="resource-card res-${r.type}">
            <div class="res-icon">${getResIcon(r.type)}</div>
            <div class="res-info">
              <div class="res-title">${r.title}</div>
              <div class="res-type">${r.type.toUpperCase()}</div>
            </div>
            <div class="res-arrow">↗</div>
          </a>
        `).join('')}
      </div>
    </div>

    <!-- Notes -->
    <div class="notes-section">
      <h3 class="section-heading">📝 My Notes</h3>
      <textarea id="lesson-notes" class="notes-area" placeholder="Write your notes here... What did you learn? Any key takeaways?">${note}</textarea>
      <button class="save-btn" onclick="window.saveNoteHandler(${dayNum})">💾 Save Notes</button>
    </div>

    <!-- Complete Button -->
    <div class="complete-section">
      <button class="complete-btn ${done ? 'done' : ''}" id="complete-btn" onclick="window.toggleComplete(${dayNum}, ${day.xp})">
        ${done ? '✅ Completed! (Click to undo)' : `✅ Mark as Complete (+${day.xp} XP)`}
      </button>
    </div>

    <!-- Day Navigation -->
    <div class="day-nav">
      ${dayNum > 1 ? `<button class="day-nav-btn" onclick="window.goToLesson(${dayNum - 1})">← Day ${dayNum - 1}</button>` : '<div></div>'}
      ${dayNum < 120 ? `<button class="day-nav-btn primary" onclick="window.goToLesson(${dayNum + 1})">Day ${dayNum + 1} →</button>` : '<div></div>'}
    </div>
  `;
}

function getResIcon(type) {
  const icons = { lab: '🧪', article: '📄', video: '🎬', reference: '📖', tool: '🔧', course: '🎓' };
  return icons[type] || '🔗';
}

// ── CURRICULUM MAP ─────────────────────────────
function renderCurriculum() {
  const el = document.getElementById('view-curriculum');
  
  el.innerHTML = `
    <div class="curriculum-header">
      <h1>📚 120-Day SOC Analyst Curriculum</h1>
      <p>From Zero to SOC Hero — click any day to start learning</p>
    </div>
    <div class="phases-container">
      ${CURRICULUM.phases.map(phase => {
        const prog = getPhaseProgress(phase);
        return `
          <div class="phase-block">
            <div class="phase-header" style="border-left: 4px solid ${phase.color}">
              <div>
                <h2 style="color:${phase.color}">${phase.title}</h2>
                <p class="phase-subtitle">${phase.subtitle}</p>
                <div class="phase-days-label">Days ${phase.days}</div>
              </div>
              <div class="phase-stats">
                <div class="phase-ring-wrap">
                  <svg viewBox="0 0 36 36" class="phase-ring">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ffffff15" stroke-width="3"/>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="${phase.color}" stroke-width="3"
                      stroke-dasharray="${prog.pct} ${100 - prog.pct}" stroke-dashoffset="25"
                      stroke-linecap="round"/>
                  </svg>
                  <span class="ring-pct">${prog.pct}%</span>
                </div>
                <div class="ring-label">${prog.done}/${prog.total} done</div>
              </div>
            </div>
            <div class="weeks-container">
              ${phase.weeks.map(week => `
                <div class="week-block">
                  <div class="week-title">${week.title}</div>
                  <div class="days-grid">
                    ${week.days.map(day => {
                      const done = isDayComplete(day.day);
                      const isToday = day.day === getTodayDayNumber();
                      return `
                        <div class="day-card ${done ? 'done' : ''} ${isToday ? 'today' : ''}" 
                             onclick="window.goToLesson(${day.day})">
                          <div class="day-num">${day.day}</div>
                          <div class="day-topic">${day.topic}</div>
                          <div class="day-footer">
                            <span class="day-dur">${day.duration}</span>
                            ${done ? '<span class="day-check">✓</span>' : ''}
                            ${isToday ? '<span class="today-pip">TODAY</span>' : ''}
                          </div>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ── ACHIEVEMENTS ───────────────────────────────
function renderAchievements() {
  const el = document.getElementById('view-achievements');
  const earned = new Set(getEarnedBadges());
  const stats = getOverallStats();
  const level = getLevel(stats.xp);

  el.innerHTML = `
    <div class="achievements-header">
      <h1>🏆 Achievements</h1>
      <p>${earned.size} of ${BADGES.length} badges unlocked</p>
    </div>

    <!-- Level Card -->
    <div class="card level-card">
      <div class="level-big">
        <div class="level-circle">
          <span class="lc-num">${level.level}</span>
          <span class="lc-lbl">LVL</span>
        </div>
        <div class="level-details">
          <h2>${level.title}</h2>
          <p>${stats.xp.toLocaleString()} XP Total</p>
          ${level.next !== Infinity ? `<p>${(level.next - stats.xp).toLocaleString()} XP to Level ${level.level + 1}</p>` : '<p>Maximum Level Reached! 🎖️</p>'}
        </div>
      </div>
    </div>

    <!-- Badges Grid -->
    <div class="badges-grid">
      ${BADGES.map(b => {
        const isEarned = earned.has(b.id);
        return `
          <div class="badge-card ${isEarned ? 'earned' : 'locked'}">
            <div class="badge-emoji">${isEarned ? b.emoji : '🔒'}</div>
            <div class="badge-name">${b.name}</div>
            <div class="badge-desc">${b.desc}</div>
            ${isEarned ? '<div class="badge-earned-label">✅ EARNED</div>' : `<div class="badge-locked-label">Complete ${b.req} lessons</div>`}
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ── Global Handlers ────────────────────────────
window.goToView = (view) => navigateTo(view);
window.goToLesson = (day) => navigateTo('today', { day });

window.toggleComplete = (dayNum, xp) => {
  if (isDayComplete(dayNum)) {
    unmarkDay(dayNum, xp);
    showToast(`Day ${dayNum} unmarked`, 'info');
  } else {
    const newBadges = checkBadges(1); // will be rechecked inside markDayComplete
    const isNew = markDayComplete(dayNum, xp);
    if (isNew) {
      showToast(`+${xp} XP earned! Day ${dayNum} complete! 🎉`, 'success');
      // Re-render the complete button
      const btn = document.getElementById('complete-btn');
      if (btn) {
        btn.textContent = '✅ Completed! (Click to undo)';
        btn.classList.add('done');
      }
    }
  }
};

window.saveNoteHandler = (dayNum) => {
  const textarea = document.getElementById('lesson-notes');
  if (textarea) {
    saveNote(dayNum, textarea.value);
    showToast('Notes saved! 💾', 'success');
  }
};

// ── Toast Notifications ────────────────────────
function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
