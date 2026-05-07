import type { CompanyProfile, TeamMember } from '../types/company';

export const companyProfile: CompanyProfile = {
  name: '安徽犇融商务咨询有限公司',
  slogan: '聚焦助贷协同、风控管理与资金效率提升的专业服务伙伴',
  introduction:
    '安徽犇融商务咨询有限公司专注于助贷业务的数字化协同，围绕客户触达、准入风控、流程管理与资金撮合构建更透明、更高效的业务支持体系，帮助合作伙伴稳定推进增长与交付。',
  features: [
    {
      title: '增长协同',
      description: '围绕线索管理、渠道联动与转化分析，形成更顺畅的业务获取和运营机制。',
    },
    {
      title: '风控管理',
      description: '通过规则引擎与流程节点协同，实现资料审核、风险筛查与业务推进的标准化闭环。',
    },
    {
      title: '资金效率',
      description: '结合资金方策略进行产品匹配与流程编排，提升撮合效率与整体成功率。',
    },
  ],
};

export const teamMembers: TeamMember[] = [
  {
    name: '周景行',
    role: '业务总经理',
    description: '深耕助贷与消费金融业务多年，负责业务增长策略、渠道协同与机构合作管理。',
    tags: ['渠道增长', '机构合作', '业务策略'],
  },
  {
    name: '林知远',
    role: '风控负责人',
    description: '专注贷前准入与风控策略建设，持续优化客户分层、审批规则与风险预警机制。',
    tags: ['准入风控', '规则引擎', '数据分析'],
  },
  {
    name: '沈若衡',
    role: '技术负责人',
    description: '负责平台架构与数据产品建设，推进业务中台、数据看板与系统对接能力落地。',
    tags: ['平台架构', '数据中台', '接口集成'],
  },
  {
    name: '许清禾',
    role: '运营负责人',
    description: '负责客户服务流程、进件协同与贷后反馈管理，提升交付效率与客户体验。',
    tags: ['运营流程', '客户服务', '交付管理'],
  },
];
