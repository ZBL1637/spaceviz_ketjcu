/**
 * 中国太空探索历史数据
 * 包含关键里程碑、发射统计、导航系统对比等数据
 */

// 中国太空探索关键里程碑
export const chinaMilestones = [
  {
    id: 1,
    year: 1970,
    date: '1970-04-24',
    mission: '东方红一号',
    type: '人造卫星',
    significance: '中国第一颗人造地球卫星，标志着中国进入太空时代',
    description: '成功发射东方红一号卫星，播放《东方红》乐曲，向全世界宣告中国进入太空时代',
    category: 'satellite',
    status: 'success'
  },
  {
    id: 2,
    year: 1975,
    date: '1975-11-26',
    mission: '返回式卫星一号',
    type: '返回式卫星',
    significance: '中国第一颗返回式卫星，掌握卫星回收技术',
    description: '成功发射并回收返回式卫星，为载人航天奠定基础',
    category: 'satellite',
    status: 'success'
  },
  {
    id: 3,
    year: 2003,
    date: '2003-10-15',
    mission: '神舟五号',
    type: '载人航天',
    significance: '中国首次载人航天飞行，杨利伟成为中国第一位航天员',
    description: '杨利伟搭乘神舟五号飞船成功进入太空，实现中华民族千年飞天梦想',
    category: 'manned',
    status: 'success'
  },
  {
    id: 4,
    year: 2007,
    date: '2007-10-24',
    mission: '嫦娥一号',
    type: '月球探测',
    significance: '中国首个月球探测器，开启探月工程',
    description: '成功发射嫦娥一号月球探测器，获得全月球影像图',
    category: 'lunar',
    status: 'success'
  },
  {
    id: 5,
    year: 2008,
    date: '2008-09-25',
    mission: '神舟七号',
    type: '载人航天',
    significance: '中国首次太空行走，翟志刚出舱活动',
    description: '翟志刚成功进行中国首次太空行走，展示中国国旗',
    category: 'manned',
    status: 'success'
  },
  {
    id: 6,
    year: 2011,
    date: '2011-09-29',
    mission: '天宫一号',
    type: '空间站',
    significance: '中国首个空间实验室，为空间站建设积累经验',
    description: '成功发射天宫一号目标飞行器，开展空间交会对接试验',
    category: 'station',
    status: 'success'
  },
  {
    id: 7,
    year: 2013,
    date: '2013-12-14',
    mission: '嫦娥三号',
    type: '月球探测',
    significance: '中国首次月面软着陆，玉兔号月球车成功巡视',
    description: '嫦娥三号成功在月球虹湾区软着陆，玉兔号月球车开始月面巡视探测',
    category: 'lunar',
    status: 'success'
  },
  {
    id: 8,
    year: 2016,
    date: '2016-09-15',
    mission: '天宫二号',
    type: '空间站',
    significance: '中国首个真正意义上的空间实验室',
    description: '发射天宫二号空间实验室，开展多项空间科学实验',
    category: 'station',
    status: 'success'
  },
  {
    id: 9,
    year: 2019,
    date: '2019-01-03',
    mission: '嫦娥四号',
    type: '月球探测',
    significance: '人类首次月球背面软着陆，玉兔二号月球车巡视探测',
    description: '嫦娥四号成功在月球背面南极-艾特肯盆地冯·卡门撞击坑软着陆',
    category: 'lunar',
    status: 'success'
  },
  {
    id: 10,
    year: 2020,
    date: '2020-07-23',
    mission: '天问一号',
    type: '火星探测',
    significance: '中国首次火星探测任务，一次性实现"绕、着、巡"三大目标',
    description: '成功发射天问一号火星探测器，开启中国行星探测新征程',
    category: 'mars',
    status: 'success'
  },
  {
    id: 11,
    year: 2020,
    date: '2020-12-17',
    mission: '嫦娥五号',
    type: '月球探测',
    significance: '中国首次月球采样返回任务，获得月球样品',
    description: '嫦娥五号成功完成月球采样返回，带回1731克月球样品',
    category: 'lunar',
    status: 'success'
  },
  {
    id: 12,
    year: 2021,
    date: '2021-04-29',
    mission: '天和核心舱',
    type: '空间站',
    significance: '中国空间站建设正式开始，天和核心舱成功发射',
    description: '天和核心舱成功发射，标志着中国空间站建设进入实施阶段',
    category: 'station',
    status: 'success'
  },
  {
    id: 13,
    year: 2021,
    date: '2021-05-15',
    mission: '祝融号火星车',
    type: '火星探测',
    significance: '中国火星车成功着陆火星表面，开始巡视探测',
    description: '祝融号火星车在火星乌托邦平原成功着陆，开始火星表面巡视探测',
    category: 'mars',
    status: 'success'
  },
  {
    id: 14,
    year: 2022,
    date: '2022-12-31',
    mission: '中国空间站建成',
    type: '空间站',
    significance: '中国空间站全面建成，成为国家太空实验室',
    description: '天和核心舱、问天实验舱、梦天实验舱组成的空间站全面建成',
    category: 'station',
    status: 'success'
  }
];

// 中美俄卫星发射数量对比数据（年度数据）
export const satelliteLaunchComparison = [
  { year: 1970, china: 1, usa: 36, russia: 81 },
  { year: 1975, china: 3, usa: 30, russia: 89 },
  { year: 1980, china: 4, usa: 13, russia: 89 },
  { year: 1985, china: 2, usa: 17, russia: 97 },
  { year: 1990, china: 5, usa: 27, russia: 75 },
  { year: 1995, china: 3, usa: 24, russia: 32 },
  { year: 2000, china: 5, usa: 28, russia: 34 },
  { year: 2005, china: 5, usa: 16, russia: 26 },
  { year: 2010, china: 15, usa: 15, russia: 31 },
  { year: 2012, china: 19, usa: 13, russia: 24 },
  { year: 2013, china: 15, usa: 19, russia: 32 },
  { year: 2014, china: 16, usa: 23, russia: 38 },
  { year: 2015, china: 19, usa: 20, russia: 26 },
  { year: 2016, china: 22, usa: 22, russia: 17 },
  { year: 2017, china: 18, usa: 29, russia: 19 },
  { year: 2018, china: 39, usa: 31, russia: 17 },
  { year: 2019, china: 34, usa: 27, russia: 25 },
  { year: 2020, china: 35, usa: 44, russia: 15 },
  { year: 2021, china: 55, usa: 51, russia: 15 },
  { year: 2022, china: 64, usa: 87, russia: 21 },
  { year: 2023, china: 67, usa: 116, russia: 19 }
];

// 载人航天任务对比数据
export const mannedMissionComparison = [
  { year: 2003, china: 1, usa: 2, russia: 2 },
  { year: 2005, china: 1, usa: 3, russia: 2 },
  { year: 2008, china: 1, usa: 3, russia: 2 },
  { year: 2010, china: 0, usa: 3, russia: 3 },
  { year: 2012, china: 1, usa: 0, russia: 4 },
  { year: 2013, china: 1, usa: 0, russia: 3 },
  { year: 2014, china: 0, usa: 0, russia: 4 },
  { year: 2015, china: 0, usa: 0, russia: 4 },
  { year: 2016, china: 1, usa: 0, russia: 4 },
  { year: 2017, china: 0, usa: 0, russia: 5 },
  { year: 2018, china: 0, usa: 0, russia: 3 },
  { year: 2019, china: 0, usa: 0, russia: 3 },
  { year: 2020, china: 0, usa: 2, russia: 2 },
  { year: 2021, china: 3, usa: 4, russia: 2 },
  { year: 2022, china: 4, usa: 5, russia: 3 },
  { year: 2023, china: 4, usa: 7, russia: 3 }
];

// 导航系统功能对比数据
export const navigationSystemComparison = {
  beidou: {
    name: '北斗',
    country: '中国',
    coverage: 95, // 全球覆盖率
    accuracy: 90, // 定位精度 (相对评分)
    reliability: 92, // 可靠性
    services: 88, // 服务多样性
    openness: 85, // 开放程度
    innovation: 95, // 技术创新
    description: '中国自主研发的全球卫星导航系统，提供高精度定位、导航、授时服务'
  },
  gps: {
    name: 'GPS',
    country: '美国',
    coverage: 100, // 全球覆盖率
    accuracy: 85, // 定位精度
    reliability: 88, // 可靠性
    services: 75, // 服务多样性
    openness: 70, // 开放程度
    innovation: 80, // 技术创新
    description: '美国全球定位系统，世界上最早的卫星导航系统'
  },
  glonass: {
    name: 'GLONASS',
    country: '俄罗斯',
    coverage: 85, // 全球覆盖率
    accuracy: 80, // 定位精度
    reliability: 85, // 可靠性
    services: 70, // 服务多样性
    openness: 75, // 开放程度
    innovation: 75, // 技术创新
    description: '俄罗斯全球导航卫星系统，主要服务俄罗斯及周边地区'
  },
  galileo: {
    name: 'Galileo',
    country: '欧盟',
    coverage: 80, // 全球覆盖率
    accuracy: 88, // 定位精度
    reliability: 82, // 可靠性
    services: 78, // 服务多样性
    openness: 90, // 开放程度
    innovation: 85, // 技术创新
    description: '欧盟伽利略卫星导航系统，注重民用和商业应用'
  }
};

// 北斗系统应用案例
export const beidouApplications = [
  {
    id: 1,
    category: '交通运输',
    title: '智能交通管理',
    description: '北斗系统为城市交通提供精准定位和导航服务，优化交通流量',
    impact: '提升交通效率30%，减少拥堵时间',
    location: { lat: 39.9042, lng: 116.4074, city: '北京' }
  },
  {
    id: 2,
    category: '精准农业',
    title: '智慧农业应用',
    description: '基于北斗的精准农业系统，实现自动化播种、施肥、收割',
    impact: '提高农业生产效率25%，节约成本20%',
    location: { lat: 45.7536, lng: 126.6480, city: '哈尔滨' }
  },
  {
    id: 3,
    category: '应急救援',
    title: '地震救援定位',
    description: '北斗短报文功能在地震等自然灾害中提供生命线通信',
    impact: '救援响应时间缩短40%，提高救援成功率',
    location: { lat: 30.6586, lng: 104.0647, city: '成都' }
  },
  {
    id: 4,
    category: '海洋渔业',
    title: '渔船安全监管',
    description: '北斗系统为远洋渔船提供定位、导航和通信服务',
    impact: '海上事故减少60%，渔业产值提升15%',
    location: { lat: 36.0671, lng: 120.3826, city: '青岛' }
  },
  {
    id: 5,
    category: '电力系统',
    title: '电网授时同步',
    description: '北斗高精度授时服务保障电力系统稳定运行',
    impact: '电网同步精度提升至纳秒级，故障率降低50%',
    location: { lat: 31.2304, lng: 121.4737, city: '上海' }
  }
];

// 新时代关键任务时间线（2012-2023）
export const newEraMissions = [
  {
    year: 2012,
    missions: [
      { name: '神舟九号', type: '载人航天', date: '2012-06-16', significance: '首次载人交会对接' }
    ]
  },
  {
    year: 2013,
    missions: [
      { name: '神舟十号', type: '载人航天', date: '2013-06-11', significance: '应用性飞行' },
      { name: '嫦娥三号', type: '月球探测', date: '2013-12-02', significance: '月面软着陆' }
    ]
  },
  {
    year: 2016,
    missions: [
      { name: '神舟十一号', type: '载人航天', date: '2016-10-17', significance: '中期驻留' },
      { name: '天宫二号', type: '空间站', date: '2016-09-15', significance: '空间实验室' }
    ]
  },
  {
    year: 2018,
    missions: [
      { name: '嫦娥四号', type: '月球探测', date: '2018-12-08', significance: '月背探测准备' }
    ]
  },
  {
    year: 2019,
    missions: [
      { name: '嫦娥四号着陆', type: '月球探测', date: '2019-01-03', significance: '月背首次软着陆' }
    ]
  },
  {
    year: 2020,
    missions: [
      { name: '天问一号', type: '火星探测', date: '2020-07-23', significance: '首次火星探测' },
      { name: '嫦娥五号', type: '月球探测', date: '2020-11-24', significance: '月球采样返回' }
    ]
  },
  {
    year: 2021,
    missions: [
      { name: '天和核心舱', type: '空间站', date: '2021-04-29', significance: '空间站建设开始' },
      { name: '祝融号着陆', type: '火星探测', date: '2021-05-15', significance: '火星车成功着陆' },
      { name: '神舟十二号', type: '载人航天', date: '2021-06-17', significance: '空间站首批航天员' }
    ]
  },
  {
    year: 2022,
    missions: [
      { name: '问天实验舱', type: '空间站', date: '2022-07-24', significance: '空间站扩展' },
      { name: '梦天实验舱', type: '空间站', date: '2022-10-31', significance: '空间站基本构型完成' }
    ]
  },
  {
    year: 2023,
    missions: [
      { name: '神舟十五号', type: '载人航天', date: '2022-11-29', significance: '常态化运营' },
      { name: '神舟十六号', type: '载人航天', date: '2023-05-30', significance: '科学家航天员' }
    ]
  }
];

// 国际合作项目数据
export const internationalCooperations = [
  {
    id: 1,
    project: '中俄月球科研站',
    partners: ['中国', '俄罗斯'],
    type: '月球探测',
    status: '规划中',
    description: '联合建设国际月球科研站',
    startYear: 2025,
    significance: '深化中俄航天合作，推进月球科学研究'
  },
  {
    id: 2,
    project: '中国空间站国际合作',
    partners: ['中国', '联合国外空司', '多国'],
    type: '空间站',
    status: '进行中',
    description: '向国际社会开放中国空间站',
    startYear: 2022,
    significance: '促进全球太空科学发展，体现大国担当'
  },
  {
    id: 3,
    project: '北斗全球服务',
    partners: ['中国', '一带一路国家'],
    type: '导航系统',
    status: '运行中',
    description: '为全球用户提供免费的基本导航服务',
    startYear: 2018,
    significance: '服务全球，造福人类，体现中国方案'
  },
  {
    id: 4,
    project: '中欧龙计划',
    partners: ['中国', '欧空局'],
    type: '空间科学',
    status: '完成',
    description: '双星计划与Cluster卫星联合观测',
    startYear: 2003,
    significance: '首次中欧大型空间科学合作项目'
  },
  {
    id: 5,
    project: '亚太空间合作组织',
    partners: ['中国', '亚太多国'],
    type: '区域合作',
    status: '运行中',
    description: '推动亚太地区空间技术发展',
    startYear: 2008,
    significance: '区域空间合作典范，共享发展成果'
  }
];

// 未来展望项目
export const futureMissions = [
  {
    name: '载人登月',
    timeline: '2030年前',
    description: '实现中国航天员登陆月球，建设月球科研基地',
    significance: '实现中华民族千年登月梦想',
    status: '研发中'
  },
  {
    name: '火星采样返回',
    timeline: '2028年',
    description: '天问三号任务，实现火星样品采集返回',
    significance: '深化火星科学研究，寻找生命迹象',
    status: '规划中'
  },
  {
    name: '木星系统探测',
    timeline: '2030年代',
    description: '探测木星及其卫星系统，寻找生命可能',
    significance: '拓展深空探测边界，探索生命起源',
    status: '论证中'
  },
  {
    name: '太阳系边际探测',
    timeline: '2040年代',
    description: '发射探测器到太阳系边缘，研究星际空间',
    significance: '人类探索宇宙的新里程碑',
    status: '概念研究'
  }
];