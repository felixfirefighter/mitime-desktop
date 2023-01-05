import { ipcMain } from 'electron';
import { IGetUsageInfoListParam } from 'entity/usage-info';
import db from '../db';

const ipcMainGetUsageInfoList = () => {
  ipcMain.on(
    'get-usage-info-list',
    async (event, { offset = 0, limit = 10 }: IGetUsageInfoListParam) => {
      const result = db
        .prepare(
          `
        SELECT *
        FROM usage_info
        ORDER BY datetime(created_date) DESC
        LIMIT @limit
        OFFSET @offset
    `
        )
        .all({
          limit,
          offset,
        });
      const countRes = db
        .prepare(
          `
        SELECT COUNT(1) as count
        FROM usage_info
      `
        )
        .get();
      event.reply('get-usage-info-list', { result, count: countRes.count });
    }
  );
};

export default ipcMainGetUsageInfoList;
