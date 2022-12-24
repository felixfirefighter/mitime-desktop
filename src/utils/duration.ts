import dayjs from 'dayjs';

/* eslint-disable import/prefer-default-export */
export const getDuration = (startDate: dayjs.Dayjs, endDate: dayjs.Dayjs) => {
  let seconds = endDate.diff(startDate, 'second');
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  let secondStr = `${seconds}`;
  if (seconds < 10) {
    secondStr = `0${seconds}`;
  }

  let minuteStr = `${minutes}`;
  if (minutes < 10) {
    minuteStr = `0${minutes}`;
  }

  return `${minuteStr}:${secondStr}`;
};
