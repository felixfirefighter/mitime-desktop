import { IGetUsageByTimeParam } from 'entity/usage-by-time';
import { IUpdateUsageInfoParam } from 'entity/usage-info';
import { IGetUsageListParam } from 'entity/usage-list';
import { IGetUsageOverviewParam } from 'entity/usage-overview';
import { Channels } from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(
          channel: Channels,
          args:
            | IGetUsageListParam
            | IGetUsageOverviewParam
            | IGetUsageByTimeParam
            | IUpdateUsageInfoParam
            | void
        ): void;
        on(
          channel: Channels,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: Channels, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
