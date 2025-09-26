import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket, TrendingUp, Globe, Users, Loader2 } from 'lucide-react';
import YearlyLaunchChart from './components/YearlyLaunchChart';
import InteractiveTimeline from './components/InteractiveTimeline';
import SpaceRaceChart from './components/SpaceRaceChart';
import LaunchSiteHeatmap from './components/LaunchSiteHeatmap';
import { loadSpaceData, processDataForCharts, getSpaceRaceData } from './lib/dataUtils';
import './App.css';

function App() {
  const [spaceData, setSpaceData] = useState([]);
  const [processedData, setProcessedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await loadSpaceData();
        if (data.length === 0) {
          throw new Error('无法加载数据');
        }
        setSpaceData(data);
        
        const processed = processDataForCharts(data);
        const spaceRaceData = getSpaceRaceData(data);
        
        setProcessedData({
          ...processed,
          spaceRaceData
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center text-white">
          <div className="float-animation mb-6">
            <Rocket className="w-16 h-16 mx-auto text-blue-300" />
          </div>
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-blue-300" />
          <h2 className="text-2xl font-bold mb-2">加载太空探索数据中...</h2>
          <p className="text-blue-200">正在准备历史数据可视化</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">数据加载失败</h2>
          <p className="text-blue-200">{error}</p>
        </div>
      </div>
    );
  }

  const totalMissions = spaceData.length;
  const successfulMissions = spaceData.filter(m => m['Status Mission Simplified'] === 'Success').length;
  const uniqueCompanies = new Set(spaceData.map(m => m['Company Name'])).size;
  const uniqueLocations = new Set(spaceData.map(m => m.Location)).size;

  return (
    <div className="min-h-screen gradient-bg">
      {/* 头部区域 */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 py-16 text-center text-white">
          <div className="flex items-center justify-center mb-6">
            <div className="float-animation mr-4">
              <Rocket className="w-12 h-12 text-blue-300" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent responsive-text-2xl">
              机器的崛起
            </h1>
          </div>
          <h2 className="text-3xl font-semibold mb-4 responsive-text-xl">太空探索历史可视化</h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed responsive-text-lg">
            从冷战时期的太空竞赛到如今商业航天公司的崛起，探索人类征服星辰大海的壮阔历程
          </p>
          
          {/* 统计概览 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            <div className="stat-card rounded-lg p-4">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-300" />
              <div className="text-2xl font-bold">{totalMissions.toLocaleString()}</div>
              <div className="text-sm text-blue-200">总任务数</div>
            </div>
            <div className="stat-card rounded-lg p-4">
              <Rocket className="w-8 h-8 mx-auto mb-2 text-blue-300" />
              <div className="text-2xl font-bold">{successfulMissions.toLocaleString()}</div>
              <div className="text-sm text-blue-200">成功任务</div>
            </div>
            <div className="stat-card rounded-lg p-4">
              <Users className="w-8 h-8 mx-auto mb-2 text-purple-300" />
              <div className="text-2xl font-bold">{uniqueCompanies}</div>
              <div className="text-sm text-blue-200">参与机构</div>
            </div>
            <div className="stat-card rounded-lg p-4">
              <Globe className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold">{uniqueLocations}</div>
              <div className="text-sm text-blue-200">发射地点</div>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger 
              value="overview" 
              className="tabs-trigger text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 button-hover"
            >
              总览统计
            </TabsTrigger>
            <TabsTrigger 
              value="timeline" 
              className="tabs-trigger text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 button-hover"
            >
              交互时间线
            </TabsTrigger>
            <TabsTrigger 
              value="race" 
              className="tabs-trigger text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 button-hover"
            >
              太空竞赛
            </TabsTrigger>
            <TabsTrigger 
              value="locations" 
              className="tabs-trigger text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 button-hover"
            >
              发射地点
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="chart-container card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  历史发展概览
                </CardTitle>
                <CardDescription>
                  全面展示人类太空探索活动的历史趋势和成就
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg card-hover">
                    <div className="text-3xl font-bold text-blue-600">
                      {((successfulMissions / totalMissions) * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-blue-800">总体成功率</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg card-hover">
                    <div className="text-3xl font-bold text-green-600">67</div>
                    <div className="text-sm text-green-800">探索年数</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg card-hover">
                    <div className="text-3xl font-bold text-purple-600">
                      {Math.max(...processedData.yearlyData.map(d => d.total))}
                    </div>
                    <div className="text-sm text-purple-800">年度最高发射数</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="card-hover">
              <YearlyLaunchChart data={processedData.yearlyData} />
            </div>
            
            <Card className="chart-container card-hover">
              <CardHeader>
                <CardTitle>关键里程碑</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-red-50 rounded-lg card-hover">
                    <Badge variant="secondary" className="bg-red-100 text-red-800">1957</Badge>
                    <span>苏联发射人类第一颗人造卫星斯普特尼克1号</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg card-hover">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">1969</Badge>
                    <span>阿波罗11号实现人类首次登月</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg card-hover">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">2002</Badge>
                    <span>SpaceX成立，开启商业航天新时代</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg card-hover">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">2015</Badge>
                    <span>SpaceX首次成功回收火箭，实现可重复使用</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <div className="card-hover">
              <InteractiveTimeline data={spaceData} yearlyData={processedData.yearlyData} />
            </div>
          </TabsContent>

          <TabsContent value="race">
            <div className="card-hover">
              <SpaceRaceChart data={processedData.spaceRaceData} />
            </div>
          </TabsContent>

          <TabsContent value="locations">
            <div className="card-hover">
              <LaunchSiteHeatmap data={processedData.locationData} />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 页脚 */}
      <footer className="bg-black/20 backdrop-blur-sm text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-blue-200">
            数据来源：Kaggle - All Space Missions from 1957 | 
            可视化展示人类太空探索的辉煌历程
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <Badge variant="secondary" className="bg-white/10 text-white">
              React + Recharts
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white">
              Tailwind CSS
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white">
              shadcn/ui
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
