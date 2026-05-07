# 项目结构与 Cloudflare Pages 部署说明

## 一、项目概览

这是一个基于 **Vite + React + TypeScript + Ant Design** 的公司首页项目，主要用于展示公司品牌、经营概览、趋势图表、团队介绍和运行状态摘要。

### 技术栈
- React 18
- TypeScript
- Vite
- Ant Design 5
- ECharts

## 二、项目结构

```text
src/
├─ App.tsx                    # 全局主题入口，配置 Ant Design 主题
├─ main.tsx                   # 应用入口，挂载样式与 React 根节点
├─ pages/
│  └─ HomePage.tsx            # 首页主页面，组织所有区块
├─ components/
│  ├─ layout/                 # 页头、页脚、区块容器
│  ├─ charts/                 # 经营概览、趋势图、日期筛选
│  ├─ company/                # 公司介绍、团队展示
│  └─ terminal/               # 底部状态摘要模块
├─ services/                  # 数据服务层，统一获取 mock / API 数据
├─ mocks/                     # mock 数据
├─ types/                     # TypeScript 类型定义
├─ utils/                     # 日期、格式、图表配色等工具
└─ styles/                    # 全局样式、主题样式、状态摘要样式

public/
└─ company/
   └─ logo.png                # 公司 Logo 静态资源
```

### 关键文件说明
- `src/pages/HomePage.tsx`：首页结构总入口，负责 Hero、经营概览、趋势图、公司介绍、团队、状态摘要等区块。
- `src/mocks/company.mock.ts`：公司名称、简介、能力点等品牌信息统一来源。
- `src/components/layout/PageHeader.tsx`：顶部品牌区和导航。
- `src/components/layout/PageFooter.tsx`：页脚品牌与联系信息。
- `src/styles/theme.css`：页面主视觉样式。
- `src/styles/terminal.css`：底部状态摘要模块样式。
- `src/App.tsx`：Ant Design 全局主题配置。

## 三、本地开发

```bash
npm install
npm run dev
```

默认会启动本地开发服务，常见地址为：

```text
http://localhost:5173
```

## 四、构建命令

```bash
npm run build
```

构建产物会输出到 `dist/` 目录。

## 五、Cloudflare Pages 部署说明

### 1）仓库准备
把项目推送到 GitHub 或 GitLab，Cloudflare Pages 会从仓库自动拉取代码并构建。

### 2）创建 Pages 项目
在 Cloudflare 控制台中：
1. 进入 **Pages**
2. 选择 **Connect to Git**
3. 绑定仓库
4. 选择要部署的分支

### 3）构建配置
推荐配置如下：

- **Framework preset**：Vite
- **Build command**：`npm run build`
- **Build output directory**：`dist`
- **Root directory**：`/`（仓库根目录）

### 4）环境变量
当前项目默认使用 mock 数据，部署时通常不需要额外环境变量。

如果后续接入真实接口，可以在 Cloudflare Pages 的 **Environment variables** 中补充接口地址，例如：
- `VITE_API_BASE_URL`

### 5）静态资源注意事项
Logo 已放在：

```text
public/company/logo.png
```

页面通过下面路径引用即可：

```text
/company/logo.png
```

### 6）部署完成检查
部署后建议检查：
- 首页是否正常打开
- Logo 是否显示
- 经营概览和图表是否正常渲染
- 移动端是否有明显错位
- 页脚和运行状态摘要是否与浅色主题一致

## 六、常见问题

### 1. 部署后页面空白
通常是构建失败或入口文件异常。先检查 Cloudflare Pages 的构建日志。

### 2. Logo 不显示
确认文件路径是否存在：`public/company/logo.png`，并且引用路径写的是 `/company/logo.png`。

### 3. 样式看起来不一致
确认部署的是最新提交，且没有缓存旧的构建产物。

### 4. 图表没有数据
当前页面默认依赖 mock 数据。若后续切到真实接口，需要先确认 `src/services/dashboard.service.ts` 的数据源配置。

## 七、建议的后续演进

- 把 mock 数据替换为真实后端接口
- 为 Cloudflare Pages 配置环境变量管理
- 如未来加入路由，再补充 Pages 的重定向规则
- 把公司品牌素材统一收拢到 `public/company/` 目录
