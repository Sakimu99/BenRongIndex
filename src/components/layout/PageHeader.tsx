export const PageHeader = () => {
  return (
    <header className="site-header">
      <div className="brand-block">
        <div className="brand-mark">BR</div>
        <div>
          <strong>本融科技</strong>
          <span>Digital Lending Services</span>
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
