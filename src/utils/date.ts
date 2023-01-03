import dayjs from 'dayjs';
import { Period } from 'entity/period';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const getStartAndEndDate = (period: string) => {
  let startDate = dayjs.utc().startOf('day');
  let endDate = dayjs.utc().endOf('day');
  if (period === Period.Week.toString()) {
    startDate = startDate.utc().startOf('week');
    endDate = endDate.utc().endOf('week');
  } else if (period === Period.Month.toString()) {
    startDate = startDate.utc().startOf('month');
    endDate = endDate.utc().endOf('month');
  }

  return {
    startDate,
    endDate,
  };
};
