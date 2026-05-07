export const PageHeader = () => {
  return (
    <header className="site-header">
      <div className="brand-block">
        <img className="brand-logo" src="/company/logo.png" alt="安徽犇融商务咨询有限公司 Logo" />
        <div>
          <strong>安徽犇融商务咨询有限公司</strong>
          <span>助贷协同与风控服务</span>
        </div>
      </div>
      <nav className="top-nav">
        <a href="#overview">经营概览</a>
        <a href="#company">公司介绍</a>
        <a href="#team">核心成员</a>
        <a href="#runtime">运行日志</a>
      </nav>
    </header>
  );
};
