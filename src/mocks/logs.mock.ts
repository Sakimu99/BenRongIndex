import dayjs from 'dayjs';
import type { DashboardLog } from '../types/dashboard';

export const createTerminalLogs = (startDate: string, endDate: string): DashboardLog[] => {
  const base = dayjs();

  return [
    { time: base.subtract(12, 'second').format('HH:mm:ss'), level: 'INFO', message: 'homepage.init => 企业首页模块初始化完成' },
    { time: base.subtract(9, 'second').format('HH:mm:ss'), level: 'SUCCESS', message: `dashboard.query => 已加载区间 ${startDate} ~ ${endDate}` },
    { time: base.subtract(6, 'second').format('HH:mm:ss'), level: 'INFO', message: 'funding.pipeline => 资方撮合链路运行正常' },
    { time: base.subtract(3, 'second').format('HH:mm:ss'), level: 'WARN', message: 'server.bridge => 当前为 mock mode，待接入公司服务器' },
  ];
};
