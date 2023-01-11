export interface IUsageCategory {
  title: string;
}

export interface IAddUsageCategory {
  title: string;
}

export interface IGetUsageCategoryListRes {
  result: Array<IUsageCategory>;
}
