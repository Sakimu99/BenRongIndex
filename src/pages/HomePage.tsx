import { useEffect, useMemo, useState } from 'react';
import type { Dayjs } from 'dayjs';
import { Button, Spin } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import { OverviewStats } from '../components/charts/OverviewStats';
import { DateRangeFilter } from '../components/charts/DateRangeFilter';
import { BusinessTrendChart } from '../components/charts/BusinessTrendChart';
import { CompanyIntro } from '../components/company/CompanyIntro';
import { TeamMembers } from '../components/company/TeamMembers';
import { PageFooter } from '../components/layout/PageFooter';
import { PageHeader } from '../components/layout/PageHeader';
import { SectionContainer } from '../components/layout/SectionContainer';
import { TerminalLogPanel } from '../components/terminal/TerminalLogPanel';
import { getDashboardData } from '../services/dashboard.service';
import type { DashboardResponse } from '../types/dashboard';
import { getDefaultRange, toDashboardQuery } from '../utils/date';
import { formatMoney, formatNumber } from '../utils/format';

export const HomePage = () => {
  const [range, setRange] = useState<[Dayjs, Dayjs]>(getDefaultRange());
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const query = useMemo(() => toDashboardQuery(range), [range]);

  useEffect(() => {
    let active = true;
    setLoading(true);

    void getDashboardData(query)
      .then((data) => {
        if (active) {
          setDashboard(data);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [query]);

  const updatePresetRange = (days: number) => {
    const latest = getDefaultRange()[1];
    setRange([latest.subtract(days - 1, 'day').startOf('day'), latest.endOf('day')]);
  };

  return (
    <div className="page-root">
      <div className="page-backdrop" />
      <div className="page-content">
        <PageHeader />
        <main>
          <section className="hero-section">
            <div className="hero-copy">
              <div className="hero-topline">
                <span className="section-eyebrow">BENGRONG TECHNOLOGY</span>
                <span className="hero-status-pill">Enterprise Lending Service Console</span>
              </div>
              <h1>把助贷业务的增长、风控与资金协同，统一呈现在一张专业首页里。</h1>
              <p>
                面向客户服务、准入风控、流程运营与资金撮合场景，构建更透明、更高效、更可持续的业务支持体系，既能对外展示，也便于后续直接接入公司经营数据服务。
              </p>
              <div className="hero-actions">
                <Button type="primary" size="large" href="#overview">
                  查看经营数据
                </Button>
                <Button size="large" ghost href="#company">
                  了解公司能力
                </Button>
              </div>
              {dashboard ? (
                <div className="hero-data-band">
                  <div>
                    <small>累计服务客户</small>
                    <strong>{formatNumber(dashboard.summary.totalCustomersServed)} 人</strong>
                  </div>
                  <div>
                    <small>累计出额资金</small>
                    <strong>{formatMoney(dashboard.summary.totalAmountFunded)}</strong>
                  </div>
                  <div>
                    <small>当前区间</small>
                    <strong>{dashboard.meta.startDate} ~ {dashboard.meta.endDate}</strong>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="hero-panel">
              <div className="hero-panel-frame">
                <div className="hero-panel-screen" />
                <span>业务运行状态</span>
                <strong>渠道稳定 / 风控正常 / 数据已同步</strong>
                <p>默认展示最近 30 天经营数据，并可无缝切换至后续服务器接口。</p>
                <div className="hero-mini-grid">
                  <div>
                    <small>数据周期</small>
                    <b>近 30 天</b>
                  </div>
                  <div>
                    <small>数据模式</small>
                    <b>Mock Ready</b>
                  </div>
                  <div>
                    <small>接口预留</small>
                    <b>API Compatible</b>
                  </div>
                  <div>
                    <small>更新粒度</small>
                    <b>按天统计</b>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SectionContainer
            eyebrow="OVERVIEW"
            title="经营概览"
            description="围绕客户服务规模与资金撮合表现，形成可快速演示、后续可接真实接口的数据首页。"
            className="overview-section"
          >
            {dashboard ? <OverviewStats summary={dashboard.summary} /> : <Spin />}
          </SectionContainer>

          <SectionContainer
            eyebrow="DATA TREND"
            title="客户与出额趋势"
            description="默认基于系统时间回溯最近 30 天，支持按自定义日期区间查看业务趋势。"
            className="trend-section"
            extra={
              <DateRangeFilter
                value={range}
                onChange={setRange}
                onPresetChange={updatePresetRange}
              />
            }
          >
            <div id="overview" className="chart-card">
              {loading || !dashboard ? <Spin /> : <BusinessTrendChart trend={dashboard.trend} />}
            </div>
          </SectionContainer>

          <SectionContainer
            eyebrow="COMPANY PROFILE"
            title="公司介绍"
            description="以数字化协同和流程标准化能力，为助贷业务提供更稳健的运营支撑。"
            className="company-section"
          >
            <div id="company">
              <CompanyIntro />
            </div>
          </SectionContainer>

          <SectionContainer
            eyebrow="CORE TEAM"
            title="核心成员"
            description="兼顾业务、风控、技术与运营的协同团队，为业务规模化提供持续支撑。"
            className="team-section"
          >
            <div id="team">
              <TeamMembers />
            </div>
          </SectionContainer>

          <SectionContainer
            eyebrow="RUNTIME LOGS"
            title="系统运行日志"
            description="页面底部终端风格模块预留了后续对接服务器、日志流与状态监控的能力。"
            className="runtime-section"
          >
            <div id="runtime">
              {dashboard ? <TerminalLogPanel logs={dashboard.logs} /> : <Spin />}
            </div>
          </SectionContainer>
        </main>
        <div className="scroll-indicator">
          <ArrowDownOutlined />
          <span>Scroll for business capability</span>
        </div>
        <PageFooter />
      </div>
    </div>
  );
};
