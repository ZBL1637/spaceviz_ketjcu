import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket, TrendingUp, Globe, Users, Loader2 } from 'lucide-react';
// 使用懒加载分割四个图表组件的代码体积，提升首屏渲染性能
const YearlyLaunchChart = lazy(() => import('./components/YearlyLaunchChart'));
const InteractiveTimeline = lazy(() => import('./components/InteractiveTimeline'));
const SpaceRaceChart = lazy(() => import('./components/SpaceRaceChart'));
const LaunchSiteHeatmap = lazy(() => import('./components/LaunchSiteHeatmap'));
import { loadSpaceData, processDataForCharts, getSpaceRaceData } from './lib/dataUtils';
import './App.css';
import AnimatedNumber from './components/AnimatedNumber';
import Navigation from './components/Navigation';
import ChinaSpaceExploration from './components/ChinaSpaceExploration';

/**
 * useOnScreen
 * 使用 IntersectionObserver 观察元素是否进入视口，并返回可见状态
 * @param {React.RefObject} ref - 需要观察的元素引用
 * @param {string} rootMargin - 触发阈值的外边距，用于提前或延后加载
 * @returns {boolean} 是否在视口中
 */
function useOnScreen(ref, rootMargin = '0px 0px -120px 0px') {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
        }
      },
      { root: null, rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isIntersecting;
}

/**
 * ChartSkeleton
 * 图表加载占位骨架，确保懒加载时版式稳定，避免布局跳动
 * @param {object} props
 * @param {number} props.height - 占位高度
 * @returns {JSX.Element}
 */
function ChartSkeleton({ height = 360 }) {
  return (
    <div className="chart-container rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="h-6 w-40 bg-gray-800/60 backdrop-blur-md rounded mb-4 animate-pulse" />
        <div className="h-4 w-64 bg-gray-700/60 backdrop-blur-md rounded mb-6 animate-pulse" />
        <div className="w-full rounded bg-gray-700/60 backdrop-blur-md animate-pulse" style={{ height }} />
      </div>
    </div>
  );
}

/**
 * LazySection
 * 可见时才渲染子内容的分区容器，结合 Suspense 提升性能
 * @param {object} props
 * @param {string} props.id - 分区锚点 id
 * @param {JSX.Element} props.children - 需要延迟渲染的内容
 * @param {number} props.minHeight - 分区最小高度，防止抖动
 * @param {string} props.rootMargin - 视口提前量
 * @returns {JSX.Element}
 */
function LazySection({ id, children, minHeight = 400, rootMargin = '0px 0px -120px 0px' }) {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref, rootMargin);

  return (
    <section id={id} ref={ref} className="section-block py-8">
      {onScreen ? (
        <Suspense fallback={<ChartSkeleton height={minHeight} />}>{children}</Suspense>
      ) : (
        <ChartSkeleton height={minHeight} />
      )}
    </section>
  );
}

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
      {/* 导航栏 */}
      <Navigation />
      
      {/* 头部区域 */}
      <div className="relative overflow-hidden pt-16">
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
              <div className="text-2xl font-bold">
                <AnimatedNumber 
                  value={totalMissions} 
                  formatter={(val) => Math.round(val).toLocaleString()}
                  duration={800}
                  delay={100}
                />
              </div>
              <div className="text-sm text-blue-200">总任务数</div>
            </div>
            <div className="stat-card rounded-lg p-4">
              <Rocket className="w-8 h-8 mx-auto mb-2 text-blue-300" />
              <div className="text-2xl font-bold">
                <AnimatedNumber 
                  value={successfulMissions} 
                  formatter={(val) => Math.round(val).toLocaleString()}
                  duration={800}
                  delay={200}
                />
              </div>
              <div className="text-sm text-blue-200">成功任务</div>
            </div>
            <div className="stat-card rounded-lg p-4">
              <Users className="w-8 h-8 mx-auto mb-2 text-purple-300" />
              <div className="text-2xl font-bold">
                <AnimatedNumber 
                  value={uniqueCompanies} 
                  duration={800}
                  delay={300}
                />
              </div>
              <div className="text-sm text-blue-200">参与机构</div>
            </div>
            <div className="stat-card rounded-lg p-4">
              <Globe className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold">
                <AnimatedNumber 
                  value={uniqueLocations} 
                  duration={800}
                  delay={400}
                />
              </div>
              <div className="text-sm text-blue-200">发射地点</div>
            </div>
          </div>
        </div>
      </div>

      {/* 已移除锚点导航（原使用 ul 列表）。根据需求完全删除该元素及相关功能。 */}

      {/* 单页分区内容 */}
      <div className="container mx-auto px-4 py-8 space-y-10">
        {/* 概览统计 */}
        <section id="overview" className="section-block">
          {/* 分区小标题：总览统计 */}
          <h2 className="section-subtitle">一、总览统计</h2>
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
                <div className="text-center p-4 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-lg card-hover">
                  <div className="text-3xl font-bold text-blue-400">
                    <AnimatedNumber 
                      value={((successfulMissions / totalMissions) * 100).toFixed(1)} 
                      suffix="%"
                      duration={1000}
                      delay={500}
                      enableCountUp={true}
                    />
                  </div>
                  <div className="text-sm text-blue-300">总体成功率</div>
                </div>
                <div className="text-center p-4 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-lg card-hover">
                  <div className="text-3xl font-bold text-green-400">
                    <AnimatedNumber 
                      value={67} 
                      duration={1000}
                      delay={600}
                    />
                  </div>
                  <div className="text-sm text-green-300">探索年数</div>
                </div>
                <div className="text-center p-4 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-lg card-hover">
                  <div className="text-3xl font-bold text-purple-400">
                    <AnimatedNumber 
                      value={Math.max(...processedData.yearlyData.map(d => d.total))} 
                      duration={1000}
                      delay={700}
                    />
                  </div>
                  <div className="text-sm text-purple-300">年度最高发射数</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="card-hover mt-6">
            <Suspense fallback={<ChartSkeleton height={360} />}>
              <YearlyLaunchChart data={processedData.yearlyData} />
            </Suspense>
          </div>

          <Card className="chart-container card-hover mt-6">
            <CardHeader>
              <CardTitle>关键里程碑</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-lg card-hover">
                  <Badge variant="secondary" className="bg-red-900/60 text-red-300 border-red-700/50">1957</Badge>
                  <span className="text-gray-200">苏联发射人类第一颗人造卫星斯普特尼克1号</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-lg card-hover">
                  <Badge variant="secondary" className="bg-blue-900/60 text-blue-300 border-blue-700/50">1969</Badge>
                  <span className="text-gray-200">阿波罗11号实现人类首次登月</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-lg card-hover">
                  <Badge variant="secondary" className="bg-green-900/60 text-green-300 border-green-700/50">2002</Badge>
                  <span className="text-gray-200">SpaceX成立，开启商业航天新时代</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-lg card-hover">
                  <Badge variant="secondary" className="bg-purple-900/60 text-purple-300 border-purple-700/50">2015</Badge>
                  <span className="text-gray-200">SpaceX首次成功回收火箭，实现可重复使用</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 交互时间线 */}
        <LazySection id="timeline" minHeight={420}>
          {/* 分区小标题：交互时间线 */}
          <h2 className="section-subtitle">二、交互时间线</h2>
          <div className="card-hover">
            <InteractiveTimeline data={spaceData} yearlyData={processedData.yearlyData} />
          </div>
        </LazySection>

        {/* 太空竞赛 */}
        <LazySection id="race" minHeight={420}>
          {/* 分区小标题：太空竞赛 */}
          <h2 className="section-subtitle">三、太空竞赛</h2>
          <div className="card-hover">
            <SpaceRaceChart data={processedData.spaceRaceData} />
          </div>
        </LazySection>

        {/* 发射地点 */}
        <LazySection id="locations" minHeight={420}>
          {/* 分区小标题：发射地点 */}
          <h2 className="section-subtitle">四、发射地点</h2>
          <div className="card-hover">
            <LaunchSiteHeatmap data={processedData.locationData} />
          </div>
        </LazySection>

        {/* 中国太空探索模块 */}
        <LazySection id="china-space" minHeight={420}>
          {/* 分区小标题：中国太空探索 */}
          <h2 className="section-subtitle">五、中国太空探索</h2>
          <div className="card-hover">
            <ChinaSpaceExploration />
          </div>
        </LazySection>
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
