import { ipcMain } from 'electron';
import db from '../db';

const ipcMainGetUsageCategoryList = () => {
  ipcMain.on('get-usage-category-list', async (event) => {
    const result = db
      .prepare(
        `
        SELECT
          usage_category.title,
          usage_info.app_name,
          usage_info.color
        FROM
          usage_category
        RIGHT JOIN
          usage_info ON usage_info.category_id = usage_category.id
        GROUP BY
          usage_category.title,
          usage_info.app_name
        ORDER BY title
    `
      )
      .all();

    //   SELECT
    //   usage.app_name,
    //   STRFTIME(@group_date, usage.created_date, 'localtime') AS group_date,
    //   SUM(usage.duration) AS duration,
    //   usage_info.color
    // FROM
    //   usage
    // INNER JOIN
    //   usage_info ON usage_info.id = usage.usage_info_id
    // WHERE
    //   DATETIME(usage.created_date) BETWEEN DATETIME(@start_date) AND DATETIME(@end_date)
    // GROUP BY
    //   usage.app_name,
    //   STRFTIME(@group_date, usage.created_date)
    // ORDER BY usage.app_name, group_date;

    console.log(result);
    event.reply('get-usage-category-list', { result });
  });
};

export default ipcMainGetUsageCategoryList;
