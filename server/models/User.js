// models/User.js — NeDB-based user model (no Mongoose)
const bcrypt = require('bcrypt');
const db = require('../config/db');

// ─── Helpers ──────────────────────────────────────────────────────────────────
function toPublic(user) {
  if (!user) return null;
  const { passwordHash, ...rest } = user;
  return rest;
}

function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

// ─── Default user doc shape ───────────────────────────────────────────────────
function defaultUser(fields) {
  return {
    name:          fields.name || 'Analyst',
    email:         fields.email,
    passwordHash:  fields.passwordHash || null,
    loginType:     fields.loginType || 'manual',
    googleId:      fields.googleId || null,
    avatar:        fields.avatar || null,
    joinDate:      todayStr(),
    completedDays: [],
    totalXP:       0,
    badges:        [],
    notes:         [],
    streak:        0,
    lastStudyDate: null,
    compResults:   [],
  };
}

// ─── CRUD helpers ─────────────────────────────────────────────────────────────
async function findById(id) {
  return db.users.findOne({ _id: id });
}

async function findByEmail(email) {
  return db.users.findOne({ email: email.toLowerCase().trim() });
}

async function findByGoogleId(googleId) {
  return db.users.findOne({ googleId });
}

async function createUser(fields) {
  const user = defaultUser(fields);
  user.email = user.email.toLowerCase().trim();
  if (user.passwordHash) {
    user.passwordHash = await bcrypt.hash(user.passwordHash, 12);
  }
  return db.users.insert(user);
}

async function updateUser(id, updates) {
  await db.users.update({ _id: id }, { $set: updates });
  return findById(id);
}

async function comparePassword(user, plain) {
  if (!user || !user.passwordHash) return false;
  return bcrypt.compare(plain, user.passwordHash);
}

// ─── Exports ─────────────────────────────────────────────────────────────────
module.exports = {
  toPublic,
  getInitials,
  todayStr,
  findById,
  findByEmail,
  findByGoogleId,
  createUser,
  updateUser,
  comparePassword,
  db,
};
