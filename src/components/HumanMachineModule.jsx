import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { internationalCooperations } from '../lib/chinaSpaceData';
import { 
  Brain, 
  Cpu, 
  Globe, 
  Users, 
  Heart, 
  Lightbulb, 
  Rocket, 
  Satellite,
  Network,
  Handshake,
  Star,
  Zap,
  Target,
  ChevronRight,
  Quote,
  Sparkles,
  Earth,
  Moon,
  TrendingUp,
  Eye,
  Shield
} from 'lucide-react';

/**
 * 机器与人类思想性升华模块
 * 探讨AI、机器人在太空探索中的未来以及中国的国际合作贡献
 */
const HumanMachineModule = () => {
  const [activeSection, setActiveSection] = useState('future');
  const [selectedCooperation, setSelectedCooperation] = useState(null);
  const [animationStep, setAnimationStep] = useState(0);

  // 未来技术发展方向
  const futureTechnologies = [
    {
      id: 1,
      name: '智能机器人',
      icon: Cpu,
      description: '具备自主决策能力的太空探索机器人',
      applications: ['月球基地建设', '火星地质勘探', '深空维修任务', '危险环境作业'],
      advantages: ['24小时工作', '极端环境适应', '精确操作', '数据实时传输'],
      chinaProgress: '天问一号火星车、嫦娥系列月球车技术积累',
      color: '#3b82f6'
    },
    {
      id: 2,
      name: '人工智能',
      icon: Brain,
      description: '深度学习驱动的太空任务智能决策系统',
      applications: ['轨道优化计算', '故障预测诊断', '资源配置管理', '科学数据分析'],
      advantages: ['快速决策', '模式识别', '预测分析', '自主学习'],
      chinaProgress: '北斗智能导航、天宫空间站智能管理系统',
      color: '#8b5cf6'
    },
    {
      id: 3,
      name: '生物技术',
      icon: Heart,
      description: '支持长期太空生存的生命保障技术',
      applications: ['太空农业', '生命维持系统', '医疗诊断', '心理健康监测'],
      advantages: ['生态循环', '健康保障', '食物自给', '环境适应'],
      chinaProgress: '天宫空间站生命科学实验、太空育种技术',
      color: '#10b981'
    },
    {
      id: 4,
      name: '量子通信',
      icon: Network,
      description: '基于量子纠缠的超安全太空通信网络',
      applications: ['深空通信', '数据加密传输', '导航增强', '科学数据共享'],
      advantages: ['绝对安全', '超远距离', '高速传输', '抗干扰'],
      chinaProgress: '墨子号量子卫星、量子通信地面站网络',
      color: '#f59e0b'
    }
  ];

  // 中国方案和贡献
  const chinaContributions = [
    {
      title: '开放共享的北斗系统',
      description: '向全球免费提供基础服务，已服务200多个国家和地区',
      impact: '促进全球数字经济发展，助力"一带一路"建设',
      icon: Globe,
      color: '#3b82f6'
    },
    {
      title: '国际空间站合作',
      description: '天宫空间站向国际社会开放，已接受多国科学实验项目',
      impact: '推动太空科学研究国际化，共享科技发展成果',
      icon: Satellite,
      color: '#10b981'
    },
    {
      title: '月球科研站计划',
      description: '与俄罗斯等国合作建设国际月球科研站',
      impact: '为人类月球探索提供长期科研平台',
      icon: Moon,
      color: '#f59e0b'
    },
    {
      title: '太空技术转移',
      description: '向发展中国家提供卫星技术和发射服务',
      impact: '缩小数字鸿沟，促进全球均衡发展',
      icon: Rocket,
      color: '#ef4444'
    }
  ];

  // 人类命运共同体理念
  const communityVision = [
    {
      principle: '和平利用太空',
      description: '坚持太空探索为全人类服务，反对太空军事化',
      examples: ['签署《外空条约》', '推动太空法治建设', '倡导太空非军事化']
    },
    {
      principle: '合作共赢',
      description: '通过国际合作实现太空探索成果共享',
      examples: ['多国联合任务', '技术标准统一', '数据开放共享']
    },
    {
      principle: '可持续发展',
      description: '注重太空环境保护，推动可持续太空活动',
      examples: ['太空垃圾治理', '轨道资源管理', '环境影响评估']
    },
    {
      principle: '包容发展',
      description: '帮助发展中国家参与太空活动，缩小太空能力差距',
      examples: ['技术援助项目', '人才培养计划', '基础设施建设']
    }
  ];

  /**
   * 动画效果控制
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  /**
   * 渲染未来技术展望
   */
  const renderFutureTechnologies = () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">机器智能：太空探索的未来</h3>
          <p className="text-gray-300 max-w-4xl mx-auto">
            人工智能、机器人技术将成为未来太空探索的核心驱动力，中国正在这些关键领域积极布局，
            为人类太空事业贡献智慧和力量。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {futureTechnologies.map(tech => {
            const IconComponent = tech.icon;
            
            return (
              <Card 
                key={tech.id}
                className="bg-gray-800/50 backdrop-blur-md border-gray-600 hover:border-blue-500 transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center">
                    <IconComponent 
                      className="w-6 h-6 mr-3" 
                      style={{ color: tech.color }}
                    />
                    {tech.name}
                  </CardTitle>
                  <p className="text-gray-300 text-sm">{tech.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h5 className="text-white font-medium mb-2">应用领域</h5>
                    <div className="grid grid-cols-2 gap-1">
                      {tech.applications.map((app, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-medium mb-2">技术优势</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {tech.advantages.map((advantage, index) => (
                        <li key={index} className="flex items-start">
                          <ChevronRight className="w-3 h-3 text-green-400 mr-1 mt-0.5 flex-shrink-0" />
                          {advantage}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-600">
                    <h5 className="text-blue-300 font-medium mb-2">中国进展</h5>
                    <p className="text-gray-300 text-sm">{tech.chinaProgress}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 技术融合展望 */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-md border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center">
              <Sparkles className="w-6 h-6 text-purple-400 mr-3" />
              技术融合：智能太空时代
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <Cpu className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">智能决策</h4>
                <p className="text-gray-300 text-sm">
                  AI系统实时分析太空环境，自主制定最优探索策略
                </p>
              </div>
              <div className="text-center">
                <Eye className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">感知融合</h4>
                <p className="text-gray-300 text-sm">
                  多传感器数据融合，构建全方位太空态势感知能力
                </p>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">安全保障</h4>
                <p className="text-gray-300 text-sm">
                  智能风险评估和应急响应，确保太空任务安全可靠
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  /**
   * 渲染中国方案
   */
  const renderChinaSolutions = () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">中国方案：构建人类命运共同体</h3>
          <p className="text-gray-300 max-w-4xl mx-auto">
            中国不仅提升自身太空实力，更致力于为全球太空治理提供"中国方案"，
            推动构建太空领域人类命运共同体。
          </p>
        </div>

        {/* 中国贡献 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chinaContributions.map((contribution, index) => {
            const IconComponent = contribution.icon;
            
            return (
              <Card 
                key={index}
                className="bg-gray-800/50 backdrop-blur-md border-gray-600 hover:border-blue-500 transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center">
                    <IconComponent 
                      className="w-6 h-6 mr-3" 
                      style={{ color: contribution.color }}
                    />
                    {contribution.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-gray-300 text-sm">{contribution.description}</p>
                  <div className="pt-2 border-t border-gray-600">
                    <h5 className="text-blue-300 font-medium mb-1">全球影响</h5>
                    <p className="text-gray-300 text-sm">{contribution.impact}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 人类命运共同体理念 */}
        <Card className="bg-gradient-to-r from-red-900/30 to-yellow-900/30 backdrop-blur-md border-red-500/30">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Earth className="w-8 h-8 text-blue-400 mr-4" />
              太空领域人类命运共同体
            </CardTitle>
            <p className="text-gray-300">
              中国倡导的太空治理理念，为全人类太空事业发展指明方向
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communityVision.map((vision, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="text-yellow-300 font-semibold text-lg">
                    {vision.principle}
                  </h4>
                  <p className="text-gray-300 text-sm">{vision.description}</p>
                  <div>
                    <h5 className="text-white font-medium mb-2">实践举措</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {vision.examples.map((example, idx) => (
                        <li key={idx} className="flex items-start">
                          <ChevronRight className="w-3 h-3 text-green-400 mr-1 mt-0.5 flex-shrink-0" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  /**
   * 渲染国际合作网络
   */
  const renderCooperationNetwork = () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">国际合作网络</h3>
          <p className="text-gray-300 max-w-4xl mx-auto">
            中国积极参与国际太空合作，与多个国家和国际组织建立伙伴关系，
            共同推进人类太空探索事业。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {internationalCooperations.map(coop => (
            <Card 
              key={coop.id}
              className={`bg-gray-800/50 backdrop-blur-md border-gray-600 cursor-pointer transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 ${
                selectedCooperation?.id === coop.id ? 'border-blue-500 shadow-lg shadow-blue-500/20' : ''
              }`}
              onClick={() => setSelectedCooperation(selectedCooperation?.id === coop.id ? null : coop)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-base flex items-center">
                  <Handshake className="w-5 h-5 text-blue-400 mr-3" />
                  {coop.project}
                </CardTitle>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                    {coop.partner}
                  </Badge>
                  <Badge variant="outline" className="text-gray-300">
                    {coop.year}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-300 text-sm mb-3">{coop.description}</p>
                
                {selectedCooperation?.id === coop.id && (
                  <div className="space-y-3 border-t border-gray-600 pt-3">
                    <div>
                      <h5 className="text-white font-medium mb-2">合作成果</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {coop.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="w-3 h-3 text-green-400 mr-1 mt-0.5 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">合作领域：</span>
                      <span className="text-white">{coop.field}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">项目状态：</span>
                      <Badge 
                        variant="outline" 
                        className={coop.status === 'ongoing' ? 'text-green-400 border-green-400' : 'text-blue-400 border-blue-400'}
                      >
                        {coop.status === 'ongoing' ? '进行中' : '已完成'}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  /**
   * 渲染结语展望
   */
  const renderConclusion = () => {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-md border-purple-500/30">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <Quote className="w-16 h-16 text-purple-400 mx-auto" />
              
              <blockquote className="text-2xl font-bold text-white leading-relaxed">
                "中国的机器正书写太空新历史，我们每个人都是见证者"
              </blockquote>
              
              <div className="max-w-4xl mx-auto space-y-4 text-gray-300">
                <p className="text-lg">
                  从东方红一号的第一声太空之音，到北斗系统服务全球，从嫦娥奔月的千年梦想，
                  到天宫空间站的现实辉煌，中国太空探索走过了不平凡的历程。
                </p>
                
                <p className="text-lg">
                  在新时代的征程中，中国不仅要成为太空强国，更要成为太空合作的倡导者、
                  太空治理的参与者、太空福祉的贡献者。我们相信，通过国际合作与技术创新，
                  人类必将在浩瀚宇宙中书写更加辉煌的篇章。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 未来展望 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-red-600/20 to-pink-600/20 backdrop-blur-md border-red-500/30">
            <CardContent className="p-6 text-center">
              <Moon className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h4 className="text-white font-bold text-lg mb-2">载人登月</h4>
              <p className="text-gray-300 text-sm">
                2030年前实现中国人首次登陆月球，建设月球科研基地
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-md border-orange-500/30">
            <CardContent className="p-6 text-center">
              <Globe className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h4 className="text-white font-bold text-lg mb-2">火星采样返回</h4>
              <p className="text-gray-300 text-sm">
                天问三号任务将实现火星样品采集返回，推进深空探测
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-md border-purple-500/30">
            <CardContent className="p-6 text-center">
              <Star className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h4 className="text-white font-bold text-lg mb-2">深空探测</h4>
              <p className="text-gray-300 text-sm">
                木星系统探测、小行星采样等任务，拓展人类认知边界
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 号召行动 */}
        <Card className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-md border-blue-500/30">
          <CardContent className="p-8 text-center">
            <Rocket className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">探索永无止境</h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
              太空探索是全人类的共同事业，需要每一个人的关注和支持。
              让我们携手并进，为构建太空领域人类命运共同体贡献力量，
              共同开创人类太空探索的美好未来！
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Users className="w-4 h-4 mr-2" />
                关注太空事业
              </Button>
              <Button variant="outline" className="text-white border-gray-600 hover:bg-gray-700">
                <Heart className="w-4 h-4 mr-2" />
                支持科学探索
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-md border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white text-2xl flex items-center">
            <Brain className="w-8 h-8 text-purple-400 mr-4" />
            机器与人类：思想性升华
          </CardTitle>
          <p className="text-gray-300 text-lg">
            探讨人工智能与机器人技术在太空探索中的未来，以及中国如何通过太空合作促进人类命运共同体建设
          </p>
        </CardHeader>
      </Card>

      {/* 标签页导航 */}
      <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 backdrop-blur-md">
          <TabsTrigger value="future" className="text-white data-[state=active]:bg-purple-600">
            未来技术
          </TabsTrigger>
          <TabsTrigger value="china" className="text-white data-[state=active]:bg-purple-600">
            中国方案
          </TabsTrigger>
          <TabsTrigger value="cooperation" className="text-white data-[state=active]:bg-purple-600">
            国际合作
          </TabsTrigger>
          <TabsTrigger value="conclusion" className="text-white data-[state=active]:bg-purple-600">
            结语展望
          </TabsTrigger>
        </TabsList>

        <TabsContent value="future" className="mt-6">
          {renderFutureTechnologies()}
        </TabsContent>

        <TabsContent value="china" className="mt-6">
          {renderChinaSolutions()}
        </TabsContent>

        <TabsContent value="cooperation" className="mt-6">
          {renderCooperationNetwork()}
        </TabsContent>

        <TabsContent value="conclusion" className="mt-6">
          {renderConclusion()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HumanMachineModule;