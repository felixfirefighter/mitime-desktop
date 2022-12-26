import activeWindow from 'active-win';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { desktopCapturer } from 'electron';
import { IUsage } from 'entity/usage-list';
import db from './db';

dayjs.extend(utc);

export const startTracking = () => {
  let prevActiveWin: activeWindow.Result | undefined;
  let startDate = dayjs.utc();
  let endDate = dayjs.utc();

  let activeWinInterval;
  clearInterval(activeWinInterval);
  activeWinInterval = setInterval(async () => {
    const activeWin = await activeWindow();
    // no active app
    if (!activeWin) {
      prevActiveWin = activeWin;
      return;
    }

    // user switches app
    if (prevActiveWin?.owner.name !== activeWin?.owner?.name) {
      // store in db
      startDate = dayjs.utc();
      endDate = startDate.add(1, 'second');
      db.prepare<IUsage>(
        `
          INSERT INTO usage (
              app_name,
              title,
              start_date,
              end_date,
              duration
            ) VALUES (
              @app_name,
              @title,
              @start_date,
              @end_date,
              @duration
            )
        `
      ).run({
        app_name: activeWin?.owner?.name || '',
        title: activeWin?.title || '',
        start_date: startDate.format(),
        end_date: endDate.format(),
        duration: endDate.diff(startDate, 'second'),
      });
    }
    // user stays on the same app
    else {
      endDate = dayjs.utc();
      db.prepare<IUsage>(
        `
          UPDATE usage
          SET
            end_date = @end_date,
            duration = @duration
          WHERE
            app_name = @app_name
          ORDER BY datetime(created_date) DESC
          LIMIT 1
        `
      ).run({
        app_name: activeWin?.owner?.name,
        end_date: endDate.format(),
        duration: endDate.diff(startDate, 'second'),
      });
    }
    prevActiveWin = activeWin;
  }, 1000);
};

export const startDesktopCapturer = () => {
  setInterval(async () => {
    const sources = await desktopCapturer.getSources({
      types: ['window', 'screen'],
    });

    console.log(sources);
  }, 5000);
};

export default startTracking;
