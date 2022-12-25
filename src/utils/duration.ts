/* eslint-disable import/prefer-default-export */
export const formatDuration = (
  duration: number | undefined,
  type: 'minute' | 'hour' = 'minute'
) => {
  if (!duration) {
    return `00:00`;
  }

  let seconds = duration;
  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  let secondStr = `${seconds}`;
  if (seconds < 10) {
    secondStr = `0${seconds}`;
  }

  let minuteStr = `${minutes}`;
  if (minutes < 10) {
    minuteStr = `0${minutes}`;
  }

  if (type === 'minute') {
    return `${minuteStr}:${secondStr}`;
  }

  const hour = Math.floor(minutes / 60);
  let hourStr = `${hour}`;
  if (hour < 10) {
    hourStr = `0${hour}`;
  }

  minutes -= hour * 60;
  minuteStr = `${minutes}`;
  if (minutes < 10) {
    minuteStr = `0${minutes}`;
  }

  return `${hourStr}:${minuteStr}:${secondStr}`;
};
