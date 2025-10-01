import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { newEraMissions } from '../lib/chinaSpaceData';
import { 
  Calendar, 
  Rocket, 
  Satellite, 
  Moon, 
  Globe, 
  Users, 
  Trophy,
  TrendingUp,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  Star,
  Target,
  Zap
} from 'lucide-react';

/**
 * 新时代加速度组件
 * 展示2012年至今中国太空探索的关键任务和发展
 */
const NewEraAcceleration = () => {
  const [selectedYear, setSelectedYear] = useState(2023);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);
  const [viewMode, setViewMode] = useState('timeline'); // timeline, heatmap, comparison
  const intervalRef = useRef(null);

  // 年份范围
  const minYear = 2012;
  const maxYear = 2023;

  // 任务类型配置
  const missionTypes = {
    '载人航天': { color: '#ef4444', icon: Users, label: '载人航天' },
    '月球探测': { color: '#f59e0b', icon: Moon, label: '月球探测' },
    '火星探测': { color: '#dc2626', icon: Globe, label: '火星探测' },
    '空间站': { color: '#3b82f6', icon: Satellite, label: '空间站' },
    '卫星发射': { color: '#10b981', icon: Rocket, label: '卫星发射' },
    '深空探测': { color: '#8b5cf6', icon: Star, label: '深空探测' }
  };

  /**
   * 自动播放控制
   */
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setSelectedYear(prev => {
          if (prev >= maxYear) {
            setIsPlaying(false);
            return minYear;
          }
          return prev + 1;
        });
      }, 1500);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, maxYear, minYear]);

  /**
   * 获取指定年份的任务
   */
  const getMissionsByYear = (year) => {
    return newEraMissions.filter(mission => mission.year === year);
  };

  /**
   * 获取年份统计
   */
  const getYearlyStats = (year) => {
    const missions = getMissionsByYear(year);
    const types = {};
    missions.forEach(mission => {
      types[mission.type] = (types[mission.type] || 0) + 1;
    });
    
    return {
      total: missions.length,
      types,
      success: missions.filter(m => m.status === 'success').length,
      major: missions.filter(m => m.significance === 'major').length
    };
  };

  /**
   * 渲染时间轴控制器
   */
  const renderTimelineControls = () => {
    return (
      <Card className="bg-gray-800/50 backdrop-blur-md border-gray-600">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center justify-between">
            <span className="flex items-center">
              <Calendar className="w-5 h-5 text-blue-400 mr-3" />
              新时代太空探索时间轴
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedYear(minYear)}
                className="text-white border-gray-600 hover:bg-gray-700"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white border-gray-600 hover:bg-gray-700"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">年份</span>
              <span className="text-white font-bold text-lg">{selectedYear}</span>
            </div>
            <Slider
              value={[selectedYear]}
              onValueChange={(value) => setSelectedYear(value[0])}
              min={minYear}
              max={maxYear}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{minYear}</span>
              <span>{maxYear}</span>
            </div>
          </div>

          {/* 年份统计 */}
          <div className="grid grid-cols-4 gap-3">
            {(() => {
              const stats = getYearlyStats(selectedYear);
              return (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{stats.total}</div>
                    <div className="text-xs text-gray-400">总任务</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{stats.success}</div>
                    <div className="text-xs text-gray-400">成功</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{stats.major}</div>
                    <div className="text-xs text-gray-400">重大突破</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {Object.keys(stats.types).length}
                    </div>
                    <div className="text-xs text-gray-400">任务类型</div>
                  </div>
                </>
              );
            })()}
          </div>
        </CardContent>
      </Card>
    );
  };

  /**
   * 渲染任务卡片
   */
  const renderMissionCard = (mission) => {
    const missionType = missionTypes[mission.type];
    const IconComponent = missionType?.icon || Rocket;

    return (
      <Card
        key={mission.id}
        className={`bg-gray-800/50 backdrop-blur-md border-gray-600 cursor-pointer transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 ${
          selectedMission?.id === mission.id ? 'border-blue-500 shadow-lg shadow-blue-500/20' : ''
        }`}
        onClick={() => setSelectedMission(selectedMission?.id === mission.id ? null : mission)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <IconComponent 
                className="w-5 h-5 mr-3" 
                style={{ color: missionType?.color || '#3b82f6' }}
              />
              <div>
                <CardTitle className="text-white text-base">{mission.name}</CardTitle>
                <p className="text-gray-400 text-sm">{mission.date}</p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <Badge 
                variant="outline" 
                style={{ 
                  color: missionType?.color || '#3b82f6', 
                  borderColor: missionType?.color || '#3b82f6' 
                }}
              >
                {mission.type}
              </Badge>
              {mission.significance === 'major' && (
                <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                  <Trophy className="w-3 h-3 mr-1" />
                  重大突破
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-gray-300 text-sm mb-3">{mission.description}</p>
          
          {selectedMission?.id === mission.id && (
            <div className="space-y-3 border-t border-gray-600 pt-3">
              <div>
                <h5 className="text-white font-medium mb-2">主要成就</h5>
                <ul className="text-gray-300 text-sm space-y-1">
                  {mission.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="w-3 h-3 text-green-400 mr-1 mt-0.5 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="text-white font-medium mb-2">技术突破</h5>
                <div className="flex flex-wrap gap-1">
                  {mission.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">国际影响：</span>
                <span className="text-white">{mission.impact}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  /**
   * 渲染热力图视图
   */
  const renderHeatmapView = () => {
    const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
    const maxMissions = Math.max(...years.map(year => getMissionsByYear(year).length));

    return (
      <Card className="bg-gray-800/50 backdrop-blur-md border-gray-600">
        <CardHeader>
          <CardTitle className="text-white text-lg">任务密度热力图</CardTitle>
          <p className="text-gray-400 text-sm">
            颜色深度表示该年度任务数量，点击查看详细信息
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-2">
            {years.map(year => {
              const missions = getMissionsByYear(year);
              const intensity = missions.length / maxMissions;
              const isSelected = year === selectedYear;
              
              return (
                <div
                  key={year}
                  className={`relative p-3 rounded-lg cursor-pointer transition-all duration-300 border-2 ${
                    isSelected ? 'border-blue-500 scale-105' : 'border-transparent'
                  }`}
                  style={{
                    backgroundColor: `rgba(59, 130, 246, ${0.2 + intensity * 0.6})`
                  }}
                  onClick={() => setSelectedYear(year)}
                >
                  <div className="text-center">
                    <div className="text-white font-bold text-lg">{year}</div>
                    <div className="text-gray-300 text-sm">{missions.length} 任务</div>
                  </div>
                  
                  {/* 任务类型指示器 */}
                  <div className="flex justify-center mt-2 space-x-1">
                    {Object.entries(
                      missions.reduce((acc, mission) => {
                        acc[mission.type] = (acc[mission.type] || 0) + 1;
                        return acc;
                      }, {})
                    ).map(([type, count]) => (
                      <div
                        key={type}
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: missionTypes[type]?.color || '#3b82f6' }}
                        title={`${type}: ${count}`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* 图例 */}
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-400">任务数量：</span>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">少</span>
              <div className="flex space-x-1">
                {[0.2, 0.4, 0.6, 0.8, 1.0].map(intensity => (
                  <div
                    key={intensity}
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: `rgba(59, 130, 246, ${intensity})` }}
                  />
                ))}
              </div>
              <span className="text-gray-400">多</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  /**
   * 渲染对比分析
   */
  const renderComparisonView = () => {
    // 计算各个时期的统计数据
    const periods = [
      { name: '起步期', years: [2012, 2013, 2014], color: '#ef4444' },
      { name: '发展期', years: [2015, 2016, 2017, 2018], color: '#f59e0b' },
      { name: '加速期', years: [2019, 2020, 2021, 2022, 2023], color: '#10b981' }
    ];

    const periodStats = periods.map(period => {
      const missions = newEraMissions.filter(m => period.years.includes(m.year));
      const types = {};
      missions.forEach(mission => {
        types[mission.type] = (types[mission.type] || 0) + 1;
      });
      
      return {
        ...period,
        total: missions.length,
        avgPerYear: (missions.length / period.years.length).toFixed(1),
        types,
        major: missions.filter(m => m.significance === 'major').length
      };
    });

    return (
      <Card className="bg-gray-800/50 backdrop-blur-md border-gray-600">
        <CardHeader>
          <CardTitle className="text-white text-lg">发展阶段对比分析</CardTitle>
          <p className="text-gray-400 text-sm">
            新时代中国太空探索三个发展阶段的成就对比
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {periodStats.map(period => (
              <Card key={period.name} className="bg-gray-900/50 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle 
                    className="text-lg flex items-center"
                    style={{ color: period.color }}
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    {period.name}
                  </CardTitle>
                  <p className="text-gray-400 text-sm">
                    {period.years[0]} - {period.years[period.years.length - 1]}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{period.total}</div>
                      <div className="text-gray-400">总任务</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{period.avgPerYear}</div>
                      <div className="text-gray-400">年均任务</div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-medium mb-2">任务类型分布</h5>
                    <div className="space-y-1">
                      {Object.entries(period.types).map(([type, count]) => (
                        <div key={type} className="flex items-center justify-between text-sm">
                          <span className="text-gray-300">{type}</span>
                          <span className="text-white">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-700">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">重大突破：</span>
                      <span className="text-yellow-400 font-bold">{period.major}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* 发展趋势说明 */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-500/30">
            <h4 className="text-white font-semibold mb-3 flex items-center">
              <Zap className="w-5 h-5 text-yellow-400 mr-2" />
              新时代加速度特征
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <h5 className="text-blue-300 font-medium mb-2">任务频率提升</h5>
                <p>从起步期年均2.3个任务提升到加速期年均4.4个任务，增长91%</p>
              </div>
              <div>
                <h5 className="text-blue-300 font-medium mb-2">技术突破加速</h5>
                <p>重大技术突破从起步期3项增加到加速期8项，实现质的飞跃</p>
              </div>
              <div>
                <h5 className="text-blue-300 font-medium mb-2">任务类型多元化</h5>
                <p>从单一的卫星发射扩展到载人航天、深空探测等全领域覆盖</p>
              </div>
              <div>
                <h5 className="text-blue-300 font-medium mb-2">国际影响力增强</h5>
                <p>从跟跑者转变为并跑者，部分领域实现领跑，彰显大国实力</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* 标题和模式切换 */}
      <Card className="bg-gradient-to-r from-red-900/30 to-yellow-900/30 backdrop-blur-md border-red-500/30">
        <CardHeader>
          <CardTitle className="text-white text-2xl flex items-center">
            <Rocket className="w-8 h-8 text-red-400 mr-4" />
            新时代加速度：中国太空探索的跨越式发展
          </CardTitle>
          <p className="text-gray-300 text-lg">
            2012年至今，中国太空事业进入快速发展期，从"跟跑"到"并跑"，展现出强劲的发展势头
          </p>
          <div className="flex space-x-2 mt-4">
            <Button
              variant={viewMode === 'timeline' ? 'default' : 'outline'}
              onClick={() => setViewMode('timeline')}
              className="text-white"
            >
              时间轴视图
            </Button>
            <Button
              variant={viewMode === 'heatmap' ? 'default' : 'outline'}
              onClick={() => setViewMode('heatmap')}
              className="text-white"
            >
              热力图视图
            </Button>
            <Button
              variant={viewMode === 'comparison' ? 'default' : 'outline'}
              onClick={() => setViewMode('comparison')}
              className="text-white"
            >
              对比分析
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* 时间轴控制器 */}
      {viewMode === 'timeline' && renderTimelineControls()}

      {/* 主要内容区域 */}
      {viewMode === 'timeline' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white text-center">
            {selectedYear}年 中国太空探索成就
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getMissionsByYear(selectedYear).map(renderMissionCard)}
          </div>
          {getMissionsByYear(selectedYear).length === 0 && (
            <Card className="bg-gray-800/50 backdrop-blur-md border-gray-600">
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">该年度暂无重大任务记录</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {viewMode === 'heatmap' && renderHeatmapView()}
      {viewMode === 'comparison' && renderComparisonView()}
    </div>
  );
};

export default NewEraAcceleration;