export interface IUsageInfo {
  id?: number;
  app_name?: string;
  color?: string;
}

export interface IGetUsageInfoListParam {
  limit: number;
  offset: number;
}

export interface IGetUsageInfoListRes {
  result: Array<IUsageInfo>;
  count: number;
}

export interface IUpdateUsageInfoParam {
  id: number;
  color: string;
}
