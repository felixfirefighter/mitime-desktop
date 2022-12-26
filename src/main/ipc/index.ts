import ipcMainAskForPermission from './ask-for-permission';
import ipcMainCheckPermission from './check-permission';
import ipcMainGetUsageList from './get-usage-list';
import ipcMainGetUsageOverview from './get-usage-overview';
import ipcMainRelaunch from './relaunch';

export const startIpcMainListener = () => {
  ipcMainGetUsageList();
  ipcMainGetUsageOverview();
  ipcMainCheckPermission();
  ipcMainAskForPermission();
  ipcMainRelaunch();
};

export default startIpcMainListener;
