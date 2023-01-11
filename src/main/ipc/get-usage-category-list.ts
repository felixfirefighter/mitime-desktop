import { ipcMain } from 'electron';
import db from '../db';

const ipcMainGetUsageCategoryList = () => {
  ipcMain.on('get-usage-category-list', async (event) => {
    const result = db
      .prepare(
        `
        SELECT *
        FROM usage_category
        ORDER BY title
    `
      )
      .all();

    console.log(result);
    event.reply('get-usage-category-list', { result });
  });
};

export default ipcMainGetUsageCategoryList;
