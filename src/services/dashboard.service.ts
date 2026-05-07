import type { DashboardQuery, DashboardResponse } from '../types/dashboard';
import { getDashboardFromMock } from './mock.service';

export const getDashboardData = async (query: DashboardQuery): Promise<DashboardResponse> => {
  return getDashboardFromMock(query);
};
