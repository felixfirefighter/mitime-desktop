import { IUsage } from './usage';

export interface IGetUsageListParam {
  limit: number;
  offset: number;
}

export interface IGetUsageListRes {
  result: Array<IUsage>;
  count: {
    'COUNT(1)': number;
  };
}
