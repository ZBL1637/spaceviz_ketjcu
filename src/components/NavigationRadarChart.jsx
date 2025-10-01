import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { navigationSystemComparison } from '../lib/chinaSpaceData';
import { Radar, Globe, Satellite, Shield, Zap, Target, Info } from 'lucide-react';

/**
 * 导航系统雷达图组件
 * 对比北斗、GPS、GLONASS系统的各项功能指标
 */
const NavigationRadarChart = () => {
  const [selectedSystem, setSelectedSystem] = useState('all');
  const [animationProgress, setAnimationProgress] = useState(0);
  const canvasRef = useRef(null);

  // 系统颜色配置
  const systemColors = {
    '北斗': { primary: '#ef4444', secondary: '#fca5a5', glow: '#ef444440' },
    'GPS': { primary: '#3b82f6', secondary: '#93c5fd', glow: '#3b82f640' },
    'GLONASS': { primary: '#10b981', secondary: '#6ee7b7', glow: '#10b98140' }
  };

  // 功能指标配置
  const indicators = [
    { key: 'positioning_accuracy', label: '定位精度', icon: Target, unit: 'm' },
    { key: 'coverage', label: '覆盖范围', icon: Globe, unit: '%' },
    { key: 'satellite_count', label: '卫星数量', icon: Satellite, unit: '颗' },
    { key: 'service_availability', label: '服务可用性', icon: Zap, unit: '%' },
    { key: 'security_level', label: '安全等级', icon: Shield, unit: '分' },
    { key: 'civilian_services', label: '民用服务', icon: Info, unit: '分' }
  ];

  // 动画效果
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  /**
   * 绘制雷达图
   */
  const drawRadarChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 60;
    const angleStep = (2 * Math.PI) / indicators.length;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制背景网格
    drawGrid(ctx, centerX, centerY, radius, angleStep);

    // 绘制系统数据
    navigationSystemComparison.forEach((system, index) => {
      if (selectedSystem === 'all' || selectedSystem === system.system) {
        drawSystemData(ctx, system, centerX, centerY, radius, angleStep, index);
      }
    });

    // 绘制指标标签
    drawLabels(ctx, centerX, centerY, radius, angleStep);
  };

  /**
   * 绘制网格
   */
  const drawGrid = (ctx, centerX, centerY, radius, angleStep) => {
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;

    // 绘制同心圆
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // 绘制射线
    for (let i = 0; i < indicators.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius
      );
      ctx.stroke();
    }
  };

  /**
   * 绘制系统数据
   */
  const drawSystemData = (ctx, system, centerX, centerY, radius, angleStep, index) => {
    const color = systemColors[system.system];
    const points = [];

    // 计算各点坐标
    indicators.forEach((indicator, i) => {
      const value = system[indicator.key];
      const normalizedValue = normalizeValue(value, indicator.key);
      const angle = i * angleStep - Math.PI / 2;
      const distance = (radius * normalizedValue * animationProgress) / 100;
      
      points.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance
      });
    });

    // 绘制填充区域
    ctx.fillStyle = color.glow;
    ctx.beginPath();
    points.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.closePath();
    ctx.fill();

    // 绘制边框线
    ctx.strokeStyle = color.primary;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 绘制数据点
    ctx.fillStyle = color.primary;
    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  /**
   * 绘制标签
   */
  const drawLabels = (ctx, centerX, centerY, radius, angleStep) => {
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    indicators.forEach((indicator, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const labelRadius = radius + 30;
      const x = centerX + Math.cos(angle) * labelRadius;
      const y = centerY + Math.sin(angle) * labelRadius;
      
      ctx.fillText(indicator.label, x, y);
    });
  };

  /**
   * 标准化数值
   */
  const normalizeValue = (value, key) => {
    const ranges = {
      positioning_accuracy: { min: 0, max: 10, invert: true }, // 精度越小越好
      coverage: { min: 0, max: 100 },
      satellite_count: { min: 0, max: 50 },
      service_availability: { min: 0, max: 100 },
      security_level: { min: 0, max: 10 },
      civilian_services: { min: 0, max: 10 }
    };

    const range = ranges[key];
    let normalized = ((value - range.min) / (range.max - range.min)) * 100;
    
    if (range.invert) {
      normalized = 100 - normalized;
    }
    
    return Math.max(0, Math.min(100, normalized));
  };

  // 重绘画布
  useEffect(() => {
    drawRadarChart();
  }, [selectedSystem, animationProgress]);

  /**
   * 渲染系统详情卡片
   */
  const renderSystemDetails = () => {
    const systems = selectedSystem === 'all' 
      ? navigationSystemComparison 
      : navigationSystemComparison.filter(s => s.system === selectedSystem);

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {systems.map(system => (
          <Card key={system.system} className="bg-gray-800/50 backdrop-blur-md border-gray-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: systemColors[system.system].primary }}
                ></div>
                {system.system}
              </CardTitle>
              <Badge variant="outline" className="w-fit">
                {system.country}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {indicators.map(indicator => {
                const IconComponent = indicator.icon;
                const value = system[indicator.key];
                return (
                  <div key={indicator.key} className="flex items-center justify-between">
                    <div className="flex items-center text-gray-300">
                      <IconComponent className="w-4 h-4 mr-2" />
                      <span className="text-sm">{indicator.label}</span>
                    </div>
                    <span className="text-white font-medium">
                      {value}{indicator.unit}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  /**
   * 渲染优势分析
   */
  const renderAdvantageAnalysis = () => {
    return (
      <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-md border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white text-lg">系统优势分析</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="text-red-400 font-semibold flex items-center">
                <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                北斗系统
              </h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• 全球覆盖，服务精度高</li>
                <li>• 独特的短报文通信功能</li>
                <li>• 军民融合，安全可控</li>
                <li>• 后发优势，技术先进</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-blue-400 font-semibold flex items-center">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                GPS系统
              </h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• 发展最早，技术成熟</li>
                <li>• 全球用户基数庞大</li>
                <li>• 生态系统完善</li>
                <li>• 商业应用广泛</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-green-400 font-semibold flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                GLONASS系统
              </h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• 高纬度地区性能优异</li>
                <li>• 抗干扰能力强</li>
                <li>• 军用可靠性高</li>
                <li>• 与其他系统兼容性好</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* 标题和控制面板 */}
      <Card className="bg-gray-900/60 backdrop-blur-md border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-xl flex items-center">
            <Radar className="w-6 h-6 text-purple-400 mr-3" />
            全球导航系统功能对比
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedSystem === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSystem('all')}
              className="text-white"
            >
              全部系统
            </Button>
            {navigationSystemComparison.map(system => (
              <Button
                key={system.system}
                variant={selectedSystem === system.system ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSystem(system.system)}
                className="text-white"
                style={{
                  backgroundColor: selectedSystem === system.system 
                    ? systemColors[system.system].primary 
                    : 'transparent'
                }}
              >
                {system.system}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          {/* 雷达图 */}
          <div className="flex justify-center mb-8">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="border border-gray-600 rounded-lg bg-gray-800/30"
            />
          </div>

          {/* 系统详情 */}
          {renderSystemDetails()}
        </CardContent>
      </Card>

      {/* 优势分析 */}
      {renderAdvantageAnalysis()}

      {/* 北斗特色功能说明 */}
      <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 backdrop-blur-md border-red-500/30">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center">
            <Satellite className="w-6 h-6 text-red-400 mr-3" />
            北斗系统独特优势
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-red-300 font-semibold">技术创新</h4>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>• <span className="text-yellow-400">短报文通信</span>：独有的双向通信功能，可发送120汉字短信</p>
                <p>• <span className="text-blue-400">三频信号</span>：提供更高精度的定位服务</p>
                <p>• <span className="text-green-400">区域增强</span>：针对亚太地区优化，精度更高</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-red-300 font-semibold">服务全球</h4>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>• <span className="text-purple-400">开放共享</span>：向全球用户免费提供基本导航服务</p>
                <p>• <span className="text-orange-400">精度领先</span>：全球定位精度优于10米</p>
                <p>• <span className="text-cyan-400">可靠稳定</span>：系统可用性超过95%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NavigationRadarChart;