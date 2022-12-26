import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'path';

const db = new Database(path.join(app.getPath('userData'), 'mitime.db'));
db.pragma('journal_mode = WAL');

const createTable = `
CREATE TABLE IF NOT EXISTS usage(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  app_name TEXT,
  title TEXT,
  start_date DATE DEFAULT (datetime('now')),
  end_date DATE DEFAULT (datetime('now')),
  duration INTEGER DEFAULT 0,
  created_date DATE DEFAULT (datetime('now'))
);
`;

db.exec(createTable);

export default db;
