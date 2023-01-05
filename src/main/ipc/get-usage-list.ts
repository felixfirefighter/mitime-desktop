import { ipcMain } from 'electron';
import { IGetUsageListParam } from 'entity/usage-list';
import db from '../db';

const ipcMainGetUsageList = () => {
  ipcMain.on(
    'get-usage-list',
    async (event, { offset = 0, limit = 10 }: IGetUsageListParam) => {
      const result = db
        .prepare(
          `
        SELECT *
        FROM usage
        ORDER BY datetime(created_date) DESC
        LIMIT @limit
        OFFSET @offset
    `
        )
        .all({
          limit,
          offset,
        });
      const count = db
        .prepare(
          `
        SELECT COUNT(1)
        FROM usage
      `
        )
        .get();

      event.reply('get-usage-list', { result, count });
    }
  );
};

export default ipcMainGetUsageList;
