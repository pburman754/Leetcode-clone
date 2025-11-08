import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';

const db = new sqlite3.Database(path.join(__dirname, '../../leetcode.db'));

// Promisify database methods
const dbRun = promisify(db.run.bind(db)) as (sql: string, params: any) => Promise<void>;
const dbGet = promisify(db.get.bind(db)) as (sql: string, params: any) => Promise<any>;
const dbAll = promisify(db.all.bind(db)) as (sql: string, params: any) => Promise<any[]>;

export const initDatabase = async () => {
  await dbRun(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      points INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await dbRun(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      problem_id INTEGER NOT NULL,
      code TEXT NOT NULL,
      language TEXT NOT NULL,
      status TEXT NOT NULL,
      runtime INTEGER,
      memory INTEGER,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  await dbRun(`
    CREATE TABLE IF NOT EXISTS solved_problems (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      problem_id INTEGER NOT NULL,
      solved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, problem_id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  await dbRun(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      problem_id INTEGER NOT NULL,
      content TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, problem_id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  console.log('✅ Database initialized');
};
export { db, dbRun, dbGet, dbAll };
