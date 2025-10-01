import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { beidouApplications } from '../lib/chinaSpaceData';
import { 
  MapPin, 
  Satellite, 
  Navigation, 
  Truck, 
  Plane, 
  Ship, 
  Tractor, 
  Shield, 
  Zap,
  Globe,
  Info,
  ChevronRight
} from 'lucide-react';

/**
 * 北斗交互式地图组件
 * 展示北斗系统全球地面站分布和应用案例
 */
const BeidouInteractiveMap = () => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [activeView, setActiveView] = useState('stations');
  const mapRef = useRef(null);

  // 北斗地面站数据（模拟）
  const groundStations = [
    { id: 1, name: '北京主控站', lat: 39.9042, lng: 116.4074, type: 'main', country: '中国' },
    { id: 2, name: '西安备份主控站', lat: 34.3416, lng: 108.9398, type: 'backup', country: '中国' },
    { id: 3, name: '乌鲁木齐监测站', lat: 43.8256, lng: 87.6168, type: 'monitor', country: '中国' },
    { id: 4, name: '拉萨监测站', lat: 29.6520, lng: 91.1721, type: 'monitor', country: '中国' },
    { id: 5, name: '三亚监测站', lat: 18.2479, lng: 109.5146, type: 'monitor', country: '中国' },
    { id: 6, name: '喀什监测站', lat: 39.4704, lng: 75.9896, type: 'monitor', country: '中国' },
    { id: 7, name: '巴基斯坦监测站', lat: 33.6844, lng: 73.0479, type: 'international', country: '巴基斯坦' },
    { id: 8, name: '缅甸监测站', lat: 16.8661, lng: 96.1951, type: 'international', country: '缅甸' },
    { id: 9, name: '老挝监测站', lat: 17.9757, lng: 102.6331, type: 'international', country: '老挝' },
    { id: 10, name: '泰国监测站', lat: 13.7563, lng: 100.5018, type: 'international', country: '泰国' },
    { id: 11, name: '俄罗斯监测站', lat: 55.7558, lng: 37.6176, type: 'international', country: '俄罗斯' },
    { id: 12, name: '阿根廷监测站', lat: -34.6118, lng: -58.3960, type: 'international', country: '阿根廷' }
  ];

  // 站点类型配置
  const stationTypes = {
    main: { color: '#ef4444', label: '主控站', icon: '🏢' },
    backup: { color: '#f97316', label: '备份主控站', icon: '🏛️' },
    monitor: { color: '#3b82f6', label: '监测站', icon: '📡' },
    international: { color: '#10b981', label: '国际合作站', icon: '🌍' }
  };

  // 应用领域图标映射
  const applicationIcons = {
    '交通运输': Truck,
    '农业': Tractor,
    '航空': Plane,
    '海事': Ship,
    '应急救援': Shield,
    '电力': Zap,
    '测绘': MapPin,
    '通信': Satellite
  };

  /**
   * 渲染世界地图（简化版SVG）
   */
  const renderWorldMap = () => {
    return (
      <div className="relative w-full h-96 bg-gradient-to-b from-blue-900/20 to-green-900/20 rounded-lg overflow-hidden border border-gray-600">
        {/* 地图背景 */}
        <div className="absolute inset-0 bg-gray-800/50 backdrop-blur-sm"></div>
        
        {/* 经纬度网格 */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {/* 经线 */}
          {Array.from({ length: 13 }, (_, i) => (
            <line
              key={`meridian-${i}`}
              x1={`${(i * 100) / 12}%`}
              y1="0%"
              x2={`${(i * 100) / 12}%`}
              y2="100%"
              stroke="#374151"
              strokeWidth="1"
            />
          ))}
          {/* 纬线 */}
          {Array.from({ length: 7 }, (_, i) => (
            <line
              key={`parallel-${i}`}
              x1="0%"
              y1={`${(i * 100) / 6}%`}
              x2="100%"
              y2={`${(i * 100) / 6}%`}
              stroke="#374151"
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* 地面站标记 */}
        {groundStations.map(station => {
          // 简化的经纬度转换（仅用于演示）
          const x = ((station.lng + 180) / 360) * 100;
          const y = ((90 - station.lat) / 180) * 100;
          const stationType = stationTypes[station.type];

          return (
            <div
              key={station.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-125 ${
                selectedStation?.id === station.id ? 'scale-150 z-10' : ''
              }`}
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => setSelectedStation(station)}
            >
              <div
                className="w-4 h-4 rounded-full border-2 border-white shadow-lg animate-pulse"
                style={{ backgroundColor: stationType.color }}
              ></div>
              {selectedStation?.id === station.id && (
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-md text-white text-xs px-2 py-1 rounded whitespace-nowrap border border-gray-600">
                  {station.name}
                </div>
              )}
            </div>
          );
        })}

        {/* 覆盖范围示意 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-red-400/30 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 border-2 border-blue-400/40 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    );
  };

  /**
   * 渲染地面站详情
   */
  const renderStationDetails = () => {
    if (!selectedStation) {
      return (
        <Card className="bg-gray-800/50 backdrop-blur-md border-gray-600">
          <CardContent className="p-6 text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">点击地图上的站点查看详细信息</p>
          </CardContent>
        </Card>
      );
    }

    const stationType = stationTypes[selectedStation.type];

    return (
      <Card className="bg-gray-800/50 backdrop-blur-md border-gray-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-3"
              style={{ backgroundColor: stationType.color }}
            ></div>
            {selectedStation.name}
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline" style={{ color: stationType.color, borderColor: stationType.color }}>
              {stationType.label}
            </Badge>
            <Badge variant="outline" className="text-gray-300">
              {selectedStation.country}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">纬度：</span>
              <span className="text-white">{selectedStation.lat.toFixed(4)}°</span>
            </div>
            <div>
              <span className="text-gray-400">经度：</span>
              <span className="text-white">{selectedStation.lng.toFixed(4)}°</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-white font-medium">主要功能</h4>
            <div className="text-gray-300 text-sm space-y-1">
              {selectedStation.type === 'main' && (
                <>
                  <p>• 卫星轨道控制和维护</p>
                  <p>• 系统运行状态监控</p>
                  <p>• 导航信号质量管理</p>
                </>
              )}
              {selectedStation.type === 'backup' && (
                <>
                  <p>• 主控站备份功能</p>
                  <p>• 应急接管系统控制</p>
                  <p>• 数据备份与恢复</p>
                </>
              )}
              {selectedStation.type === 'monitor' && (
                <>
                  <p>• 卫星信号监测</p>
                  <p>• 定位精度评估</p>
                  <p>• 系统性能分析</p>
                </>
              )}
              {selectedStation.type === 'international' && (
                <>
                  <p>• 区域信号增强</p>
                  <p>• 国际合作服务</p>
                  <p>• 本地化应用支持</p>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  /**
   * 渲染应用案例
   */
  const renderApplicationCases = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {beidouApplications.map(app => {
          const IconComponent = applicationIcons[app.field] || Info;
          
          return (
            <Card 
              key={app.id}
              className={`bg-gray-800/50 backdrop-blur-md border-gray-600 cursor-pointer transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 ${
                selectedApplication?.id === app.id ? 'border-blue-500 shadow-lg shadow-blue-500/20' : ''
              }`}
              onClick={() => setSelectedApplication(selectedApplication?.id === app.id ? null : app)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center">
                  <IconComponent className="w-5 h-5 text-blue-400 mr-3" />
                  {app.title}
                </CardTitle>
                <Badge variant="outline" className="w-fit text-blue-400 border-blue-400">
                  {app.field}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-3">{app.description}</p>
                
                {selectedApplication?.id === app.id && (
                  <div className="space-y-3 border-t border-gray-600 pt-3">
                    <div>
                      <h5 className="text-white font-medium mb-2">应用效果</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {app.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="w-3 h-3 text-green-400 mr-1 mt-0.5 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">覆盖区域：</span>
                      <span className="text-white">{app.coverage}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">用户规模：</span>
                      <span className="text-white">{app.users}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  /**
   * 渲染统计信息
   */
  const renderStatistics = () => {
    const totalStations = groundStations.length;
    const internationalStations = groundStations.filter(s => s.type === 'international').length;
    const domesticStations = totalStations - internationalStations;
    const totalApplications = beidouApplications.length;

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-red-600/20 to-pink-600/20 backdrop-blur-md border-red-500/30">
          <CardContent className="p-4 text-center">
            <Globe className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{totalStations}</div>
            <p className="text-gray-300 text-sm">全球地面站</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-md border-blue-500/30">
          <CardContent className="p-4 text-center">
            <MapPin className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{domesticStations}</div>
            <p className="text-gray-300 text-sm">国内站点</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600/20 to-teal-600/20 backdrop-blur-md border-green-500/30">
          <CardContent className="p-4 text-center">
            <Navigation className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{internationalStations}</div>
            <p className="text-gray-300 text-sm">国际合作站</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-md border-purple-500/30">
          <CardContent className="p-4 text-center">
            <Satellite className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{totalApplications}</div>
            <p className="text-gray-300 text-sm">应用领域</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 标题和统计 */}
      <Card className="bg-gray-900/60 backdrop-blur-md border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-xl flex items-center">
            <Globe className="w-6 h-6 text-blue-400 mr-3" />
            北斗导航系统全球布局
          </CardTitle>
          <p className="text-gray-300">
            北斗系统通过全球地面站网络，为世界各地用户提供高精度定位、导航和授时服务
          </p>
        </CardHeader>
        <CardContent>
          {renderStatistics()}
        </CardContent>
      </Card>

      {/* 主要内容 */}
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 backdrop-blur-md">
          <TabsTrigger value="stations" className="text-white data-[state=active]:bg-blue-600">
            地面站分布
          </TabsTrigger>
          <TabsTrigger value="applications" className="text-white data-[state=active]:bg-blue-600">
            应用案例
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stations" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 地图 */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-900/60 backdrop-blur-md border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">全球地面站分布图</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(stationTypes).map(([type, config]) => (
                      <div key={type} className="flex items-center text-sm">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: config.color }}
                        ></div>
                        <span className="text-gray-300">{config.label}</span>
                      </div>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  {renderWorldMap()}
                </CardContent>
              </Card>
            </div>

            {/* 站点详情 */}
            <div>
              {renderStationDetails()}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="applications" className="mt-6">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">北斗系统应用案例</h3>
              <p className="text-gray-300 max-w-3xl mx-auto">
                北斗系统在交通运输、农业生产、应急救援等多个领域发挥重要作用，
                为经济社会发展和民生改善提供有力支撑。
              </p>
            </div>
            {renderApplicationCases()}
          </div>
        </TabsContent>
      </Tabs>

      {/* 北斗优势说明 */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-md border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white text-lg">北斗系统全球服务能力</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-blue-300 font-semibold">服务范围</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• 全球定位精度：优于10米</li>
                <li>• 亚太地区精度：优于5米</li>
                <li>• 授时精度：优于20纳秒</li>
                <li>• 测速精度：优于0.2米/秒</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-blue-300 font-semibold">特色服务</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• 短报文通信：120汉字信息传输</li>
                <li>• 精密单点定位：厘米级精度</li>
                <li>• 区域短报文：1000汉字容量</li>
                <li>• 国际搜救：全球遇险报警</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BeidouInteractiveMap;