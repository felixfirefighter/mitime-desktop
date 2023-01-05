import { Paper, Title } from '@mantine/core';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as CharJSTitle,
  Tooltip,
  Legend,
} from 'chart.js';
import { APP_MANTINE_DEFAULT_COLORS } from 'constant/color';
import { Period } from 'entity/period';
import {
  IGetUsageByTimeRes,
  IUsageByTime,
  IUsageByTimeDataset,
  IUsageByTimeObj,
} from 'entity/usage-by-time';
import mixpanel from 'mixpanel-browser';
import { useCallback, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getChartLabelsAndGroups } from 'utils/chart';
import { strToMantineColor } from 'utils/color';
import { getStartAndEndDate } from 'utils/date';
import PeriodSegmentedControl from '../PeriodSegementedControl';
import styles from './index.module.scss';

const UsageBarChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(Period.Day.toString());
  const [usageByTimeList, setUsageByTimeList] = useState<IUsageByTime[]>([]);

  const getUsageByTime = useCallback(() => {
    const { startDate, endDate } = getStartAndEndDate(selectedPeriod);
    window.electron.ipcRenderer.sendMessage('get-usage-by-time', {
      start_date: startDate.format(),
      end_date: endDate.format(),
    });
  }, [selectedPeriod]);

  useEffect(() => {
    window.electron.ipcRenderer.on('get-usage-by-time', (arg) => {
      const data = arg as IGetUsageByTimeRes;
      setUsageByTimeList(data.result);
    });
  }, []);

  useEffect(() => {
    getUsageByTime();
  }, [getUsageByTime]);

  const getData = () => {
    const { labels, groups } = getChartLabelsAndGroups(selectedPeriod);
    const dataObj: IUsageByTimeObj = {};
    usageByTimeList.forEach(({ app_name, group_date, duration }) => {
      if (!(app_name in dataObj)) {
        dataObj[app_name] = [...groups];
      }

      const timeParts = group_date.split('-');
      const time = Number(timeParts.pop()) || 0;
      dataObj[app_name][time] += duration;
    });

    const datasets: IUsageByTimeDataset[] = [];
    Object.keys(dataObj).forEach((key) => {
      const mantineColor = strToMantineColor(key);
      datasets.push({
        label: key,
        data: dataObj[key].map((duration) => {
          return Math.floor(duration / 60);
        }),
        backgroundColor:
          APP_MANTINE_DEFAULT_COLORS[mantineColor.color][mantineColor.shade],
      });
    });

    return {
      labels,
      datasets,
    };
  };

  getData();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    CharJSTitle,
    Tooltip,
    Legend
  );

  const options = {
    plugins: {},
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div>
      <Paper shadow="sm" p="xl" radius={8} m={16}>
        <div className={styles.header}>
          <Title order={2}>Usage</Title>
          <PeriodSegmentedControl
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={(value) => {
              setSelectedPeriod(value);
              mixpanel.track('Toggle Period', {
                source: 'Usage',
                period: value,
              });
            }}
          />
        </div>
        <Bar options={options} data={getData()} />
      </Paper>
    </div>
  );
};

export default UsageBarChart;
