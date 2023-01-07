import { ipcMain } from 'electron';
import { IGetUsageOverviewParam } from 'entity/usage-overview';
import db from '../db';

const ipcMainGetUsageOverview = () => {
  ipcMain.on(
    'get-usage-overview',
    async (event, { start_date, end_date }: IGetUsageOverviewParam) => {
      const result = db
        .prepare(
          `
            SELECT
              usage.app_name,
              SUM(usage.duration) AS duration,
              usage_info.color
            FROM
              usage
            INNER JOIN
              usage_info ON usage_info.id = usage.usage_info_id
            WHERE
              DATETIME(usage.created_date) BETWEEN DATETIME(@start_date) AND DATETIME(@end_date)
            GROUP BY
              usage_info.app_name;
          `
        )
        .all({
          start_date,
          end_date,
        });

      event.reply('get-usage-overview', { result });
    }
  );
};

export default ipcMainGetUsageOverview;
