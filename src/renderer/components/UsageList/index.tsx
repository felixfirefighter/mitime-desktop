import {
  ActionIcon,
  Pagination,
  Paper,
  Table,
  Title,
  Tooltip,
  Text,
} from '@mantine/core';
import { IconRefresh } from '@tabler/icons';
import dayjs from 'dayjs';
import { IGetUsageListRes, IUsage } from 'entity/usage-list';
import { useEffect, useState } from 'react';
import { formatDuration } from 'utils/duration';
import './index.scss';

const LIMIT = 10;

const UsageList = () => {
  const [usageList, setUsageList] = useState<IUsage[]>([]);
  const [count, setCount] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.electron.ipcRenderer.on('get-usage-list', (arg) => {
      const data = arg as IGetUsageListRes;
      setUsageList(data.result);
      setCount(data.count['COUNT(1)']);
    });
  }, []);

  const getUsageList = (localPage: number) => {
    window.electron.ipcRenderer.sendMessage('get-usage-list', {
      limit: LIMIT,
      offset: (localPage - 1) * LIMIT,
    });
  };

  useEffect(() => {
    getUsageList(page);
  }, [page]);

  return (
    <div className="usage-list">
      <Paper shadow="sm" p="xl" radius={8} m={16}>
        <div className="usage-list-header">
          <Title order={2}>App Usage</Title>
          <ActionIcon onClick={() => getUsageList(page)}>
            <IconRefresh />
          </ActionIcon>
        </div>

        <Table verticalSpacing="lg" className="table">
          <thead>
            <tr>
              <th>App</th>
              <th>Title</th>
              <th>URL</th>
              <th>Start</th>
              <th>End</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {usageList.map(
              ({
                id,
                app_name,
                title,
                url,
                start_date,
                end_date,
                duration,
              }) => {
                return (
                  <tr key={id}>
                    <td>{app_name}</td>
                    <td>
                      <Tooltip label={title}>
                        <Text className="usage-text">{title}</Text>
                      </Tooltip>
                    </td>
                    <td>
                      <Tooltip label={url}>
                        <Text className="usage-text">{url}</Text>
                      </Tooltip>
                    </td>
                    <td>{dayjs(start_date).format('HH:mm:ss')}</td>
                    <td>{dayjs(end_date).format('HH:mm:ss')}</td>
                    <td>{formatDuration(duration)}</td>
                  </tr>
                );
              }
            )}
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

export default UsageList;
