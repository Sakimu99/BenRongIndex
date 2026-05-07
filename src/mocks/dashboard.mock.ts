import dayjs from 'dayjs';
import type { DashboardQuery, DashboardResponse, TrendDataPoint } from '../types/dashboard';
import { createTerminalLogs } from './logs.mock';

const createTrendData = (query: DashboardQuery): TrendDataPoint[] => {
  const start = dayjs(query.startDate);
  const end = dayjs(query.endDate);
  const days = end.diff(start, 'day') + 1;

  return Array.from({ length: days }, (_, index) => {
    const current = start.add(index, 'day');
    const wave = Math.sin(index / 2.8) * 10;
    const slope = index * 1.4;
    const customerCount = Math.max(18, Math.round(42 + wave + slope));
    const amountTotal = Math.round((customerCount * 14800 + index * 5200 + Math.cos(index / 3) * 36000) * 10);

    return {
      date: current.format('YYYY-MM-DD'),
      customerCount,
      amountTotal,
    };
  });
};

export const getDashboardMockData = (query: DashboardQuery): DashboardResponse => {
  const trend = createTrendData(query);
  const amountInRange = trend.reduce((sum, item) => sum + item.amountTotal, 0);
  const newCustomersInRange = trend.reduce((sum, item) => sum + item.customerCount, 0);

  return {
    summary: {
      totalCustomersServed: 12680 + newCustomersInRange,
      totalAmountFunded: 436000000 + amountInRange,
      newCustomersInRange,
      amountInRange,
    },
    trend,
    logs: createTerminalLogs(query.startDate, query.endDate),
    meta: {
      startDate: query.startDate,
      endDate: query.endDate,
      currency: 'CNY',
      unit: 'people',
    },
  };
};
