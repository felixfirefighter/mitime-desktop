import { ipcMain } from 'electron';
import { IAddUsageCategory } from 'entity/usage-category';
import db from '../db';

const ipcMainAddUsageCategory = () => {
  ipcMain.on(
    'add-usage-category',
    async (event, { title }: IAddUsageCategory) => {
      const result = db
        .prepare(
          `
        INSERT INTO
          usage_category (
            title
          ) VALUES (
            @title
          )
        `
        )
        .run({
          title,
        });

      event.reply('add-usage-category', { result });
    }
  );
};

export default ipcMainAddUsageCategory;
