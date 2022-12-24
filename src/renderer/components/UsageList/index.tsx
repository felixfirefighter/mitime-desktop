import { Pagination, Paper, Table } from '@mantine/core';
import dayjs from 'dayjs';
import { IGetUsageListRes } from 'entity/ipc';
import { IUsage } from 'entity/usage';
import { useEffect, useState } from 'react';
import { getDuration } from 'utils/duration';

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

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get-usage-list', {
      limit: LIMIT,
      offset: (page - 1) * LIMIT,
    });
  }, [page]);

  return (
    <div className="usage-list">
      <Paper shadow="sm" p="lg">
        <Table verticalSpacing="lg">
          <thead>
            <tr>
              <th>App</th>
              <th>Title</th>
              <th>Start</th>
              <th>End</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {usageList.map(({ id, app_name, title, start_date, end_date }) => {
              return (
                <tr key={id}>
                  <td>{app_name}</td>
                  <td>
                    <div className="usage-title">{title}</div>
                  </td>
                  <td>{dayjs(start_date).format('HH:mm:ss')}</td>
                  <td>{dayjs(end_date).format('HH:mm:ss')}</td>
                  <td>{getDuration(dayjs(start_date), dayjs(end_date))}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Pagination
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
