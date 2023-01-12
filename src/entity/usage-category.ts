import { Color } from 'chart.js';

export interface IUsageCategory {
  title: string;
}

export interface IUsageCategoryWithApp {
  title: string;
  app_name: string;
  color: string;
}

export interface IUsageCategoryListWithAppList {
  title: string;
  app_list: Array<{
    title: string;
    color: Color;
  }>;
}

export interface IAddUsageCategory {
  title: string;
}

export interface IGetUsageCategoryListRes {
  result: Array<IUsageCategoryWithApp>;
}
