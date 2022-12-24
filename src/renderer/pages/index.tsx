import { Button } from '@mantine/core';
import { IGetUsageList } from 'entity/ipc';
import { IUsage } from 'entity/usage';
import { useEffect, useState } from 'react';
import icon from '../../../assets/icon.svg';
import './index.scss';

const Index = () => {
  const [usageList, setUsageList] = useState<IUsage[]>([]);

  useEffect(() => {
    window.electron.ipcRenderer.on('get-usage-list', (arg) => {
      const data = arg as IGetUsageList;
      setUsageList(data.result);
    });

    window.electron.ipcRenderer.sendMessage('get-usage-list', [1]);
  }, []);

  return (
    <div className="home">
      {usageList.map((usage) => {
        return <div>{usage.app_name}</div>;
      })}
    </div>
  );
};

export default Index;
