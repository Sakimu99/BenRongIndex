import { Col, Row } from 'antd';
import { companyProfile } from '../../mocks/company.mock';

export const CompanyIntro = () => {
  return (
    <div className="company-shell">
      <div className="company-grid">
        <article className="company-story">
          <span className="inline-badge">关于我们</span>
          <h3>{companyProfile.name}</h3>
          <h4>{companyProfile.slogan}</h4>
          <p>{companyProfile.introduction}</p>
          <div className="company-story-metrics">
            <div>
              <small>业务协同</small>
              <strong>客户 / 渠道 / 资金方</strong>
            </div>
            <div>
              <small>系统能力</small>
              <strong>流程化 / 数据化 / 可接入</strong>
            </div>
          </div>
        </article>
        <aside className="company-aside-card">
          <span className="inline-badge">服务方式</span>
          <strong>以标准化流程承接复杂业务，以清晰数据视图支撑增长决策。</strong>
          <p>首页以展示与演示为主，后续可平滑接入公司服务器、经营报表接口与实时日志流。</p>
        </aside>
      </div>
      <Row gutter={[18, 18]}>
        {companyProfile.features.map((feature, index) => (
          <Col xs={24} md={8} key={feature.title}>
            <article className="feature-card">
              <span className="feature-index">0{index + 1}</span>
              <strong>{feature.title}</strong>
              <p>{feature.description}</p>
            </article>
          </Col>
        ))}
      </Row>
    </div>
  );
};
