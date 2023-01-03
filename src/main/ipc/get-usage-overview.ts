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
              app_name,
              SUM(duration)
            FROM
              usage
            WHERE
              DATETIME(created_date) BETWEEN DATETIME(@start_date) AND DATETIME(@end_date)
            GROUP BY
              app_name;
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
