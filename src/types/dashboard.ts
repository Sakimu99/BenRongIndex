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

export type DashboardResponse = {
  summary: DashboardSummary;
  trend: TrendDataPoint[];
  logs: DashboardLog[];
  meta: {
    startDate: string;
    endDate: string;
    currency: 'CNY';
    unit: 'people';
  };
};
