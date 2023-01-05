export interface IUsageOverview {
  app_name: string;
  duration: number;
  color: string;
}

export interface IGetUsageOverviewParam {
  start_date: string;
  end_date: string;
}

export interface IGetUsageOverviewRes {
  result: Array<IUsageOverview>;
}
