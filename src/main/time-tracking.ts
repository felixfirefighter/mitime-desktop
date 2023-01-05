import activeWindow from 'active-win';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IUsageInfo } from 'entity/usage-info';
import { IUsage } from 'entity/usage-list';
import { strToMantineColor } from '../utils/color';
import { APP_MANTINE_DEFAULT_COLORS } from '../constant/color';
import { LOCK_SCREEN_NAME_FOR_MAC } from '../constant/app';
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

    // user is idle on lock screen, ignore tracking
    if (activeWin?.owner?.name === LOCK_SCREEN_NAME_FOR_MAC) {
      return;
    }

    const appName = activeWin?.owner?.name || '';

    const mantineColor = strToMantineColor(appName);
    // insert into usage_info table if it's a new app, otherwise just ignore
    db.prepare<IUsageInfo>(
      `
      INSERT OR IGNORE INTO usage_info(
        app_name,
        color
      ) VALUES (
        @app_name,
        @color
      )
    `
    ).run({
      app_name: appName,
      color: APP_MANTINE_DEFAULT_COLORS[mantineColor.color][mantineColor.shade],
    });

    // get usage info id
    const usageInfoIdRes = db
      .prepare<IUsageInfo>(
        `
      SELECT
        id
      FROM
        usage_info
      WHERE
        app_name = @app_name
    `
      )
      .get({
        app_name: appName,
      });

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
              url,
              usage_info_id,
              start_date,
              end_date,
              duration
            ) VALUES (
              @app_name,
              @title,
              @url,
              @usage_info_id,
              @start_date,
              @end_date,
              @duration
            )
        `
      ).run({
        app_name: appName,
        title: activeWin?.title || '',
        usage_info_id: usageInfoIdRes.id || null,
        url: (activeWin as any).url || '',
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
            usage_info_id = @usage_info_id,
            end_date = @end_date,
            duration = @duration
          WHERE
            app_name = @app_name
          ORDER BY datetime(created_date) DESC
          LIMIT 1
        `
      ).run({
        app_name: appName,
        usage_info_id: usageInfoIdRes.id || null,
        end_date: endDate.format(),
        duration: endDate.diff(startDate, 'second'),
      });
    }
    prevActiveWin = activeWin;
  }, 1000);
};

export default startTracking;
