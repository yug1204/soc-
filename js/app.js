// =============================================
// APP.JS — Main Application Controller
// All dependencies loaded as plain scripts before this file
// =============================================

// ── App State ─────────────────────────────────
let currentView = 'dashboard';
let currentDayNum = 1;

// ─── API base URL (change to your server address if deployed) ───
window.API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') 
  ? 'http://localhost:3001' 
  : '';

// ── Error Boundary ──────────────────────────────
window.addEventListener('unhandledrejection', (e) => {
  console.warn('[APP] Unhandled Promise Rejection:', e.reason);
});

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize theme
  const savedTheme = localStorage.getItem('soc_theme');
  if (savedTheme === 'light') {
    document.body.classList.add('theme-light');
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = 'dark_mode';
  }

  // Show loading state while we restore session from backend
  showBootSpinner();

  try {
    // 1. Restore JWT session (sets profile cache from cookie)
    await bootstrapAuth();
    // 2. Load progress from backend into memory cache
    if (isLoggedIn()) await loadProgressAsync();
  } catch (e) {
    console.warn('[APP] Bootstrap failed (offline?), continuing with localStorage cache:', e.message);
  }

  hideBootSpinner();

  if (!isLoggedIn()) {
    showLoginScreen();
    return;
  }
  bootApp();
});

function showBootSpinner() {
  // The loading... text in index.html serves as the spinner
  const el = document.getElementById('boot-spinner');
  if (el) el.style.display = 'flex';
}
function hideBootSpinner() {
  const el = document.getElementById('boot-spinner');
  if (el) el.style.display = 'none';
}

async function bootApp() {
  // Handle first-time start
  if (!localStorage.getItem('soc_start_date')) {
    localStorage.setItem('soc_start_date', new Date().toISOString().split('T')[0]);
  }

  // Show the main app shell
  document.getElementById('app-shell').style.display = 'flex';
  document.getElementById('login-screen').style.display = 'none';

  // Streak is now managed server-side; get from cached progress
  const stats = getOverallStats();
  const profile = getProfile();

  // Show welcome toast
  showToast(`Welcome back, ${profile ? profile.name : 'Analyst'}!`, 'success');

  updateProfileIcon();
  setupNavigation();
  navigateTo('dashboard');

  // Ask for notification permission once
  if (!localStorage.getItem('soc_notifications')) {
    setTimeout(async () => {
      const granted = await requestNotificationPermission();
      if (granted) showToast('Notifications enabled! We\'ll remind you daily 🔔', 'success');
    }, 3000);
  }
}

function updateProfileIcon() {
  const profile = getProfile();
  if (!profile) return;
  const el = document.getElementById('topbar-avatar');
  if (!el) return;
  if (profile.avatar) {
    el.innerHTML = `<img src="${profile.avatar}" alt="avatar" style="width:100%;height:100%;border-radius:50%;object-fit:cover">`;
  } else {
    el.textContent = getInitials(profile.name);
  }
}

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
    case 'dashboard':      renderDashboard();   break;
    case 'today':          renderTodayLesson(payload.day || getTodayDayNumber()); break;
    case 'curriculum':     renderCurriculum();  break;
    case 'achievements':   renderAchievements(); break;
    case 'profile':        renderProfileView(); break;
    case 'leaderboard':    renderLeaderboardView(); break;
    case 'competitive':    renderCompetitiveView(); break;
    case 'certificate':    setTimeout(() => renderCertificate('cert-render-target'), 50); break;
  }
}

// ── DASHBOARD ───────────────────────────────────
function renderDashboard() {
  const stats = getOverallStats();
  const streak = getStreak();
  const todayDay = getTodayDayNumber();
  const todayData = getDayData(todayDay);
  const pct = Math.round((stats.completedCount / 120) * 100);
  const level = getLevel(stats.xp);

  const el = document.getElementById('view-dashboard');
  el.innerHTML = `
    <div class="dashboard-hero">

      <!-- Mission Card: the dominant element -->
      <div class="mission-card">
        <div class="mission-eyebrow">MISSION STATUS</div>
        <div class="mission-day-counter">
          <span class="dc-num" id="dash-day-num">00</span>
          <span class="dc-total"> / 120 days</span>
        </div>
        <div class="mission-label">Days completed &mdash; ${120 - stats.completedCount} remaining</div>
        <div class="mission-progress">
          <div class="mission-progress-bar">
            <div class="mission-progress-fill" id="dash-progress-fill" style="width:0%"></div>
          </div>
          <span class="mission-pct" id="dash-pct">0%</span>
        </div>
        <button class="mission-cta" onclick="window.goToLesson(${todayDay})">
          ▶ Day ${todayDay}: ${todayData ? todayData.topic : 'Course Complete!'}
        </button>
      </div>

      <!-- Stat pills: small, stacked, quiet -->
      <div class="dashboard-stats">
        <div class="stat-pill">
          <div class="stat-pill-num" style="color:var(--c-red)">${streak}</div>
          <div class="stat-pill-lbl"><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">bolt</span> System Uptime</div>
        </div>
        <div class="stat-pill">
          <div class="stat-pill-num" style="color:var(--c-amber)">${stats.xp.toLocaleString()}</div>
          <div class="stat-pill-lbl"><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">database</span> Total XP</div>
        </div>
        <div class="stat-pill">
          <div class="stat-pill-num" style="color:var(--c-teal)">#${getUserRank ? getUserRank() : '—'}</div>
          <div class="stat-pill-lbl">Global Rank</div>
        </div>
        <div class="stat-pill" style="cursor:pointer" onclick="window.goToView('achievements')">
          <div class="stat-pill-num" style="color:#cc5de8">${stats.badgeCount}</div>
          <div class="stat-pill-lbl"><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">military_tech</span> Badges</div>
        </div>
      </div>
    </div>

    <!-- Phase progress bars -->
    <div class="card phase-progress-section" style="margin-bottom:20px">
      <div class="card-tag">PHASE PROGRESS</div>
      ${CURRICULUM.phases.map(ph => {
        const prog = getPhaseProgress(ph);
        return `
          <div class="phase-progress-row">
            <div class="phase-dot" style="background:${ph.color}"></div>
            <div class="phase-name" style="color:${ph.color}">${ph.title.replace('Phase ', 'P')}</div>
            <div class="phase-bar-wrap">
              <div class="phase-bar" style="width:${prog.pct}%;background:${ph.color}"></div>
            </div>
            <span class="phase-pct">${prog.pct}%</span>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Activity heatmap -->
    <div class="card heatmap-card">
      <div class="card-tag">ACTIVITY &mdash; LAST 60 DAYS</div>
      <div id="heatmap-container"></div>
      <div class="heatmap-legend">
        <span>Less</span>
        <span class="heatmap-legend-swatch" style="background:var(--c-panel)"></span>
        <span class="heatmap-legend-swatch" style="background:var(--c-amber);opacity:0.4"></span>
        <span class="heatmap-legend-swatch" style="background:var(--c-amber);opacity:0.7"></span>
        <span class="heatmap-legend-swatch" style="background:var(--c-amber)"></span>
        <span>More</span>
      </div>
    </div>
  `;

  // Animate mission counter after DOM is painted
  requestAnimationFrame(() => {
    setTimeout(() => {
      animateCounter('dash-day-num', stats.completedCount, 900);
      animateProgressFill('dash-progress-fill', 'dash-pct', pct, 1000);
    }, 80);
    renderHeatmap('heatmap-container');
  });
}

function animateCounter(elId, target, duration) {
  const el = document.getElementById(elId);
  if (!el) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = String(target).padStart(2, '0');
    return;
  }
  const start = performance.now();
  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = String(Math.round(eased * target)).padStart(2, '0');
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function animateProgressFill(barId, pctId, target, duration) {
  const bar = document.getElementById(barId);
  const pctEl = document.getElementById(pctId);
  if (!bar) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    bar.style.width = target + '%';
    if (pctEl) pctEl.textContent = target + '%';
    return;
  }
  const start = performance.now();
  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = Math.round(eased * target);
    bar.style.width = val + '%';
    if (pctEl) pctEl.textContent = val + '%';
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ── TODAY'S LESSON ───────────────────────────────
function renderTodayLesson(dayNum) {
  currentDayNum = dayNum;
  const day = getDayData(dayNum);
  const el = document.getElementById('view-today');

  if (!day) {
    el.innerHTML = `<div class="center-msg"><h2><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">workspace_premium</span> You finished.</h2><p>All 120 days complete. You're a SOC Analyst. <a onclick="window.goToView('profile')">Download your certificate →</a></p></div>`;
    return;
  }

  const done = isDayComplete(dayNum);
  const note = getNote(dayNum);
  const pct = Math.round((dayNum / 120) * 100);

  el.innerHTML = `
    <div class="lesson-wrap">

      <!-- Header: breadcrumb + Mission Clock (signature element) -->
      <div class="lesson-header">
        <div class="lesson-header-left">
          <div class="lesson-breadcrumb">
            <span style="color:${day.phaseColor}">${day.phaseTitle}</span>
            <span class="bc-sep">›</span>
            <span>${day.weekTitle}</span>
          </div>
          <h1 class="lesson-title">${day.topic}</h1>
          <p class="lesson-desc">${day.description}</p>
        </div>

        <!-- MISSION CLOCK: the one signature element -->
        <div class="mission-clock">
          <div class="mc-eyebrow">MISSION</div>
          <div class="mc-divider">── ── ──</div>
          <div class="mc-counter">
            <span class="mc-day">${String(dayNum).padStart(2,'0')}</span><span class="mc-sep">/</span><span class="mc-total">120</span>
          </div>
          <div class="mc-bar"><div class="mc-bar-fill" id="mc-bar-fill" style="width:0%"></div></div>
        </div>
      </div>

      <!-- Meta tags -->
      <div class="lesson-meta-row">
        <span class="meta-tag"><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">schedule</span> ${day.duration}</span>
        <span class="meta-tag diff-${day.difficulty.toLowerCase()}">${day.difficulty}</span>
        <span class="meta-tag xp-tag">+${day.xp} XP</span>
        ${done ? '<span class="meta-tag done-tag"><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">check_circle</span> Completed</span>' : ''}
      </div>

      <!-- Video -->
      <div class="video-section">
        <div class="video-label">
          <span class="yt-icon">▶</span>
          <div>
            <div class="video-title">${day.video.title}</div>
            <div class="video-channel">${day.video.channel}</div>
          </div>
          <a href="${day.video.url}" target="_blank" class="open-yt-btn">Open in YouTube ↗</a>
        </div>
        <div class="video-wrapper">
          <iframe src="${day.video.embed}" title="${day.video.title}" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        </div>
      </div>

      <!-- Resources + Notes: asymmetric 2-col -->
      <div class="lesson-lower">
        <div class="resources-section">
          <h3 class="section-heading">Resources</h3>
          <div class="resource-grid">
            ${day.resources.map(r => `
              <a href="${r.url}" target="_blank" class="resource-card">
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

        <div class="notes-section">
          <h3 class="section-heading">Notes</h3>
          <textarea id="lesson-notes" class="notes-area" placeholder="What did you learn? Key takeaways?">${note}</textarea>
          <button class="save-btn" onclick="window.saveNoteHandler(${dayNum})">Save Notes</button>
        </div>
      </div>

      <!-- Complete button -->
      <div class="complete-section">
        <button class="complete-btn ${done ? 'done' : ''}" id="complete-btn" onclick="window.toggleComplete(${dayNum}, ${day.xp})">
          ${done ? '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">check_circle</span> Completed — click to undo' : `<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">play_arrow</span> Mark as Complete &nbsp;+${day.xp} XP`}
        </button>
      </div>

      <!-- Day nav -->
      <div class="day-nav">
        ${dayNum > 1 ? `<button class="day-nav-btn" onclick="window.goToLesson(${dayNum - 1})">← Day ${dayNum - 1}</button>` : '<div></div>'}
        ${dayNum < 120
          ? isDayUnlocked(dayNum + 1)
            ? `<button class="day-nav-btn primary" onclick="window.goToLesson(${dayNum + 1})">Day ${dayNum + 1} →</button>`
            : `<button class="day-nav-btn" style="opacity:0.4;cursor:not-allowed" onclick="showToast('Finish Day ${dayNum} to unlock the next one','warning')">Day ${dayNum + 1} <span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">lock</span></button>`
          : '<div></div>'}
      </div>

      <!-- Discussion Board -->
      <div class="discussion-section" style="margin-top:40px;border-top:1px solid var(--border);padding-top:20px">
        <h3 class="section-heading"><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">forum</span> Discussion Board</h3>
        <p style="color:var(--text-secondary);font-size:14px;margin-bottom:16px">Ask questions or share tips about Day ${dayNum}.</p>
        
        <div id="comments-container-${dayNum}" style="margin-bottom:20px;max-height:400px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;">
          <div style="color:var(--text-secondary)">Loading comments...</div>
        </div>

        <form class="comment-form" onsubmit="window.postComment(event, ${dayNum})" style="display:flex;gap:8px">
          <input type="text" id="comment-input-${dayNum}" placeholder="Add a comment..." required style="flex:1;padding:12px;background:var(--bg-elevated);border:1px solid var(--border);color:var(--text-primary);border-radius:8px">
          <button type="submit" class="quiz-btn primary" style="width:auto;padding:0 24px">Post</button>
        </form>
      </div>

    </div>
  `;

  // Fetch comments
  if (typeof window.loadComments === 'function') {
    window.loadComments(dayNum);
  }

  // Animate the Mission Clock bar — the one page-load moment
  requestAnimationFrame(() => {
    setTimeout(() => animateMissionClock(pct), 120);
  });
}

function animateMissionClock(pct) {
  const bar = document.getElementById('mc-bar-fill');
  if (!bar) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    bar.style.width = pct + '%';
    return;
  }
  const start = performance.now();
  const duration = 900;
  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    bar.style.width = (eased * pct) + '%';
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function getResIcon(type) {
  const icons = { lab: '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">science</span>', article: '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">article</span>', video: '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">play_circle</span>', reference: '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">menu_book</span>', tool: '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">build</span>', course: '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">workspace_premium</span>' };
  return icons[type] || '🔗';
}

function renderCurriculum() {
  const el = document.getElementById('view-curriculum');
  
  el.innerHTML = `
    <div class="curriculum-header">
      <h1><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">account_tree</span> 120-Day SOC Analyst Curriculum</h1>
      <p>From Zero to SOC Hero — click any day to start learning</p>
    </div>
    
    <!-- Advertisement Placeholder -->
    <div class="ad-placeholder ad-banner">
      <span class="material-symbols-sharp" style="margin-bottom:8px;font-size:24px">campaign</span>
      Ad Placement Banner<br><span style="font-size:9px;opacity:0.7">(Carbon Ads / AdSense)</span>
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
                      const unlocked = isDayUnlocked(day.day);
                      return `
                        <div class="day-card ${done ? 'done' : ''} ${isToday ? 'today' : ''} ${!unlocked ? 'locked' : ''}" 
                             onclick="${unlocked ? `window.goToLesson(${day.day})` : `showToast('Complete Day ${day.day - 1} to unlock! [LOCKED]', 'warning')`}">
                          <div class="day-num">${day.day}</div>
                          <div class="day-topic">${day.topic}</div>
                          <div class="day-footer">
                            <span class="day-dur">${day.duration}</span>
                            ${done ? '<span class="day-check"><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">check_circle</span></span>' : (!unlocked ? '<span class="day-check" style="color:var(--text-dim)"><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">lock</span></span>' : '')}
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
      <h1><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">military_tech</span> Achievements</h1>
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
            <div class="badge-emoji">${isEarned ? b.emoji : '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">lock</span>'}</div>
            <div class="badge-name">${b.name}</div>
            <div class="badge-desc">${b.desc}</div>
            ${isEarned ? '<div class="badge-earned-label"><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">check_circle</span> EARNED</div>' : `<div class="badge-locked-label">Complete ${b.req} lessons</div>`}
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ── Global Handlers ────────────────────────────
window.goToView = (view) => navigateTo(view);
window.goToLesson = (day) => {
  if (!isDayUnlocked(day)) {
    showToast(`You must complete Day ${day - 1} to unlock Day ${day}! [LOCKED]`, 'warning');
    return;
  }
  navigateTo('today', { day });
};

window.toggleComplete = (dayNum, xp) => {
  if (isDayComplete(dayNum)) {
    unmarkDay(dayNum, xp);
    showToast(`Day ${dayNum} unmarked`, 'info');
    // Re-render button
    const btn = document.getElementById('complete-btn');
    if (btn) {
      btn.textContent = `[>>] Mark as Complete (+${xp} XP)`;
      btn.classList.remove('done');
    }
  } else {
    if (typeof window.startQuiz === 'function') {
      window.startQuiz(dayNum, xp);
    } else {
      window.completeDay(dayNum, xp);
    }
  }
};

window.completeDay = async (dayNum, xp) => {
  const isNew = await markDayComplete(dayNum, xp);
  if (isNew) {
    showToast(`+${xp} XP earned! Day ${dayNum} complete!`, 'success');
    const btn = document.getElementById('complete-btn');
    if (btn) {
      btn.innerHTML = '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">check_circle</span> Completed! (Click to undo)';
      btn.classList.add('done');
    }
    // Refresh sidebar streak from cache
    const el = document.getElementById('sidebar-streak-num');
    if (el && typeof getOverallStats === 'function') el.textContent = getOverallStats().streak;
  }
};

window.saveNoteHandler = async (dayNum) => {
  const textarea = document.getElementById('lesson-notes');
  if (textarea) {
    await saveNote(dayNum, textarea.value);
    showToast('Notes saved!', 'success');
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

// ── Login Screen ───────────────────────────────
function showLoginScreen() {
  document.getElementById('app-shell').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
}

window.loginAsDemo = async function() {
  const btn = document.querySelector('.demo-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Connecting...'; }
  try {
    await loginDemo();
    await loadProgressAsync();
    bootApp();
  } catch(e) {
    showToast('Could not connect to server. Running offline.', 'warning');
    bootApp();
  }
};

window.showGoogleLogin = async function() {
  const modal = document.getElementById('google-modal');
  if (modal) modal.classList.remove('hidden');
  // Check if server has Google credentials configured
  try {
    const apiBase = window.API_BASE ;
    const res = await fetch(apiBase + '/api/auth/google-status');
    const { enabled } = await res.json();
    const modalContent = modal.querySelector('.modal-content');
    if (!enabled) {
      // Show setup guide inside the modal
      modalContent.innerHTML = `
        <button class="close-modal-btn" onclick="closeGoogleModal()">✕</button>
        <span class="material-symbols-sharp" style="font-size:48px;color:#ffd43b;display:block;text-align:center">warning</span>
        <h2 style="color:var(--c-green);text-align:center;margin:12px 0 4px">Google OAuth Not Configured</h2>
        <p style="color:var(--c-static);text-align:center;margin-bottom:20px;font-size:13px">
          To enable Google login, you need a free Google Cloud project.<br>It takes about 5 minutes.
        </p>
        <div style="background:var(--c-panel);border:1px solid var(--c-border);border-radius:8px;padding:16px;font-family:var(--f-mono);font-size:12px;line-height:2">
          <div style="color:var(--c-green);margin-bottom:8px;font-size:13px;font-family:var(--f-body);font-weight:600">📋 Setup Steps:</div>
          <div><span style="color:var(--c-dim)">1.</span> Go to <a href="https://console.cloud.google.com" target="_blank" style="color:var(--c-green)">console.cloud.google.com</a></div>
          <div><span style="color:var(--c-dim)">2.</span> Create project → <span style="color:#ffd43b">APIs &amp; Services → Credentials</span></div>
          <div><span style="color:var(--c-dim)">3.</span> Click <span style="color:#ffd43b">+ Create Credentials → OAuth Client ID</span></div>
          <div><span style="color:var(--c-dim)">4.</span> App type: <span style="color:#74c0fc">Web application</span></div>
          <div><span style="color:var(--c-dim)">5.</span> Authorized redirect URI:</div>
          <div style="background:#000;padding:6px 10px;border-radius:4px;margin:4px 0;color:#00ff41;font-size:11px;word-break:break-all">
            http://localhost:3001/api/auth/google/callback
          </div>
          <div><span style="color:var(--c-dim)">6.</span> Copy <span style="color:#cc5de8">Client ID</span> &amp; <span style="color:#cc5de8">Secret</span> → paste into <span style="color:#ffd43b">server/.env</span></div>
          <div><span style="color:var(--c-dim)">7.</span> Restart the server with <span style="color:#00ff41">node index.js</span></div>
        </div>
        <p style="text-align:center;margin-top:16px;font-size:12px;color:var(--c-dim)">
          Or use <a onclick="closeGoogleModal();showManualLogin()" style="color:var(--c-green);cursor:pointer">Email/Password Login</a> — no setup needed.
        </p>
      `;
    } else {
      // Google OAuth is configured — proceed with redirect
      loginGoogle();
    }
  } catch(e) {
    // Server offline or error — just redirect and let backend handle it
    loginGoogle();
  }
};

window.closeGoogleModal = function() {
  const modal = document.getElementById('google-modal');
  if (modal) modal.classList.add('hidden');
};

window.submitGoogleLogin = async function() {
  // Called by "Continue with Google" button — same as showGoogleLogin
  window.showGoogleLogin();
};

window.showManualLogin = function() {
  const modal = document.getElementById('manual-modal');
  if (modal) modal.classList.remove('hidden');
};

window.closeManualModal = function() {
  const modal = document.getElementById('manual-modal');
  if (modal) modal.classList.add('hidden');
};

window.submitManualLogin = async function() {
  const name     = (document.getElementById('manual-name-input')?.value || '').trim();
  const email    = (document.getElementById('manual-email-input')?.value || '').trim();
  const password = (document.getElementById('manual-password-input')?.value || '').trim();
  const isRegister = document.getElementById('manual-modal-mode')?.dataset.mode === 'register';

  if (!email || !email.includes('@')) { showToast('Please enter a valid email', 'warning'); return; }
  if (!password || password.length < 6) { showToast('Password must be at least 6 characters', 'warning'); return; }

  const btn = document.getElementById('manual-submit-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Connecting...'; }

  try {
    if (isRegister) {
      if (!name) { showToast('Please enter your name', 'warning'); if(btn){btn.disabled=false;btn.textContent='Create Account';} return; }
      await registerManual(name, email, password);
    } else {
      await loginManual(null, email, password);
    }
    await loadProgressAsync();
    window.closeManualModal();
    bootApp();
  } catch(e) {
    showToast(e.message || 'Login failed. Check your credentials.', 'error');
    if (btn) { btn.disabled = false; btn.textContent = isRegister ? 'Create Account' : 'Login'; }
  }
};

window.toggleManualMode = function() {
  const modeEl = document.getElementById('manual-modal-mode');
  const nameRow = document.getElementById('manual-name-row');
  const submitBtn = document.getElementById('manual-submit-btn');
  const toggleLink = document.getElementById('manual-toggle-link');
  const titleEl = document.getElementById('manual-modal-title');
  if (!modeEl) return;
  const isRegister = modeEl.dataset.mode === 'register';
  modeEl.dataset.mode = isRegister ? 'login' : 'register';
  if (nameRow) nameRow.style.display = isRegister ? 'none' : 'block';
  if (submitBtn) submitBtn.textContent = isRegister ? 'Login' : 'Create Account';
  if (toggleLink) toggleLink.textContent = isRegister ? "Don't have an account? Register" : 'Already have an account? Login';
  if (titleEl) titleEl.textContent = isRegister ? 'Login' : 'Create Account';
};

window.logoutUser = function() {
  logout();
};

window.deleteAccount = async function() {
  const confirmDelete = confirm("⚠️ Are you absolutely sure you want to delete your account? This action cannot be undone and you will lose all your progress, badges, and XP permanently.");
  if (!confirmDelete) return;

  try {
    const apiBase = window.API_BASE !== undefined ? window.API_BASE : '';
    const res = await fetch(`${apiBase}/api/profile`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('soc_token')}`
      }
    });

    if (res.ok) {
      alert("Your account has been successfully deleted. We're sorry to see you go!");
      logout();
    } else {
      const data = await res.json();
      alert("Failed to delete account: " + (data.error || "Unknown error"));
    }
  } catch (err) {
    console.error("Delete account error:", err);
    alert("An error occurred while trying to delete your account.");
  }
};

// ── Profile View ───────────────────────────────
function renderProfileView() {
  const el = document.getElementById('view-profile');
  const profile = getProfile();
  const stats = getOverallStats();
  const level = getLevel(stats.xp);
  const allDone = stats.completedCount >= 120;

  el.innerHTML = `
    <div class="profile-header">
      <h1>👤 My Profile</h1>
    </div>

    <div class="profile-grid">
      <!-- Avatar Card -->
      <div class="card profile-avatar-card">
        <div class="profile-avatar-wrap">
          <div class="profile-avatar" id="profile-avatar-display">
            ${profile.avatar
              ? `<img src="${profile.avatar}" alt="avatar" style="width:100%;height:100%;border-radius:50%;object-fit:cover">`
              : `<span style="font-size:42px;font-weight:900;color:var(--accent)">${getInitials(profile.name)}</span>`
            }
          </div>
          <label class="avatar-upload-btn" for="avatar-file-input" title="Upload Photo">📷</label>
          <input type="file" id="avatar-file-input" accept="image/*" style="display:none" onchange="window.handleAvatarUpload(event)">
        </div>
        <div class="profile-name">${profile.name}</div>
        <div class="profile-email">${profile.email}</div>
        <div class="profile-join">Joined: ${profile.joinDate}</div>
        <div class="profile-login-type">${profile.loginType === 'google' ? '🔵 Google Account' : profile.loginType === 'demo' ? '👤 Demo Account' : '✉️ Email Account'}</div>
        <button class="quiz-btn warning" onclick="window.logoutUser()" style="margin-top:16px;width:100%">🚪 Logout</button>
        <button class="quiz-btn" onclick="window.deleteAccount()" style="margin-top:8px;width:100%;background-color:var(--coral);color:#fff">⚠️ Delete Account</button>
      </div>

      <!-- Stats Card -->
      <div class="card profile-stats-card">
        <div class="card-tag">📊 YOUR PROGRESS</div>
        <div class="profile-stat-grid">
          <div class="profile-stat"><div class="pstat-num" style="color:var(--accent)">${stats.completedCount}</div><div class="pstat-lbl">Days Done</div></div>
          <div class="profile-stat"><div class="pstat-num" style="color:var(--amber)">${stats.xp.toLocaleString()}</div><div class="pstat-lbl">Total XP</div></div>
          <div class="profile-stat"><div class="pstat-num" style="color:var(--coral)">${stats.streak}</div><div class="pstat-lbl">Day Streak</div></div>
          <div class="profile-stat"><div class="pstat-num" style="color:var(--sky)">${stats.badgeCount}</div><div class="pstat-lbl">Badges</div></div>
        </div>
        <div class="profile-level-row">
          <div class="level-circle" style="width:64px;height:64px;font-size:22px">
            <span class="lc-num">${level.level}</span>
            <span class="lc-lbl">LVL</span>
          </div>
          <div>
            <div style="font-weight:700;color:var(--text-primary)">${level.title}</div>
            ${level.next !== Infinity ? `<div style="color:var(--text-secondary);font-size:13px">${(level.next - stats.xp).toLocaleString()} XP to Level ${level.level + 1}</div>` : '<div style="color:var(--mint)">Max Level! 🎖️</div>'}
          </div>
        </div>

        <div class="profile-rank-row">
          <div class="comp-rank-box" style="margin:0">
            <div class="comp-rank-num">#${getUserRank()}</div>
            <div class="comp-rank-lbl">Global Rank</div>
          </div>
          <button class="quiz-btn secondary" onclick="window.goToView('leaderboard')" style="flex:1">View Leaderboard →</button>
        </div>
      </div>

      <!-- Certificate Card -->
      <div class="card profile-cert-card">
        <div class="card-tag"><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">workspace_premium</span> CERTIFICATE</div>
        ${allDone
          ? `<p style="color:var(--text-secondary);margin-bottom:16px">Congratulations on completing all 120 days! Download your certificate below.</p>
             <button class="quiz-btn primary" onclick="window.goToView('certificate')"><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">download</span> View & Download Certificate</button>`
          : `<div class="cert-locked-msg">
               <div style="font-size:48px;color:var(--c-dim)"><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">lock</span></div>
               <p>Complete all 120 days to unlock your certificate</p>
               <div class="cert-progress-bar-wrap">
                 <div class="cert-progress-bar-fill" style="width:${Math.round((stats.completedCount/120)*100)}%"></div>
               </div>
               <p style="color:var(--accent)">${stats.completedCount}/120 days completed</p>
             </div>`
        }
      </div>
    </div>
  `;
}

window.handleAvatarUpload = function(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    updateAvatar(e.target.result);
    updateProfileIcon();
    renderProfileView(); // re-render
    showToast('Profile photo updated! 📷', 'success');
  };
  reader.readAsDataURL(file);
};

// ── Leaderboard View ───────────────────────────
async function renderLeaderboardView() {
  const el = document.getElementById('view-leaderboard');
  const medals = [
    '<span class="material-symbols-sharp" style="color:#FFD700;font-size:20px;vertical-align:middle">emoji_events</span>',
    '<span class="material-symbols-sharp" style="color:#C0C0C0;font-size:20px;vertical-align:middle">emoji_events</span>',
    '<span class="material-symbols-sharp" style="color:#CD7F32;font-size:20px;vertical-align:middle">emoji_events</span>',
  ];

  // Show loading skeleton while API fetches
  el.innerHTML = `
    <div class="profile-header">
      <h1><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">leaderboard</span> Leaderboard</h1>
      <p style="color:var(--text-secondary)">Top 10 SOC Analysts by XP · Updated live</p>
    </div>
    <div class="leaderboard-list" style="opacity:0.4;pointer-events:none">
      ${[1,2,3,4,5].map(i => `
        <div class="lb-row">
          <div class="lb-rank">#${i}</div>
          <div class="lb-avatar" style="background:var(--c-panel)">--</div>
          <div class="lb-info">
            <div class="lb-name" style="background:var(--c-panel);border-radius:4px;color:transparent">Loading...</div>
            <div class="lb-days" style="background:var(--c-panel);border-radius:4px;color:transparent;margin-top:4px">0 days</div>
          </div>
          <div class="lb-xp" style="color:var(--c-dim)">--- XP</div>
        </div>
      `).join('')}
    </div>
    <div style="text-align:center;color:var(--c-green);font-family:var(--f-mono);font-size:12px;margin-top:8px;letter-spacing:0.05em">
      <span class="material-symbols-sharp" style="font-size:14px;vertical-align:middle;animation:pulse 1.2s infinite">radar</span>
      SYNCING RANKINGS...
    </div>
  `;

  // Fetch real data (async)
  let board;
  try {
    board = await getLeaderboard();
  } catch (e) {
    board = [];
  }

  if (!board || !board.length) {
    el.innerHTML += `<p style="color:var(--c-static);text-align:center;margin-top:16px">No rankings yet. Complete lessons to appear here!</p>`;
    return;
  }

  el.innerHTML = `
    <div class="profile-header">
      <h1><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">leaderboard</span> Leaderboard</h1>
      <p style="color:var(--text-secondary)">Top 10 SOC Analysts by XP · Updated live</p>
    </div>

    <div class="leaderboard-list">
      ${board.map((player, i) => `
        <div class="lb-row ${player.isUser ? 'lb-you' : ''}">
          <div class="lb-rank">${medals[i] || `<span style="color:var(--c-dim);font-family:var(--f-mono)">#${i + 1}</span>`}</div>
          <div class="lb-avatar" style="background:${player.color || player.isUser ? '#00ff4122' : 'var(--c-panel)'}; border: 1.5px solid ${player.color || '#00ff41'}; color:${player.color || '#00ff41'}">
            ${player.avatar
              ? `<img src="${player.avatar}" alt="${player.initials}" style="width:100%;height:100%;border-radius:50%;object-fit:cover">`
              : (player.initials || '?')
            }
          </div>
          <div class="lb-info">
            <div class="lb-name">${player.name} ${player.isUser ? '<span class="lb-you-tag">YOU</span>' : ''}</div>
            <div class="lb-days">${player.days} day${player.days !== 1 ? 's' : ''} completed</div>
          </div>
          <div class="lb-xp">${(player.xp || 0).toLocaleString()} <span class="lb-xp-label">XP</span></div>
        </div>
      `).join('')}
    </div>
  `;
}

// ── Competitive Test View ──────────────────────
function renderCompetitiveView() {
  const el = document.getElementById('view-competitive');
  const tests = [
    { id: 'week2', title: 'Week 2 Assessment', weeks: 2, days: 14, desc: 'Covers Networking Basics, OSI Model, TCP/IP, and Linux Fundamentals' },
    { id: 'week4', title: 'Week 4 Assessment', weeks: 4, days: 28, desc: 'Covers SIEM, Log Analysis, Security Concepts, and Vulnerability Management' },
    { id: 'week6', title: 'Week 6 Assessment', weeks: 6, days: 42, desc: 'Covers Threat Intelligence, Malware Analysis, and Incident Response' },
  ];

  const results = getCompResults();

  el.innerHTML = `
    <div class="profile-header">
      <h1>⚔️ Competitive Tests</h1>
      <p style="color:var(--text-secondary)">Prove your skills and climb the leaderboard. Each test has 30 questions, 30 minutes.</p>
    </div>

    <div class="comp-tests-grid">
      ${tests.map(test => {
        const unlocked = isCompTestUnlocked(test.weeks);
        const pastResult = results.filter(r => r.testId === test.id).pop();
        const passed = pastResult && pastResult.pct >= 60;
        return `
          <div class="card comp-test-card ${!unlocked ? 'locked' : ''} ${passed ? 'passed' : ''}">
            <div class="comp-test-icon">${passed ? '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">check_circle</span>' : unlocked ? '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">swords</span>' : '<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">lock</span>'}</div>
            <div class="comp-test-title">${test.title}</div>
            <div class="comp-test-desc">${test.desc}</div>
            <div class="comp-test-req">Requires ${test.days} days completed</div>
            ${pastResult ? `<div class="comp-past-score ${pastResult.pct >= 60 ? 'pass' : 'fail'}">Last Score: ${pastResult.score}/${pastResult.total} (${pastResult.pct}%)</div>` : ''}
            ${unlocked
              ? `<button class="quiz-btn primary comp-start-btn" onclick="startCompetitiveTest('${test.id}')">
                  ${pastResult ? '🔁 Retake Test' : '▶ Start Test'}
                </button>`
              : `<div class="comp-locked-msg">[LOCKED] Complete ${test.days - (getCompletedDays ? getCompletedDays().length : 0)} more days to unlock</div>`
            }
          </div>
        `;
      }).join('')}
    </div>

    <div class="card" style="margin-top:24px">
      <div class="card-tag">📜 YOUR TEST HISTORY</div>
      ${results.length === 0
        ? `<p style="color:var(--text-dim);text-align:center;padding:20px">No tests taken yet. Unlock and take a test to see your history here.</p>`
        : `<div class="comp-history-list">
            ${results.slice().reverse().map(r => `
              <div class="comp-history-row">
                <div>
                  <div style="font-weight:700">${r.testId.replace('week', 'Week ')} Assessment</div>
                  <div style="color:var(--text-dim);font-size:12px">${new Date(r.date).toLocaleDateString()}</div>
                </div>
                <div class="comp-past-score ${r.pct >= 60 ? 'pass' : 'fail'}">${r.score}/${r.total} — ${r.pct}%</div>
              </div>
            `).join('')}
          </div>`
      }
    </div>
  `;
}

window.goToView = (view) => navigateTo(view);

window.toggleTheme = function() {
  const isLight = document.body.classList.toggle('theme-light');
  const icon = document.getElementById('theme-icon');
  
  if (isLight) {
    localStorage.setItem('soc_theme', 'light');
    if (icon) icon.textContent = 'dark_mode';
  } else {
    localStorage.setItem('soc_theme', 'dark');
    if (icon) icon.textContent = 'light_mode';
  }
};
