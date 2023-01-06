export interface IUsageByTime {
  app_name: string;
  duration: number;
  group_date: string;
  color: string;
}

export interface IGetUsageByTimeParam {
  type: string;
  start_date: string;
  end_date: string;
}

export interface IGetUsageByTimeRes {
  result: Array<IUsageByTime>;
}

export interface IUsageByTimeObj {
  [key: string]: {
    duration: Array<number>;
    color: string;
  };
}

export interface IUsageByTimeDataset {
  label: string;
  data: Array<any>;
  backgroundColor: string;
}
