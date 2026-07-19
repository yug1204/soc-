// config/db.js — NeDB datastore initialization
// NeDB stores data as local JSON files in /data — no installation required.
const Datastore = require('nedb-promises');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

const db = {
  users: Datastore.create({
    filename: path.join(DATA_DIR, 'users.db'),
    autoload: true,
    timestampData: true,
  }),
};

// Ensure unique index on email
db.users.ensureIndex({ fieldName: 'email', unique: true });

console.log('[DB] NeDB initialized — data stored in:', DATA_DIR);

module.exports = db;
