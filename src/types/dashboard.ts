export type DashboardQuery = {
  startDate: string;
  endDate: string;
  granularity: 'day';
};

export type TrendDataPoint = {
  date: string;
  customerCount: number;
  amountTotal: number;
};

export type DashboardLogLevel = 'INFO' | 'WARN' | 'SUCCESS';

export type DashboardLog = {
  time: string;
  level: DashboardLogLevel;
  message: string;
};

export type DashboardSummary = {
  totalCustomersServed: number;
  totalAmountFunded: number;
  newCustomersInRange: number;
  amountInRange: number;
};

export type MapViewMode = 'city' | 'county' | 'hefei' | 'surrounding';
export type MapRegionLevel = 'city' | 'county' | 'province';

export type MapRegionStat = {
  name: string;
  customerCount: number;
  center: [number, number];
  level: MapRegionLevel;
  code?: string;
  parentCode?: string;
};

export type DashboardMapViews = {
  defaultMode: MapViewMode;
  city: MapRegionStat[];
  county: MapRegionStat[];
  hefei: MapRegionStat[];
  surrounding: MapRegionStat[];
};
export type DashboardResponse = {
  summary: DashboardSummary;
  trend: TrendDataPoint[];
  mapViews: DashboardMapViews;
  logs: DashboardLog[];
  meta: {
    startDate: string;
    endDate: string;
    currency: 'CNY';
    unit: 'people';
  };
};
