import { Color } from 'chart.js';

export interface IUsageCategory {
  title: string;
}

export interface IUsageCategoryWithApp {
  id: number;
  title: string;
  category_id: number;
  usage_info_ids: string;
  app_names: string;
  colors: string;
}

export interface IAppList {
  id: number;
  title: string;
  color: string;
}

export interface IUsageCategoryListWithAppList {
  id: number;
  title: string;
  appList: Array<IAppList>;
}

export interface IAddUsageCategory {
  title: string;
}

export interface IGetUsageCategoryListRes {
  result: Array<IUsageCategoryWithApp>;
}
