import Database from 'better-sqlite3';
import { app } from 'electron';

const db = new Database(`${app.getPath('userData')}/mitime.db`);
db.pragma('journal_mode = WAL');

export default db;
