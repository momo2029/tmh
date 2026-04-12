export interface Platform {
  slug: string
  name: string
  category: string
  tagline: string
  description: string
  inviteLink: string
  officialUrl: string
  bonus: string
  rebate: string
  audience: string
  badges: string[]
  steps: string[]
  extraLinks?: Array<{
    label: string
    url: string
  }>
}

export const siteConfig = {
  name: 'TokenMaxHub',
  heroLabel: 'AI 平台邀请导航',
  title: '把我常用的 AI 平台邀请链接，整理成一个能直接发出去的网站。',
  description:
    '这个站点只做一件事：集中展示我常用的 AI 平台、适合谁用，以及对应的专属邀请入口。',
  announcement:
    '现在的数据是模板示例。后续你只需要编辑 src/lib/siteData.ts 里的链接和文案。',
  contactText: '需要我补充更多平台、教程或返利说明，可以继续在这个仓库里加。'
}

const allPlatforms: Platform[] = [
  {
    slug: 'chatgpt',
    name: 'ChatGPT',
    category: '通用助手',
    tagline: '写作、分析、编程都能直接上手。',
    description:
      '适合把大模型当成主力工作台的人。你可以在这里放自己的邀请链接、权益说明和使用建议。',
    inviteLink: 'https://your-invite-link.example/chatgpt',
    officialUrl: 'https://chatgpt.com/',
    bonus: '这里填写你的专属福利，例如新用户试用、教程包或赠送额度。',
    rebate: '这里填写返佣或合作说明。',
    audience: '适合内容创作、编程辅助、日常问答和团队协作。',
    badges: ['主力推荐', '上手最快', '适合大多数人'],
    steps: ['点击邀请入口', '完成注册或升级', '按你的使用场景开始体验']
  },
  {
    slug: 'openclaudecode',
    name: 'OpenClaudeCode',
    category: 'Claude 生态',
    tagline: '中文入口，适合直接承接 Claude 相关用户。',
    description:
      '这个入口已经替换成你提供的真实邀请链接。后面你可以继续补充具体权益、返佣说明和适合人群。',
    inviteLink: 'https://www.openclaudecode.cn/register?aff=10Vo',
    officialUrl: 'https://www.openclaudecode.cn/',
    bonus: '这里补充这个链接对应的新用户福利、试用规则或套餐说明。',
    rebate: '这里补充你的返佣说明、售后方式或领取流程。',
    audience: '适合想找 Claude 相关中文入口、注册入口或稳定使用入口的用户。',
    badges: ['真实邀请链接', '中文入口', 'Claude 相关'],
    steps: ['点击你的专属邀请链接', '完成注册', '按页面提示开通或开始使用'],
    extraLinks: [
      {
        label: '注册链接',
        url: 'https://www.openclaudecode.cn/register?aff=10Vo'
      }
    ]
  },
  {
    slug: 'foxcode',
    name: 'FoxCode',
    category: 'ClaudeCode 套餐',
    tagline: '适合主打 ClaudeCode 套餐入口和注册转化。',
    description:
      '这个平台已经替换成你提供的真实邀请链接。当前先按 ClaudeCode 套餐入口展示，后面你可以再补具体套餐差异和适合人群。',
    inviteLink: 'https://foxcode.rjj.cc/auth/register?aff=19U26',
    officialUrl: 'https://foxcode.rjj.cc/',
    bonus: '这里补充 FoxCode 的套餐亮点、试用说明或优惠信息。',
    rebate: '这里补充你的返佣比例、售后方式或领取说明。',
    audience: '适合想找 ClaudeCode 套餐、中文注册入口或替代购买入口的用户。',
    badges: ['真实邀请链接', 'ClaudeCode 套餐', '注册入口'],
    steps: ['打开你的专属链接', '注册账号', '根据页面选择对应套餐'],
    extraLinks: [
      {
        label: '注册链接',
        url: 'https://foxcode.rjj.cc/auth/register?aff=19U26'
      }
    ]
  },
  {
    slug: 'westcn',
    name: '西部数据',
    category: '服务器与主机',
    tagline: '适合承接新用户礼包、云主机和建站相关需求。',
    description:
      '这个平台已经接入你给的两条真实推广链接，一条偏高防云主机，一条偏新用户礼包，适合放在站内做资源型入口。',
    inviteLink: 'https://www.west.cn/active/freetc/?ReferenceID=998198',
    officialUrl: 'https://www.west.cn/',
    bonus: '西部数据新用户大礼包。',
    rebate: '这里补充你的返佣说明、代开通方式或售后支持。',
    audience: '适合新用户建站、云主机、服务器和基础资源采购人群。',
    badges: ['真实邀请链接', '新用户礼包', '主机资源'],
    steps: ['先看礼包或高防产品入口', '按需求选择产品', '完成注册和下单'],
    extraLinks: [
      {
        label: '新用户大礼包',
        url: 'https://www.west.cn/active/freetc/?ReferenceID=998198'
      },
      {
        label: '高防云主机',
        url: 'https://www.west.cn/cloudhost/gaofang/?ReferenceID=998198'
      }
    ]
  },
  {
    slug: 'xucat',
    name: '讯猫移动',
    category: '便宜服务器',
    tagline: '主打价格优势，适合做低价服务器入口。',
    description:
      '这个平台已经接入你给的真实邀请链接，当前先按“服务器特别便宜”的卖点展示，适合承接预算敏感型用户。',
    inviteLink: 'https://cloud.xucat.com/aff/APKXXMMW',
    officialUrl: 'https://cloud.xucat.com/',
    bonus: '服务器特别便宜。',
    rebate: '这里补充你的返佣说明、售后支持或代配置服务。',
    audience: '适合想找低价服务器、入门云资源或轻量部署环境的用户。',
    badges: ['真实邀请链接', '价格友好', '服务器入口'],
    steps: ['打开专属邀请链接', '查看可用套餐', '按预算选择服务器配置'],
    extraLinks: [
      {
        label: '服务器入口',
        url: 'https://cloud.xucat.com/aff/APKXXMMW'
      }
    ]
  },
  {
    slug: 'siliconflow',
    name: '硅基流动',
    category: '大模型调用',
    tagline: '适合做全平台模型调用入口，主打低价。',
    description:
      '这个平台已经接入你给的真实邀请链接，当前先按“全平台使用”和“大模型调用价格全网最低”的方向展示。',
    inviteLink: 'https://cloud.siliconflow.cn/i/vBE1tfq6',
    officialUrl: 'https://cloud.siliconflow.cn/',
    bonus: '全平台使用，大模型调用价格全网最低。',
    rebate: '这里补充你的返佣说明、充值支持或对接服务。',
    audience: '适合需要 API 调用、多模型接入、成本敏感型开发和产品场景。',
    badges: ['真实邀请链接', '模型调用', '低价入口'],
    steps: ['打开你的专属链接', '注册并进入控制台', '按需求创建和使用模型调用服务'],
    extraLinks: [
      {
        label: '硅基流动入口',
        url: 'https://cloud.siliconflow.cn/i/vBE1tfq6'
      }
    ]
  },
  {
    slug: 'gemini',
    name: 'Gemini',
    category: 'Google 生态',
    tagline: '更适合已经在用 Google 工作流的人。',
    description:
      '如果你的用户群体经常使用 Gmail、Docs 或 Google Workspace，这里可以挂对应的入口。',
    inviteLink: 'https://your-invite-link.example/gemini',
    officialUrl: 'https://gemini.google.com/',
    bonus: '这里填写赠送时长、额度说明或使用门槛。',
    rebate: '这里填写佣金规则或合作备注。',
    audience: '适合 Google 生态用户、搜索增强和多模态尝试。',
    badges: ['Google 生态', '搜索结合', '轻量尝试'],
    steps: ['点击你的邀请链接', '确认账号地区和可用性', '开通后开始使用']
  },
  {
    slug: 'perplexity',
    name: 'Perplexity',
    category: '搜索增强',
    tagline: '搜索、资料汇总和带来源回答更直接。',
    description:
      '这类平台很适合做成“信息检索推荐位”，让用户知道什么时候用搜索型 AI 更省时间。',
    inviteLink: 'https://your-invite-link.example/perplexity',
    officialUrl: 'https://www.perplexity.ai/',
    bonus: '这里填写你的邀请权益，比如赠送 Pro 天数或额外积分。',
    rebate: '这里填写合作说明或用户领取方式。',
    audience: '适合研究、资料检索、热点跟踪和快速做背景调查。',
    badges: ['带来源回答', '检索快', '适合研究'],
    steps: ['通过邀请页进入', '完成注册', '先从搜索型问题开始体验']
  },
  {
    slug: 'poe',
    name: 'Poe',
    category: '多模型入口',
    tagline: '一个入口切换多个模型，适合尝鲜和轻量使用。',
    description:
      '如果你想给用户一个“先体验再决定”的入口，多模型聚合站通常转化更自然。',
    inviteLink: 'https://your-invite-link.example/poe',
    officialUrl: 'https://poe.com/',
    bonus: '这里填写试用说明、积分礼包或入门教程。',
    rebate: '这里填写返佣政策或专属客服方式。',
    audience: '适合多模型对比、临时使用和移动端轻量访问。',
    badges: ['多模型', '门槛低', '适合新手'],
    steps: ['进入邀请页', '注册账号', '按需求切换模型体验']
  },
  {
    slug: 'midjourney',
    name: 'Midjourney',
    category: 'AI 绘图',
    tagline: '适合把图像生成单独做成一个流量入口。',
    description:
      '如果你的网站会面向设计师、自媒体和电商卖家，这类平台值得单独放在视觉位。',
    inviteLink: 'https://your-invite-link.example/midjourney',
    officialUrl: 'https://www.midjourney.com/',
    bonus: '这里填写新用户权益、教程或关键词包。',
    rebate: '这里填写合作返利和服务范围。',
    audience: '适合海报、封面图、概念图和电商素材制作。',
    badges: ['图像生成', '视觉流量', '设计向'],
    steps: ['点击你的入口', '完成账号准备', '按教程开始生成图片']
  }
]

export const platforms = allPlatforms.filter(
  (platform) => !platform.inviteLink.includes('your-invite-link.example')
)

export const featuredPlatforms = platforms.slice(0, 3)

export const categories = Array.from(new Set(platforms.map((platform) => platform.category)))
