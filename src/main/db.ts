import Database from 'better-sqlite3';
import { app } from 'electron';
import { IDbPragma } from 'entity/db';
import path from 'path';

const db = new Database(path.join(app.getPath('userData'), 'mitime.db'));
db.pragma('journal_mode = WAL');

const createTable = `
CREATE TABLE IF NOT EXISTS usage_category(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  created_date DATE DEFAULT (datetime('now')),
  updated_date DATE DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS usage_info(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  app_name TEXT UNIQUE,
  color TEXT,
  category_id INTEGER,
  created_date DATE DEFAULT (datetime('now')),
  updated_date DATE DEFAULT (datetime('now')),
  FOREIGN KEY (category_id)
    REFERENCES usage_category (id)
);
CREATE TABLE IF NOT EXISTS usage(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  app_name TEXT,
  title TEXT,
  url TEXT,
  usage_info_id INTEGER,
  start_date DATE DEFAULT (datetime('now')),
  end_date DATE DEFAULT (datetime('now')),
  duration INTEGER DEFAULT 0,
  created_date DATE DEFAULT (datetime('now')),
  FOREIGN KEY (usage_info_id)
    REFERENCES usage_info (id)
);
`;

db.exec(createTable);
const usageTableInfo: IDbPragma[] = db.pragma('table_info(Usage)');
let urlColExists = false;
let usageInfoIdColExists = false;
usageTableInfo.forEach((info) => {
  if (info.name === 'url') {
    urlColExists = true;
  }
  if (info.name === 'usage_info_id') {
    usageInfoIdColExists = true;
  }
});

if (!urlColExists) {
  const alterTable = `
  ALTER TABLE usage
  ADD url TEXT
  `;
  db.exec(alterTable);
}

if (!usageInfoIdColExists) {
  const alterTable = `
  ALTER TABLE usage
  ADD usage_info_id INTEGER
  `;
  db.exec(alterTable);
}

export default db;
