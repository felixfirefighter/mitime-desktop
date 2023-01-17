import { ipcMain } from 'electron';
import { IGetUsageByTimeParam } from 'entity/usage-by-time';
import { Period } from '../../entity/period';
import db from '../db';

const ipcMainGetUsageByTime = () => {
  ipcMain.on(
    'get-usage-by-time',
    async (event, { start_date, end_date, type }: IGetUsageByTimeParam) => {
      let groupDate = '%Y-%m-%d-%H';
      if (type === Period.Week.toString()) {
        groupDate = '%Y-%m-%d';
      } else if (type === Period.Month.toString()) {
        groupDate = '%Y-%m';
      }

      const result = db
        .prepare(
          `
          SELECT
            usage.app_name,
            STRFTIME(@group_date, usage.created_date, 'localtime') AS group_date,
            SUM(usage.duration) AS duration,
            usage_info.color
          FROM
            usage
          INNER JOIN
            usage_info ON usage_info.id = usage.usage_info_id
          WHERE
            DATETIME(usage.created_date) BETWEEN DATETIME(@start_date) AND DATETIME(@end_date)
          GROUP BY
            usage.app_name,
            STRFTIME(@group_date, usage.created_date, 'localtime')
          ORDER BY usage.app_name, group_date;
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
