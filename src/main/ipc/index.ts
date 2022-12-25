import ipcMainGetUsageList from './get-usage-list';
import ipcMainGetUsageOverview from './get-usage-overview';

export const startIpcMainListener = () => {
  ipcMainGetUsageList();
  ipcMainGetUsageOverview();
};

export default startIpcMainListener;
