import { BankOutlined, RiseOutlined, TeamOutlined, WalletOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import type { DashboardSummary } from '../../types/dashboard';
import { formatCompactMoney, formatMoney, formatNumber } from '../../utils/format';

type OverviewStatsProps = {
  summary: DashboardSummary;
};

const items = (summary: DashboardSummary) => [
  {
    key: 'customers',
    icon: <TeamOutlined />,
    label: '累计服务客户',
    value: `${formatNumber(summary.totalCustomersServed)} 人`,
    hint: '覆盖多渠道客户触达与服务链路',
  },
  {
    key: 'funded',
    icon: <WalletOutlined />,
    label: '累计出额资金',
    value: formatMoney(summary.totalAmountFunded),
    hint: '持续提升撮合效率与放款质量',
  },
  {
    key: 'newCustomers',
    icon: <RiseOutlined />,
    label: '区间新增客户',
    value: `${formatNumber(summary.newCustomersInRange)} 人`,
    hint: '跟随日期筛选实时更新',
  },
  {
    key: 'amount',
    icon: <BankOutlined />,
    label: '区间撮合金额',
    value: formatCompactMoney(summary.amountInRange),
    hint: '用于观测近阶段业务波动',
  },
];

export const OverviewStats = ({ summary }: OverviewStatsProps) => {
  return (
    <Row gutter={[18, 18]}>
      {items(summary).map((item) => (
        <Col xs={24} sm={12} xl={6} key={item.key}>
          <article className="metric-card">
            <div className="metric-icon">{item.icon}</div>
            <div className="metric-copy">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.hint}</p>
            </div>
          </article>
        </Col>
      ))}
    </Row>
  );
};
