import {
  Paper,
  Table,
  Pagination,
  Title,
  Input,
  TextInput,
  Button,
  Text,
  Divider,
  Container,
} from '@mantine/core';
import { IconMoodEmpty } from '@tabler/icons';
import {
  IAppList,
  IGetUsageCategoryListRes,
  IUsageCategoryListWithAppList,
} from 'entity/usage-category';
import { useEffect, useState } from 'react';
import AppColorPicker from '../AppColorPicker';

import styles from './index.module.scss';

const LIMIT = 10;

const UsageInfoList = () => {
  const [categoryList, setCategoryList] = useState<
    IUsageCategoryListWithAppList[]
  >([]);

  useEffect(() => {
    window.electron.ipcRenderer.on('add-usage-category', () => {});
    window.electron.ipcRenderer.on('get-usage-category-list', (arg) => {
      const data = arg as IGetUsageCategoryListRes;
      console.log(data);
      const localCategoryList: IUsageCategoryListWithAppList[] =
        data.result?.map(({ title, id, usage_info_ids, app_names, colors }) => {
          const usageInfoIds = usage_info_ids?.split(',') || [];
          const appNames = app_names?.split(',') || [];
          const appColors = colors?.split(',') || [];
          const appList = usageInfoIds.map((usageInfoId, index) => {
            return {
              id: Number(usageInfoId),
              title: appNames[index] || '',
              color: appColors[index] || '',
            };
          });

          return {
            id: id || 0,
            title: title || '(Uncategorized)',
            appList,
          };
        });
      setCategoryList(localCategoryList);
    });
  }, []);

  const getUsageCategoryList = () => {
    window.electron.ipcRenderer.sendMessage('get-usage-category-list');
  };

  const renderAppList = (appList: IAppList[]) => {
    if (appList.length === 0) {
      return (
        <Container my={16} className={styles.emptyList}>
          <IconMoodEmpty color="gray" size={32} />
          <Text color="gray" size="sm">
            I&apos;m Empty
          </Text>
        </Container>
      );
    }

    const component = appList.map((app) => {
      return (
        <>
          <div className={styles.appItem}>
            <Text className={styles.appItemText}>{app.title}</Text>
            {/* <AppColorPicker id={id || 0} color={app.color || ''} /> */}
            <Button variant="subtle">Edit</Button>
          </div>
          <Divider />
        </>
      );
    });
    return component;
  };

  useEffect(() => {
    getUsageCategoryList();
  }, []);

  return (
    <div>
      <Paper shadow="sm" p="xl" radius={8} m={16}>
        <div className={styles.header}>
          <Title order={2} mb={16}>
            Apps
          </Title>
        </div>

        {categoryList.map(({ title, id, appList }) => {
          return (
            <div key={id}>
              <Title order={4} my={16}>
                {title}
              </Title>
              <Divider />
              {renderAppList(appList)}
            </div>
          );
        })}
      </Paper>
    </div>
  );
};

export default UsageInfoList;
