import { Paper, RingProgress, Text, Title } from '@mantine/core';
import { Period } from 'entity/period';
import { IGetUsageOverviewRes, IUsageOverview } from 'entity/usage-overview';
import mixpanel from 'mixpanel-browser';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getStartAndEndDate } from 'utils/date';
import { formatDuration } from 'utils/duration';
import PeriodSegmentedControl from '../PeriodSegementedControl';
import styles from './index.module.scss';

const UsageOverview = () => {
  const [overview, setOverview] = useState<IUsageOverview[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState(Period.Day.toString());
  const [totalAppUsage, setTotalAppUsage] = useState(0);
  const [hoveredOverview, setHoveredOverview] = useState('');

  const initialRingLabel = useMemo(
    () => (
      <>
        <Text size="sm" align="center">
          App Usage
        </Text>
        <Text size="sm" align="center">
          {formatDuration(totalAppUsage, 'hour')}
        </Text>
      </>
    ),
    [totalAppUsage]
  );

  const [ringLabel, setRingLabel] = useState(initialRingLabel);

  const resetHover = () => {
    setHoveredOverview('');
    setRingLabel(initialRingLabel);
  };

  const getTotalAppUsage = (localOverview: IUsageOverview[]) => {
    return localOverview.reduce((prev, cur) => {
      return prev + cur.duration;
    }, 0);
  };

  const getUsageOverviewPercent = (localOverview: IUsageOverview[]) => {
    if (!localOverview || localOverview.length === 0) {
      return [];
    }

    const totalDuration = getTotalAppUsage(localOverview);

    return localOverview.map((item) => {
      const percent = (item.duration / totalDuration) * 100;
      return {
        value: percent,
        color: item.color,
        onMouseEnter: () => {
          setHoveredOverview(item.app_name);
          setRingLabel(
            <>
              <Text size="sm" align="center">
                {item.app_name}
              </Text>
              <Text size="sm" align="center">
                {formatDuration(item.duration, 'hour')}
              </Text>
              <Text size="sm" align="center">
                ({percent.toFixed(2)}%)
              </Text>
            </>
          );
        },
        onMouseLeave: resetHover,
      };
    });
  };

  const getUsageOverview = useCallback(() => {
    const { startDate, endDate } = getStartAndEndDate(selectedPeriod);
    window.electron.ipcRenderer.sendMessage('get-usage-overview', {
      start_date: startDate.format(),
      end_date: endDate.format(),
    });
  }, [selectedPeriod]);

  useEffect(() => {
    window.electron.ipcRenderer.on('get-usage-overview', (arg) => {
      const data = arg as IGetUsageOverviewRes;
      setOverview(data.result);
    });
  }, []);

  useEffect(() => {
    if (hoveredOverview === '') {
      setTotalAppUsage(getTotalAppUsage(overview));
    }
  }, [overview, hoveredOverview]);

  useEffect(() => {
    setRingLabel(initialRingLabel);
  }, [totalAppUsage, initialRingLabel]);

  useEffect(() => {
    const interval = setInterval(() => {
      getUsageOverview();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [getUsageOverview]);

  useEffect(() => {
    getUsageOverview();
  }, [getUsageOverview, selectedPeriod]);

  return (
    <div>
      <Paper shadow="sm" p="xl" radius={8} m={16}>
        <div className={styles.header}>
          <Title order={2}>Stats</Title>
          <PeriodSegmentedControl
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={(value) => {
              setSelectedPeriod(value);
              mixpanel.track('Toggle Period', {
                source: 'Overview',
                period: value,
              });
            }}
          />
        </div>
        <div className={styles.body}>
          <RingProgress
            label={
              <Text size="sm" align="center">
                {ringLabel}
              </Text>
            }
            onMouseLeave={() => setRingLabel(initialRingLabel)}
            size={280}
            thickness={28}
            sections={getUsageOverviewPercent(overview)}
          />
        </div>
      </Paper>
    </div>
  );
};

export default UsageOverview;
