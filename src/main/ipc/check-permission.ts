import { ipcMain } from 'electron';
import { hasScreenCapturePermission } from 'mac-screen-capture-permissions';
import hasPermissions from 'macos-accessibility-permissions';

const ipcMainCheckPermission = () => {
  ipcMain.on('check-permission', async (event) => {
    event.reply('check-permission', {
      hasScreenCapturePermission: hasScreenCapturePermission(),
      hasAccessibilityPermission: hasPermissions(),
    });
  });
};

export default ipcMainCheckPermission;
