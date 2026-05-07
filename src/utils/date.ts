import dayjs, { Dayjs } from 'dayjs';
import type { DashboardQuery } from '../types/dashboard';

export const DATE_FORMAT = 'YYYY-MM-DD';

export const getDefaultRange = (): [Dayjs, Dayjs] => [
  dayjs().subtract(29, 'day').startOf('day'),
  dayjs().endOf('day'),
];

export const toDashboardQuery = (range: [Dayjs, Dayjs]): DashboardQuery => ({
  startDate: range[0].format(DATE_FORMAT),
  endDate: range[1].format(DATE_FORMAT),
  granularity: 'day',
});

export const formatDisplayDate = (date: string) => dayjs(date).format('MM/DD');
