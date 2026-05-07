export const formatNumber = (value: number) => new Intl.NumberFormat('zh-CN').format(value);

export const formatMoney = (value: number) => {
  if (value >= 100000000) {
    return `${(value / 100000000).toFixed(2)} 亿元`;
  }

  if (value >= 10000) {
    return `${(value / 10000).toFixed(2)} 万元`;
  }

  return `${value.toFixed(0)} 元`;
};

export const formatCompactMoney = (value: number) => {
  if (value >= 100000000) {
    return `${(value / 100000000).toFixed(1)} 亿`;
  }

  return `${(value / 10000).toFixed(1)} 万`;
};
