import { useState } from 'react';
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const navItems = [
  { href: '#overview', label: '经营概览' },
  { href: '#company', label: '公司介绍' },
  { href: '#team', label: '核心成员' },
  { href: '#region-map', label: '客户地图' },
  { href: '#runtime', label: '运行日志' },
];

export const PageHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="brand-block">
        <img className="brand-logo" src="/company/logo.png" alt="安徽犇融商务咨询有限公司 Logo" />
        <div>
          <strong>安徽犇融商务咨询有限公司</strong>
          <span>助贷协同与风控服务</span>
        </div>
      </div>
      <nav className="top-nav" aria-label="主导航">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <Button
        className="mobile-nav-trigger"
        icon={<MenuOutlined />}
        onClick={() => setOpen(true)}
        aria-label="打开导航菜单"
      />
      <Drawer open={open} onClose={() => setOpen(false)} placement="right" width={300} title="页面导航">
        <nav className="mobile-nav" aria-label="移动端主导航">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </Drawer>
    </header>
  );
};
