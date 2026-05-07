import type { DashboardQuery, DashboardResponse } from '../types/dashboard';
import { getDashboardMockData } from '../mocks/dashboard.mock';

export const getDashboardFromMock = async (query: DashboardQuery): Promise<DashboardResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 120));
  return getDashboardMockData(query);
};
