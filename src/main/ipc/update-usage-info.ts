import { ipcMain } from 'electron';
import { IUpdateUsageInfoParam } from 'entity/usage-info';
import db from '../db';

const ipcMainUpdateUsageInfo = () => {
  ipcMain.on(
    'update-usage-info',
    async (event, { id, color }: IUpdateUsageInfoParam) => {
      console.log(id, color);
      const res = db
        .prepare(
          `
        UPDATE
          usage_info
        SET
          color = @color
        WHERE
          id = @id
        `
        )
        .run({
          id,
          color,
        });

      console.log(res);

      event.reply('update-usage-info');
    }
  );
};

export default ipcMainUpdateUsageInfo;
