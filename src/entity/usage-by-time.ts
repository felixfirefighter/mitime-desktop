import { Period } from './period';

export interface IUsageByTime {
  app_name: string;
  duration: number;
  group_date: string;
}

export interface IGetUsageByTimeParam {
  type: Period;
  start_date: string;
  end_date: string;
}

export interface IGetUsageByTimeRes {
  result: Array<IUsageByTime>;
}

export interface IUsageByTimeObj {
  [key: string]: Array<number>;
}

export interface IUsageByTimeDataset {
  label: string;
  data: Array<any>;
  backgroundColor: string;
}
