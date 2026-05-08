import dayjs from 'dayjs';
import type { DashboardQuery, DashboardResponse, MapRegionStat, TrendDataPoint } from '../types/dashboard';
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

const countyRegions: MapRegionStat[] = [
  { name: '瑶海区', customerCount: 26, center: [117.315358, 31.86961], level: 'county', code: '340102', parentCode: '340100' },
  { name: '蜀山区', customerCount: 19, center: [117.262072, 31.855868], level: 'county', code: '340104', parentCode: '340100' },
  { name: '肥西县', customerCount: 16, center: [117.166118, 31.719646], level: 'county', code: '340123', parentCode: '340100' },
  { name: '镜湖区', customerCount: 14, center: [118.376343, 31.32559], level: 'county', code: '340202', parentCode: '340200' },
  { name: '田家庵区', customerCount: 17, center: [117.018318, 32.644342], level: 'county', code: '340403', parentCode: '340400' },
  { name: '迎江区', customerCount: 11, center: [117.044965, 30.506375], level: 'county', code: '340802', parentCode: '340800' },
  { name: '屯溪区', customerCount: 8, center: [118.317354, 29.709186], level: 'county', code: '341002', parentCode: '341000' },
  { name: '琅琊区', customerCount: 9, center: [118.316475, 32.303797], level: 'county', code: '341102', parentCode: '341100' },
  { name: '颍州区', customerCount: 13, center: [115.813914, 32.891238], level: 'county', code: '341202', parentCode: '341200' },
  { name: '埇桥区', customerCount: 15, center: [116.983309, 33.633853], level: 'county', code: '341302', parentCode: '341300' },
  { name: '金安区', customerCount: 10, center: [116.503288, 31.754491], level: 'county', code: '341502', parentCode: '341500' },
  { name: '谯城区', customerCount: 12, center: [115.781214, 33.869284], level: 'county', code: '341602', parentCode: '341600' },
  { name: '贵池区', customerCount: 7, center: [117.488342, 30.657378], level: 'county', code: '341702', parentCode: '341700' },
  { name: '宣州区', customerCount: 9, center: [118.754516, 30.944646], level: 'county', code: '341802', parentCode: '341800' },
];

const cityRegions: MapRegionStat[] = [
  { name: '合肥市', customerCount: 61, center: [117.283042, 31.86119], level: 'city', code: '340100', parentCode: '340000' },
  { name: '芜湖市', customerCount: 32, center: [118.376451, 31.326319], level: 'city', code: '340200', parentCode: '340000' },
  { name: '蚌埠市', customerCount: 24, center: [117.363228, 32.939667], level: 'city', code: '340300', parentCode: '340000' },
  { name: '淮南市', customerCount: 28, center: [117.018329, 32.647574], level: 'city', code: '340400', parentCode: '340000' },
  { name: '马鞍山市', customerCount: 18, center: [118.507906, 31.689362], level: 'city', code: '340500', parentCode: '340000' },
  { name: '淮北市', customerCount: 16, center: [116.794664, 33.971707], level: 'city', code: '340600', parentCode: '340000' },
  { name: '铜陵市', customerCount: 11, center: [117.816576, 30.929935], level: 'city', code: '340700', parentCode: '340000' },
  { name: '安庆市', customerCount: 23, center: [117.043551, 30.50883], level: 'city', code: '340800', parentCode: '340000' },
  { name: '黄山市', customerCount: 12, center: [118.317325, 29.709239], level: 'city', code: '341000', parentCode: '340000' },
  { name: '滁州市', customerCount: 19, center: [118.316264, 32.303627], level: 'city', code: '341100', parentCode: '340000' },
  { name: '阜阳市', customerCount: 27, center: [115.819729, 32.896969], level: 'city', code: '341200', parentCode: '340000' },
  { name: '宿州市', customerCount: 21, center: [116.984084, 33.633891], level: 'city', code: '341300', parentCode: '340000' },
  { name: '六安市', customerCount: 20, center: [116.507676, 31.752889], level: 'city', code: '341500', parentCode: '340000' },
  { name: '亳州市', customerCount: 15, center: [115.782939, 33.869338], level: 'city', code: '341600', parentCode: '340000' },
  { name: '池州市', customerCount: 10, center: [117.489157, 30.656037], level: 'city', code: '341700', parentCode: '340000' },
  { name: '宣城市', customerCount: 14, center: [118.757995, 30.945667], level: 'city', code: '341800', parentCode: '340000' },
];

const hefeiRegions: MapRegionStat[] = [
  { name: '瑶海区', customerCount: 26, center: [117.315358, 31.86961], level: 'county', code: '340102', parentCode: '340100' },
  { name: '庐阳区', customerCount: 21, center: [117.283776, 31.869011], level: 'county', code: '340103', parentCode: '340100' },
  { name: '蜀山区', customerCount: 24, center: [117.262072, 31.855868], level: 'county', code: '340104', parentCode: '340100' },
  { name: '包河区', customerCount: 22, center: [117.285751, 31.82956], level: 'county', code: '340111', parentCode: '340100' },
  { name: '长丰县', customerCount: 15, center: [117.164699, 32.478548], level: 'county', code: '340121', parentCode: '340100' },
  { name: '肥东县', customerCount: 18, center: [117.463222, 31.883992], level: 'county', code: '340122', parentCode: '340100' },
  { name: '肥西县', customerCount: 19, center: [117.166118, 31.719646], level: 'county', code: '340123', parentCode: '340100' },
  { name: '庐江县', customerCount: 11, center: [117.289844, 31.251488], level: 'county', code: '340124', parentCode: '340100' },
  { name: '巢湖市', customerCount: 14, center: [117.874155, 31.600518], level: 'county', code: '340181', parentCode: '340100' },
];

const surroundingRegions: MapRegionStat[] = [
  { name: '安徽省', customerCount: 350, center: [117.283042, 31.86119], level: 'province', code: '340000' },
  { name: '江苏省', customerCount: 48, center: [118.767413, 32.041544], level: 'province', code: '320000' },
  { name: '浙江省', customerCount: 36, center: [120.153576, 30.287459], level: 'province', code: '330000' },
  { name: '江西省', customerCount: 22, center: [115.892151, 28.676493], level: 'province', code: '360000' },
  { name: '湖北省', customerCount: 31, center: [114.298572, 30.584355], level: 'province', code: '420000' },
  { name: '河南省', customerCount: 27, center: [113.665412, 34.757975], level: 'province', code: '410000' },
  { name: '山东省', customerCount: 18, center: [117.000923, 36.675807], level: 'province', code: '370000' },
];

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
    mapViews: {
      defaultMode: 'city',
      city: cityRegions,
      county: countyRegions,
      hefei: hefeiRegions,
      surrounding: surroundingRegions,
    },
    logs: createTerminalLogs(query.startDate, query.endDate),
    meta: {
      startDate: query.startDate,
      endDate: query.endDate,
      currency: 'CNY',
      unit: 'people',
    },
  };
};
