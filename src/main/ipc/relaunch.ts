import { app, ipcMain } from 'electron';

const ipcMainRelaunch = () => {
  ipcMain.on('relaunch', async () => {
    app.relaunch();
    app.quit();
  });
};

export default ipcMainRelaunch;
