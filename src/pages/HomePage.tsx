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
                <span className="section-eyebrow">ANHUI BENGRONG CONSULTING</span>
                <span className="hero-status-pill">Professional Lending Service Console</span>
              </div>
              <h1>让助贷业务的增长、风控与资金协同，在同一张首页里清晰呈现。</h1>
              <p>
                面向客户服务、准入风控、流程运营与资金撮合场景，构建更明亮、更透明、更高效的业务展示首页，既适合对外呈现，也便于后续接入真实经营数据。
              </p>
              <div className="hero-actions">
                <Button type="primary" size="large" href="#overview">
                  查看经营数据
                </Button>
                <Button size="large" href="#company">
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
                <span>品牌展示区</span>
                <strong>增长、风控、资金三位一体</strong>
                <p>以更轻盈的视觉方式呈现核心能力，让首页看起来更像正式企业官网，而不是占位面板。</p>
                <div className="hero-mini-grid">
                  <div>
                    <small>业务重点</small>
                    <b>协同增长</b>
                  </div>
                  <div>
                    <small>风控重点</small>
                    <b>标准化流程</b>
                  </div>
                  <div>
                    <small>资金重点</small>
                    <b>高效撮合</b>
                  </div>
                  <div>
                    <small>页面状态</small>
                    <b>视觉焕新</b>
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
            eyebrow="STATUS SNAPSHOT"
            title="运行状态摘要"
            description="页面底部保留简洁的运行状态展示，便于后续接入真实数据与告警信息。"
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
