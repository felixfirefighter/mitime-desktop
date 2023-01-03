import { ipcMain } from 'electron';
import { IGetUsageByTimeParam } from 'entity/usage-by-time';
import { Period } from '../../entity/period';
import db from '../db';

const ipcMainGetUsageByTime = () => {
  ipcMain.on(
    'get-usage-by-time',
    async (event, { start_date, end_date, type }: IGetUsageByTimeParam) => {
      let groupDate = '%Y-%m-%d-%H';
      if (type === Period.Week) {
        groupDate = '%Y-%m-%d';
      } else if (type === Period.Month) {
        groupDate = '%Y-%m-%d-%W';
      }

      const result = db
        .prepare(
          `
          SELECT
            app_name,
            STRFTIME(@group_date, created_date, 'localtime') AS group_date,
            SUM(duration) AS duration
          FROM
            usage
          WHERE
            DATETIME(created_date) BETWEEN DATETIME(@start_date) AND DATETIME(@end_date)
          GROUP BY
            app_name,
            STRFTIME(@group_date, created_date)
          ORDER BY app_name, group_date;
          `
        )
        .all({
          group_date: groupDate,
          start_date,
          end_date,
        });
      event.reply('get-usage-by-time', { result });
    }
  );
};

export default ipcMainGetUsageByTime;
