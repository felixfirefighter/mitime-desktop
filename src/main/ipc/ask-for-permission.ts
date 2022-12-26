import { ipcMain } from 'electron';
import { openSystemPreferences } from 'mac-screen-capture-permissions';
import hasPermissions from 'macos-accessibility-permissions';

const ipcMainAskForPermission = () => {
  ipcMain.on('ask-for-permission', async () => {
    if (!hasPermissions()) {
      hasPermissions({ ask: true });
    } else {
      await openSystemPreferences();
    }
  });
};

export default ipcMainAskForPermission;
