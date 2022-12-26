import { ipcMain } from 'electron';
import {
  hasScreenCapturePermission,
  openSystemPreferences,
} from 'mac-screen-capture-permissions';
import hasPermissions from 'macos-accessibility-permissions';

const ipcMainAskForPermission = () => {
  ipcMain.on('ask-for-permission', async () => {
    if (!hasScreenCapturePermission()) {
      await openSystemPreferences();
    } else {
      hasPermissions({ ask: true });
    }
  });
};

export default ipcMainAskForPermission;
