import { Paper, Table, Pagination, Title } from '@mantine/core';
import { IGetUsageInfoListRes, IUsageInfo } from 'entity/usage-info';
import { useEffect, useState } from 'react';
import AppColorPicker from '../AppColorPicker';

import styles from './index.module.scss';

const LIMIT = 10;

const UsageInfoList = () => {
  const [usageInfoList, setUsageInfoList] = useState<IUsageInfo[]>([]);
  const [count, setCount] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.electron.ipcRenderer.on('get-usage-info-list', (arg) => {
      const data = arg as IGetUsageInfoListRes;
      setUsageInfoList(data.result);
      setCount(data.count);
    });
  }, []);

  const getUsageInfoList = (localPage: number) => {
    window.electron.ipcRenderer.sendMessage('get-usage-info-list', {
      limit: LIMIT,
      offset: (localPage - 1) * LIMIT,
    });
  };

  useEffect(() => {
    getUsageInfoList(page);
  }, [page]);

  return (
    <div>
      <Paper shadow="sm" p="xl" radius={8} m={16}>
        <div className={styles.header}>
          <Title order={2}>Apps</Title>
        </div>
        <Table verticalSpacing="lg" className={styles.table}>
          <thead>
            <tr>
              <th>App</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {usageInfoList.map(({ id, app_name, color }) => {
              return (
                <tr key={id}>
                  <td>{app_name}</td>
                  <td>
                    <AppColorPicker id={id || 0} color={color || ''} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Pagination
          color="indigo"
          page={page}
          onChange={setPage}
          total={Math.ceil(count / LIMIT)}
          py="lg"
        />
      </Paper>
    </div>
  );
};

export default UsageInfoList;
