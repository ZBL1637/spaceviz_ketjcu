import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  chinaMilestones, 
  beidouApplications
} from '../lib/chinaSpaceData';
import { Rocket, Satellite, Globe, Star, TrendingUp, Users, Calendar, MapPin } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';
import BeidouInteractiveMap from './BeidouInteractiveMap';
import HumanMachineModule from './HumanMachineModule';

/**
 * 中国太空探索主组件
 * 展示从东方红一号到北斗系统的发展历程
 */
const ChinaSpaceExploration = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedYear, setSelectedYear] = useState(2023);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  /**
   * 渲染关键里程碑时间线
   */
  const renderMilestoneTimeline = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">中国太空探索关键里程碑</h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            从1970年东方红一号卫星发射成功，到如今的北斗全球组网、天宫空间站建设，
            中国太空探索走过了从无到有、从弱到强的辉煌历程。
          </p>
        </div>
        
        <div className="relative">
          {/* 时间线主轴 */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-500 to-red-500"></div>
          
          {chinaMilestones.map((milestone, index) => (
            <div key={milestone.id} className={`relative flex items-start mb-8 ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`} style={{ animationDelay: `${index * 0.2}s` }}>
              {/* 时间点 */}
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-gray-800 shadow-lg">
                <span className="text-white font-bold text-sm">{milestone.year}</span>
              </div>
              
              {/* 内容卡片 */}
              <div className="ml-6 flex-1">
                <Card className="bg-gray-900/60 backdrop-blur-md border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{milestone.mission}</CardTitle>
                      <Badge variant="outline" className="text-blue-400 border-blue-400">
                        {milestone.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-3">{milestone.description}</p>
                    <div className="flex items-center text-sm text-gray-400">
                      <Star className="w-4 h-4 mr-2 text-yellow-400" />
                      <span className="font-medium">重要意义：</span>
                      <span className="ml-2">{milestone.significance}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /**
   * 渲染统计概览
   */
  const renderOverviewStats = () => {
    const currentYear = new Date().getFullYear();
    const totalMissions = chinaMilestones.length;
    const recentMissions = chinaMilestones.filter(m => m.year >= 2012).length;
    const successRate = 95.8; // 模拟数据

    // 调试日志 - 使用更明显的标识
    console.log('🚀🚀🚀 中国太空探索统计数据调试 🚀🚀🚀');
    console.log('chinaMilestones数组:', chinaMilestones);
    console.log('chinaMilestones长度:', chinaMilestones.length);
    console.log('totalMissions:', totalMissions);
    console.log('recentMissions:', recentMissions);
    console.log('currentYear:', currentYear);
    console.log('探索历程年数:', currentYear - 1970);
    console.log('successRate:', successRate);
    console.log('🚀🚀🚀 中国太空探索调试结束 🚀🚀🚀');

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-md border-blue-500/30">
          <CardContent className="p-6 text-center">
            <Rocket className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-2">
              <AnimatedNumber value={totalMissions} duration={2000} />
            </div>
            <p className="text-gray-300 text-sm">重大任务总数</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600/20 to-blue-600/20 backdrop-blur-md border-green-500/30">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-2">
              <AnimatedNumber value={recentMissions} duration={2000} />
            </div>
            <p className="text-gray-300 text-sm">新时代任务数</p>
            <p className="text-xs text-gray-400">(2012年至今)</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-md border-purple-500/30">
          <CardContent className="p-6 text-center">
            <Satellite className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-2">
              <AnimatedNumber value={successRate} duration={2000} suffix="%" />
            </div>
            <p className="text-gray-300 text-sm">任务成功率</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-md border-orange-500/30">
          <CardContent className="p-6 text-center">
            <Globe className="w-8 h-8 text-orange-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-2">
              <AnimatedNumber value={currentYear - 1970} duration={2000} />
            </div>
            <p className="text-gray-300 text-sm">探索历程</p>
            <p className="text-xs text-gray-400">年</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  /**
   * 渲染思想性内容
   */
  const renderPhilosophicalContent = () => {
    return (
      <Card className="bg-gradient-to-r from-gray-900/80 to-blue-900/60 backdrop-blur-md border-blue-500/30 mb-8">
        <CardHeader>
          <CardTitle className="text-white text-xl flex items-center">
            <Star className="w-6 h-6 text-yellow-400 mr-3" />
            独立自主·创新超越
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-gray-300">
            <p className="text-lg leading-relaxed">
              中国太空探索体现了<span className="text-blue-400 font-semibold">"独立自主、创新超越"</span>的民族精神。
              从东方红一号的一鸣惊人，到北斗系统的全球组网，每一步都彰显着中华民族的智慧与坚韧。
            </p>
            <p className="leading-relaxed">
              北斗导航系统作为<span className="text-purple-400 font-semibold">"国之重器"</span>，
              不仅服务于国家安全和经济发展，更向全世界提供高精度定位服务，
              体现了中国"构建人类命运共同体"的理念和担当。
            </p>
            <div className="bg-blue-900/30 rounded-lg p-4 border-l-4 border-blue-400">
              <p className="italic">
                "探索浩瀚宇宙，发展航天事业，建设航天强国，是我们不懈追求的航天梦。"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 py-12">
      <div className="container mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            中国太空探索的崛起
          </h1>
          <h2 className="text-2xl md:text-3xl text-blue-300 mb-6">
            从东方红到北斗
          </h2>
          <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed">
            见证中华民族从太空探索的起步者到领跑者的辉煌历程，
            感受"中国速度"与"中国智慧"在浩瀚星空中的完美融合。
          </p>
        </div>

        {/* 统计概览 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4 text-center">统计概览</h3>
          {renderOverviewStats()}
        </div>

        {/* 思想性内容 */}
        {renderPhilosophicalContent()}

        {/* 主要内容标签页 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 backdrop-blur-md">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-blue-600">
              发展历程
            </TabsTrigger>
            <TabsTrigger value="beidou" className="text-white data-[state=active]:bg-blue-600">
              北斗专题
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            {renderMilestoneTimeline()}
          </TabsContent>

          <TabsContent value="beidou" className="mt-8">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">北斗导航系统专题</h3>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  北斗系统是中国自主建设的全球卫星导航系统，为全球用户提供全天候、全天时、高精度的定位、导航和授时服务。
                </p>
              </div>
              <BeidouInteractiveMap />
            </div>
          </TabsContent>
        </Tabs>

        {/* 机器与人类思想性升华模块 */}
        <HumanMachineModule />
      </div>
    </div>
  );
};

export default ChinaSpaceExploration;