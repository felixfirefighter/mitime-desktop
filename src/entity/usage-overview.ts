export interface IUsageOverview {
  app_name: string;
  'SUM(duration)': number;
}

export interface IGetUsageOverviewParam {
  start_date: string;
  end_date: string;
}

export interface IGetUsageOverviewRes {
  result: Array<IUsageOverview>;
}
