import { ipcMain } from 'electron';
import db from '../db';

const ipcMainGetUsageCategoryList = () => {
  ipcMain.on('get-usage-category-list', async (event) => {
    const result = db
      .prepare(
        `
        SELECT
          usage_category.title,
          GROUP_CONCAT(usage_info_id) as usage_info_ids,
          GROUP_CONCAT(app_name) as app_names,
          GROUP_CONCAT(color) as colors,
          category_id
        FROM
          (
            SELECT
              id as usage_info_id,
              app_name,
              color,
              category_id
            FROM
              usage_info
            ORDER BY
              idx
            NULLS LAST
          )
        LEFT JOIN
          usage_category ON category_id = usage_category.id
        GROUP BY
          usage_category.title
        ORDER BY
          title
    `
      )
      .all();

    event.reply('get-usage-category-list', { result });
  });
};

export default ipcMainGetUsageCategoryList;
