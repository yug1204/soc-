// =============================================
// AUTH.JS — User Authentication & Profile
// Backed by /api/auth/* endpoints.
// Falls back to localStorage if API is offline.
// =============================================

// ─── Low-level fetch helper ───────────────────
async function apiPost(path, body) {
  const apiBase = window.API_BASE ;
  const res = await fetch(apiBase + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

async function apiGet(path) {
  const apiBase = window.API_BASE ;
  const res = await fetch(apiBase + path, { credentials: 'include' });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

// ─── Cache in memory (sessionStorage) ─────────
function _cacheProfile(profile) {
  sessionStorage.setItem('soc_profile_cache', JSON.stringify(profile));
}
function _clearCache() {
  sessionStorage.removeItem('soc_profile_cache');
  sessionStorage.removeItem('soc_progress_cache');
}

// ─── Public API ───────────────────────────────
function getProfile() {
  const cached = sessionStorage.getItem('soc_profile_cache');
  return cached ? JSON.parse(cached) : null;
}

function isLoggedIn() {
  return !!getProfile();
}

async function loginDemo() {
  try {
    const { user } = await apiPost('/api/auth/demo', {});
    _cacheProfile(user);
    return user;
  } catch (e) {
    console.warn('[AUTH] Demo login failed, using localStorage fallback:', e.message);
    // Offline fallback
    const profile = {
      name: 'Guest Analyst', email: 'guest@soc.local',
      loginType: 'demo', joinDate: new Date().toISOString().split('T')[0]
    };
    _cacheProfile(profile);
    return profile;
  }
}

async function loginGoogle(email) {
  // Redirects to Google OAuth flow via backend
  const apiBase = window.API_BASE ;
  window.location.href = apiBase + '/api/auth/google';
}

async function loginManual(name, email, password) {
  try {
    const { user } = await apiPost('/api/auth/login', { email, password });
    _cacheProfile(user);
    return user;
  } catch (e) {
    throw e; // Surface error to UI
  }
}

async function registerManual(name, email, password) {
  try {
    const { user } = await apiPost('/api/auth/register', { name, email, password });
    _cacheProfile(user);
    return user;
  } catch (e) {
    throw e;
  }
}

async function refreshProfile() {
  try {
    const { user } = await apiGet('/api/auth/me');
    _cacheProfile(user);
    return user;
  } catch (e) {
    return null;
  }
}

function updateAvatar(base64) {
  const profile = getProfile();
  if (profile) {
    profile.avatar = base64;
    _cacheProfile(profile);
    // Sync to backend in background
    const apiBase = window.API_BASE ;
    fetch(apiBase + '/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ avatar: base64 }),
    }).catch(console.warn);
  }
}

function updateProfileName(name) {
  const profile = getProfile();
  if (profile) {
    profile.name = name;
    _cacheProfile(profile);
    const apiBase = window.API_BASE ;
    fetch(apiBase + '/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name }),
    }).catch(console.warn);
  }
}

async function logout() {
  try {
    await apiPost('/api/auth/logout', {});
  } catch (e) {
    console.warn('[AUTH] Logout API failed:', e.message);
  }
  _clearCache();
  location.reload();
}

function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

// ─── Bootstrap: restore session from JWT cookie ─
async function bootstrapAuth() {
  if (!getProfile()) {
    await refreshProfile();
  }
}
