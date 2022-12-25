import { IGetUsageListParam } from 'entity/usage-list';
import { IGetUsageOverviewParam } from 'entity/usage-overview';
import { Channels } from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(
          channel: Channels,
          args: IGetUsageListParam | IGetUsageOverviewParam
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
