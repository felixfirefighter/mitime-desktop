import {
  Paper,
  Table,
  Pagination,
  Title,
  Input,
  TextInput,
  Button,
  Divider,
} from '@mantine/core';
import {
  IGetUsageCategoryListRes,
  IUsageCategory,
  IUsageCategoryListWithAppList,
  IUsageCategoryWithApp,
} from 'entity/usage-category';
import { IGetUsageInfoListRes, IUsageInfo } from 'entity/usage-info';
import { useEffect, useState } from 'react';
import AppColorPicker from '../AppColorPicker';

import styles from './index.module.scss';

const LIMIT = 10;

const UsageInfoList = () => {
  const [usageInfoList, setUsageInfoList] = useState<IUsageInfo[]>([]);
  const [count, setCount] = useState(10);
  const [page, setPage] = useState(1);
  const [categoryList, setCategoryList] =
    useState<IUsageCategoryListWithAppList>([]);

  useEffect(() => {
    window.electron.ipcRenderer.on('get-usage-info-list', (arg) => {
      const data = arg as IGetUsageInfoListRes;
      setUsageInfoList(data.result);
      setCount(data.count);
    });

    window.electron.ipcRenderer.on('add-usage-category', () => {});

    window.electron.ipcRenderer.on('get-usage-category-list', (arg) => {
      const data = arg as IGetUsageCategoryListRes;
      // setCategoryList(data.result);
    });
  }, []);

  const getUsageCategoryList = () => {
    window.electron.ipcRenderer.sendMessage('get-usage-category-list');
  };

  const getUsageInfoList = (localPage: number) => {
    window.electron.ipcRenderer.sendMessage('get-usage-info-list', {
      limit: LIMIT,
      offset: (localPage - 1) * LIMIT,
    });
  };

  useEffect(() => {
    getUsageInfoList(page);
    getUsageCategoryList();
  }, [page]);

  return (
    <div>
      <Paper shadow="sm" p="xl" radius={8} m={16}>
        <div className={styles.header}>
          <Title order={2}>Apps</Title>
        </div>

        {categoryList.map(({ title }) => {
          return (
            <div>
              <Title order={4} my={16}>
                {title}
              </Title>
              <Divider />
            </div>
          );
        })}
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
