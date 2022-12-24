import { ipcMain } from 'electron';
import db from './db';

export const startIpcMainListener = () => {
  ipcMain.on('ipc-example', async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    console.log(msgTemplate(arg));
    event.reply('ipc-example', msgTemplate('pong'));
  });

  ipcMain.on('get-usage-list', async (event, { offset = 0 }) => {
    const result = db
      .prepare(
        `
      SELECT *
      FROM usage
      ORDER BY datetime(created_date) DESC
      LIMIT 5
      OFFSET @offset
    `
      )
      .all({
        offset,
      });
    event.reply('get-usage-list', { result });
  });
};

export default startIpcMainListener;
