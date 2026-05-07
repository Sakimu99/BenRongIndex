import dayjs from 'dayjs';
import type { DashboardLog } from '../types/dashboard';

export const createTerminalLogs = (startDate: string, endDate: string): DashboardLog[] => {
  const base = dayjs();

  return [
    { time: base.subtract(12, 'second').format('HH:mm:ss'), level: 'INFO', message: '首页模块已完成初始化。' },
    { time: base.subtract(9, 'second').format('HH:mm:ss'), level: 'SUCCESS', message: `当前区间 ${startDate} ~ ${endDate} 的数据已同步。` },
    { time: base.subtract(6, 'second').format('HH:mm:ss'), level: 'INFO', message: '资金撮合与风控链路运行正常。' },
    { time: base.subtract(3, 'second').format('HH:mm:ss'), level: 'WARN', message: '当前仍为 mock 模式，后续可接入公司服务器。' },
  ];
};
