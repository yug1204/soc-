const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name:          { type: String, default: 'Analyst' },
  email:         { type: String, unique: true, required: true },
  passwordHash:  { type: String, default: null },
  loginType:     { type: String, default: 'manual' },
  googleId:      { type: String, default: null },
  avatar:        { type: String, default: null },
  joinDate:      { type: String, default: () => new Date().toISOString().split('T')[0] },
  completedDays: { type: Array, default: [] },
  totalXP:       { type: Number, default: 0 },
  badges:        { type: Array, default: [] },
  notes:         { type: Array, default: [] },
  streak:        { type: Number, default: 0 },
  lastStudyDate: { type: String, default: null },
  compResults:   { type: Array, default: [] }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// ─── Helpers ──────────────────────────────────────────────────────────────────
function toPublic(user) {
  if (!user) return null;
  const obj = user.toObject ? user.toObject() : user;
  const { passwordHash, ...rest } = obj;
  return rest;
}

function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

// ─── CRUD helpers ─────────────────────────────────────────────────────────────
async function findById(id) {
  return User.findById(id);
}

async function findByEmail(email) {
  return User.findOne({ email: email.toLowerCase().trim() });
}

async function findByGoogleId(googleId) {
  return User.findOne({ googleId });
}

async function createUser(fields) {
  fields.email = fields.email.toLowerCase().trim();
  if (fields.passwordHash) {
    fields.passwordHash = await bcrypt.hash(fields.passwordHash, 12);
  }
  const user = new User(fields);
  return user.save();
}

async function updateUser(id, updates) {
  return User.findByIdAndUpdate(id, { $set: updates }, { new: true });
}

async function comparePassword(user, plain) {
  if (!user || !user.passwordHash) return false;
  return bcrypt.compare(plain, user.passwordHash);
}

async function deleteUser(id) {
  return User.findByIdAndDelete(id);
}

// ─── Exports ─────────────────────────────────────────────────────────────────
module.exports = {
  User,
  toPublic,
  getInitials,
  todayStr,
  findById,
  findByEmail,
  findByGoogleId,
  createUser,
  updateUser,
  deleteUser,
  comparePassword,
};
