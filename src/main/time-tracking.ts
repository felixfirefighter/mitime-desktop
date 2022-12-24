import activeWindow from 'active-win';
import Database from 'better-sqlite3';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { app } from 'electron';
import { IUsage } from 'entity/usage';

const db = new Database(`${app.getPath('userData')}/mitime.db`);
db.pragma('journal_mode = WAL');

const createTable = `
    CREATE TABLE IF NOT EXISTS usage(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      app_name TEXT,
      title TEXT,
      start_date DATE DEFAULT (datetime('now')),
      end_date DATE DEFAULT (datetime('now')),
      created_date DATE DEFAULT (datetime('now'))
    );
  `;

db.exec(createTable);

dayjs.extend(utc);

export const startTracking = () => {
  let prevActiveWin: activeWindow.Result | undefined;
  let startDate = dayjs.utc();
  let endDate = dayjs.utc();

  setInterval(async () => {
    const activeWin = await activeWindow();
    console.log(activeWin);

    // no active app
    if (!activeWin) {
      prevActiveWin = activeWin;
      return;
    }

    // user switches app
    if (prevActiveWin?.owner.name !== activeWin?.owner?.name) {
      // store in db
      startDate = dayjs.utc();
      endDate = dayjs.utc();
      db.prepare<IUsage>(
        `
          INSERT INTO usage (
              app_name,
              title,
              start_date,
              end_date
            ) VALUES (
              @appName,
              @title,
              @startDate,
              @endDate
            )
        `
      ).run({
        appName: activeWin?.owner?.name || '',
        title: activeWin?.title || '',
        startDate: startDate.format(),
        endDate: endDate.format(),
      });
    }
    // user stays on the same app
    else {
      endDate = dayjs.utc();
      console.log(endDate.format());
      const result = db
        .prepare<IUsage>(
          `
          UPDATE usage
          SET end_date = @endDate
          WHERE
            app_name = @appName
          ORDER BY datetime(created_date) DESC
          LIMIT 1
        `
        )
        .run({
          appName: activeWin?.owner?.name,
          endDate: endDate.format(),
        });

      console.log(result);
    }
    prevActiveWin = activeWin;
  }, 5000);
};

export default startTracking;
