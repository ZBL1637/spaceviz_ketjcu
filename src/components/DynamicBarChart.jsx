import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { satelliteLaunchComparison, mannedMissionComparison } from '../lib/chinaSpaceData';
import { Play, Pause, RotateCcw, TrendingUp, Rocket, Users } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';

/**
 * 动态条形图组件
 * 展示中美俄在卫星发射和载人任务方面的对比
 */
const DynamicBarChart = () => {
  const [currentYear, setCurrentYear] = useState(1970);
  const [isPlaying, setIsPlaying] = useState(false);
  const [chartType, setChartType] = useState('satellites'); // 'satellites' or 'manned'
  const [animationSpeed, setAnimationSpeed] = useState(500);
  const intervalRef = useRef(null);

  const maxYear = 2023;
  const minYear = 1970;

  // 获取当前数据
  const getCurrentData = () => {
    const data = chartType === 'satellites' ? satelliteLaunchComparison : mannedMissionComparison;
    return data.filter(item => item.year <= currentYear);
  };

  // 计算累计数据
  const getCumulativeData = () => {
    const data = getCurrentData();
    const countries = ['中国', '美国', '俄罗斯'];
    
    return countries.map(country => {
      const countryData = data.filter(item => item.country === country);
      const total = countryData.reduce((sum, item) => sum + item.count, 0);
      const latestYear = Math.max(...countryData.map(item => item.year), minYear);
      const recentGrowth = countryData
        .filter(item => item.year >= currentYear - 5)
        .reduce((sum, item) => sum + item.count, 0);
      
      return {
        country,
        total,
        latestYear,
        recentGrowth,
        color: country === '中国' ? '#ef4444' : 
               country === '美国' ? '#3b82f6' : '#10b981'
      };
    });
  };

  // 获取年度数据
  const getYearlyData = () => {
    const data = chartType === 'satellites' ? satelliteLaunchComparison : mannedMissionComparison;
    const yearData = data.filter(item => item.year === currentYear);
    const countries = ['中国', '美国', '俄罗斯'];
    
    return countries.map(country => {
      const countryYearData = yearData.find(item => item.country === country);
      return {
        country,
        count: countryYearData ? countryYearData.count : 0,
        color: country === '中国' ? '#ef4444' : 
               country === '美国' ? '#3b82f6' : '#10b981'
      };
    });
  };

  // 动画控制
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentYear(prev => {
          if (prev >= maxYear) {
            setIsPlaying(false);
            return maxYear;
          }
          return prev + 1;
        });
      }, animationSpeed);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, animationSpeed, maxYear]);

  // 重置动画
  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentYear(minYear);
  };

  // 切换播放状态
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  /**
   * 渲染条形图
   */
  const renderBarChart = (data, maxValue, title) => {
    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white text-center">{title}</h4>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={item.country} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">{item.country}</span>
                <span className="text-gray-300">
                  <AnimatedNumber 
                    value={item.total || item.count} 
                    duration={300}
                  />
                </span>
              </div>
              <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-3"
                  style={{
                    width: `${((item.total || item.count) / maxValue) * 100}%`,
                    backgroundColor: item.color,
                    boxShadow: `0 0 20px ${item.color}40`
                  }}
                >
                  {((item.total || item.count) / maxValue) > 0.1 && (
                    <span className="text-white text-sm font-bold">
                      {item.total || item.count}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /**
   * 渲染统计卡片
   */
  const renderStatsCards = () => {
    const cumulativeData = getCumulativeData();
    const chinaData = cumulativeData.find(item => item.country === '中国');
    const totalMissions = cumulativeData.reduce((sum, item) => sum + item.total, 0);
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-red-600/20 to-pink-600/20 backdrop-blur-md border-red-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">
              <AnimatedNumber value={chinaData?.total || 0} duration={1000} />
            </div>
            <p className="text-gray-300 text-sm">中国累计</p>
            <p className="text-xs text-gray-400">
              {chartType === 'satellites' ? '卫星发射' : '载人任务'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-md border-blue-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">
              <AnimatedNumber value={totalMissions} duration={1000} />
            </div>
            <p className="text-gray-300 text-sm">全球总计</p>
            <p className="text-xs text-gray-400">三国合计</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600/20 to-teal-600/20 backdrop-blur-md border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">
              <AnimatedNumber value={chinaData?.recentGrowth || 0} duration={1000} />
            </div>
            <p className="text-gray-300 text-sm">近5年增长</p>
            <p className="text-xs text-gray-400">中国表现</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const cumulativeData = getCumulativeData();
  const yearlyData = getYearlyData();
  const maxCumulative = Math.max(...cumulativeData.map(item => item.total));
  const maxYearly = Math.max(...yearlyData.map(item => item.count), 1);

  return (
    <div className="space-y-6">
      {/* 标题和控制面板 */}
      <Card className="bg-gray-900/60 backdrop-blur-md border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-xl flex items-center">
            <TrendingUp className="w-6 h-6 text-blue-400 mr-3" />
            中美俄太空实力动态对比
          </CardTitle>
          <div className="flex flex-wrap gap-4 items-center">
            {/* 图表类型切换 */}
            <div className="flex gap-2">
              <Button
                variant={chartType === 'satellites' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChartType('satellites')}
                className="text-white"
              >
                <Rocket className="w-4 h-4 mr-2" />
                卫星发射
              </Button>
              <Button
                variant={chartType === 'manned' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChartType('manned')}
                className="text-white"
              >
                <Users className="w-4 h-4 mr-2" />
                载人任务
              </Button>
            </div>

            {/* 播放控制 */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={togglePlay}
                className="text-white"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetAnimation}
                className="text-white"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            {/* 当前年份显示 */}
            <Badge variant="outline" className="text-blue-400 border-blue-400 text-lg px-3 py-1">
              {currentYear}年
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          {/* 年份滑块 */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>{minYear}</span>
              <span className="text-white font-medium">时间轴</span>
              <span>{maxYear}</span>
            </div>
            <Slider
              value={[currentYear]}
              onValueChange={(value) => setCurrentYear(value[0])}
              max={maxYear}
              min={minYear}
              step={1}
              className="w-full"
            />
          </div>

          {/* 统计卡片 */}
          {renderStatsCards()}

          {/* 双图表布局 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 累计数据图表 */}
            <Card className="bg-gray-800/50 backdrop-blur-md border-gray-600">
              <CardContent className="p-6">
                {renderBarChart(
                  cumulativeData, 
                  maxCumulative, 
                  `累计${chartType === 'satellites' ? '卫星发射' : '载人任务'}数量`
                )}
              </CardContent>
            </Card>

            {/* 年度数据图表 */}
            <Card className="bg-gray-800/50 backdrop-blur-md border-gray-600">
              <CardContent className="p-6">
                {renderBarChart(
                  yearlyData, 
                  maxYearly, 
                  `${currentYear}年${chartType === 'satellites' ? '卫星发射' : '载人任务'}数量`
                )}
              </CardContent>
            </Card>
          </div>

          {/* 分析说明 */}
          <Card className="bg-blue-900/30 backdrop-blur-md border-blue-500/30 mt-6">
            <CardContent className="p-4">
              <div className="text-gray-300 text-sm space-y-2">
                <p className="font-medium text-blue-300">
                  📊 数据分析：
                </p>
                <p>
                  • <span className="text-red-400">中国</span>在2012年后进入快速发展期，
                  {chartType === 'satellites' ? '卫星发射' : '载人任务'}数量显著增长
                </p>
                <p>
                  • <span className="text-blue-400">美国</span>在早期占据领先地位，
                  近年来保持稳定发展
                </p>
                <p>
                  • <span className="text-green-400">俄罗斯</span>继承苏联航天技术，
                  在载人航天领域经验丰富
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicBarChart;