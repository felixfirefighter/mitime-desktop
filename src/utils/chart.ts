import {
  HOUR_GROUPS,
  HOUR_LABELS,
  MONTH_GROUPS,
  MONTH_LABELS,
  WEEK_GROUPS,
  WEEK_LABELS,
} from 'constant/date';
import dayjs from 'dayjs';
import { Period } from 'entity/period';

export const getChartLabelsAndGroups = (period: string) => {
  if (period === Period.Day.toString()) {
    return {
      labels: HOUR_LABELS,
      groups: HOUR_GROUPS,
    };
  }
  if (period === Period.Week.toString()) {
    return {
      labels: WEEK_LABELS,
      groups: WEEK_GROUPS,
    };
  }

  return {
    labels: MONTH_LABELS,
    groups: MONTH_GROUPS,
  };
};

export const getTimeGroup = (period: string, groupDate: string) => {
  if (period === Period.Week.toString()) {
    const dayOfWeek = dayjs(groupDate).day();
    return dayOfWeek;
  }

  if (period === Period.Month.toString()) {
    const timeParts = groupDate.split('-');
    return (Number(timeParts.pop()) || 1) - 1;
  }

  const timeParts = groupDate.split('-');
  return Number(timeParts.pop()) || 0;
};
