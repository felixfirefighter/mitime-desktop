import { Color } from 'chart.js';

export interface IUsageCategory {
  title: string;
}

export interface IUsageCategoryWithApp {
  title: string;
  category_id: number;
  usage_info_ids: string;
  app_names: string;
  colors: string;
}

export interface IUsageCategoryListWithAppList {
  title: string;
  app_list: Array<{
    id: number;
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
