import ReactECharts from 'echarts-for-react';
import type { TrendDataPoint } from '../../types/dashboard';
import { getChartPalette } from '../../utils/chart';
import { formatDisplayDate } from '../../utils/date';
import { formatCompactMoney } from '../../utils/format';

type BusinessTrendChartProps = {
  trend: TrendDataPoint[];
};

export const BusinessTrendChart = ({ trend }: BusinessTrendChartProps) => {
  const palette = getChartPalette();

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: palette.tooltipBg,
      borderWidth: 0,
      textStyle: { color: '#E8EEF8' },
      formatter: (params: Array<{ axisValue: string; seriesName: string; value: number; color: string }>) => {
        const lines = params
          .map((item) => `${item.seriesName}：${item.seriesName.includes('金额') ? formatCompactMoney(item.value) : `${item.value} 人`}`)
          .join('<br/>');
        return `${params[0]?.axisValue ?? ''}<br/>${lines}`;
      },
    },
    legend: {
      top: 0,
      right: 0,
      textStyle: { color: '#A8B6CC' },
    },
    grid: {
      left: 18,
      right: 24,
      top: 56,
      bottom: 16,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: trend.map((item) => formatDisplayDate(item.date)),
      axisLine: { lineStyle: { color: palette.grid } },
      axisLabel: { color: palette.axis },
    },
    yAxis: [
      {
        type: 'value',
        name: '客户数',
        splitLine: { lineStyle: { color: palette.grid, type: 'dashed' } },
        axisLabel: { color: palette.axis },
        nameTextStyle: { color: palette.axis },
      },
      {
        type: 'value',
        name: '出额金额',
        splitLine: { show: false },
        axisLabel: {
          color: palette.axis,
          formatter: (value: number) => formatCompactMoney(value),
        },
        nameTextStyle: { color: palette.axis },
      },
    ],
    series: [
      {
        name: '服务客户数',
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: trend.map((item) => item.customerCount),
        lineStyle: { width: 3, color: palette.customer },
        areaStyle: { color: palette.customerArea },
      },
      {
        name: '出额资金金额',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        showSymbol: false,
        data: trend.map((item) => item.amountTotal),
        lineStyle: { width: 3, color: palette.amount },
        areaStyle: { color: palette.amountArea },
      },
    ],
    media: [
      {
        query: { maxWidth: 768 },
        option: {
          tooltip: { confine: true },
          legend: {
            top: 0,
            left: 0,
            right: 0,
            type: 'scroll',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: { color: '#A8B6CC', fontSize: 11 },
          },
          grid: {
            left: 8,
            right: 8,
            top: 68,
            bottom: 18,
            containLabel: true,
          },
          xAxis: {
            axisLabel: {
              color: palette.axis,
              fontSize: 10,
              hideOverlap: true,
              interval: 'auto',
            },
          },
          yAxis: [
            {
              axisLabel: { color: palette.axis, fontSize: 10 },
              nameTextStyle: { color: palette.axis, fontSize: 10 },
            },
            {
              axisLabel: {
                color: palette.axis,
                fontSize: 10,
                formatter: (value: number) => formatCompactMoney(value),
              },
              nameTextStyle: { color: palette.axis, fontSize: 10 },
            },
          ],
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 'clamp(240px, 46vw, 380px)' }} />;
};
