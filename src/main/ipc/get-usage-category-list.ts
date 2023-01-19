import { ipcMain } from 'electron';
import db from '../db';

const ipcMainGetUsageCategoryList = () => {
  ipcMain.on('get-usage-category-list', async (event) => {
    const result = db
      .prepare(
        `
        SELECT
          usage_category.id,
          usage_category.title,
          GROUP_CONCAT(usage_info_id) as usage_info_ids,
          GROUP_CONCAT(app_name) as app_names,
          GROUP_CONCAT(color) as colors
        FROM
          (
            SELECT
              id as usage_info_id,
              category_id,
              app_name,
              color
            FROM
              usage_info
            ORDER BY
              app_name
          )
        FULL OUTER JOIN
          usage_category ON category_id = usage_category.id
        GROUP BY
          usage_category.title
        ORDER BY
          title
        NULLS LAST
    `
      )
      .all();

    event.reply('get-usage-category-list', { result });
  });
};

export default ipcMainGetUsageCategoryList;
