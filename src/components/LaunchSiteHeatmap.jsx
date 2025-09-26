import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// 移除未使用的 Badge 导入
// import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AnimatedNumber from './AnimatedNumber';

const LaunchSiteHeatmap = ({ data }) => {
  const [selectedSite, setSelectedSite] = useState(null);
  const [showTop, setShowTop] = useState(10);

  // 处理发射地点数据
  const siteData = data.slice(0, showTop);

  // 渐变阈值（提高阈值以增强中高成功率区间的对比度）
  const GRADIENT_PIVOT = 0.65; // 0-1，默认0.5，调高到0.65

  /**
   * 事件处理：点击柱子切换所选发射场
   * @param {object} site - 发射场数据项
   */
  const handleSiteClick = (site) => {
    setSelectedSite(selectedSite?.location === site.location ? null : site);
  };

  /**
   * 计算成功率（范围 0-1，避免除零）
   * @param {object} site - 发射场数据项，包含 success 和 total
   * @returns {number} 0 到 1 之间的成功率
   */
  const calcSuccessRate = (site) => {
    const total = Number(site?.total) || 0;
    const success = Number(site?.success) || 0;
    if (!total) return 0;
    return Math.max(0, Math.min(1, success / total));
  };

  /**
   * 线性插值函数
   * @param {number} a - 起始值
   * @param {number} b - 结束值
   * @param {number} t - 插值参数（0-1之间）
   * @returns {number} 插值结果
   */
  const lerp = (a, b, t) => a + (b - a) * t;
  
  /**
   * 平滑阶跃函数
   * @param {number} edge0 - 下边界
   * @param {number} edge1 - 上边界
   * @param {number} x - 输入值
   * @returns {number} 平滑阶跃结果
   */
  const smoothstep = (edge0, edge1, x) => {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  };
  
  /**
   * 将成功率映射为连续颜色
   * 设计原则：
   * - 提高阈值（GRADIENT_PIVOT=0.65）以在中高区间获得更好的对比度
   * - 使用 smoothstep 增强过渡平滑度，避免生硬的线性分界
   * @param {number} rate - 0 到 1 的成功率
   * @returns {string} CSS rgb(r,g,b) 颜色
   */
  const interpolateColor = (rate) => {
    const clamp = (x) => Math.max(0, Math.min(1, x));
    const t = clamp(rate);
    // 颜色锚点：浅蓝(LGT)、中蓝(MID)、深蓝(DRK)
    const LGT = [219, 234, 254]; // #DBEAFE 浅蓝
    const MID = [59, 130, 246];  // #3B82F6 中蓝
    const DRK = [30, 64, 175];   // #1E40AF 深蓝

    let r, g, b;
    if (t <= GRADIENT_PIVOT) {
      const k = smoothstep(0, GRADIENT_PIVOT, t); // 0 -> 1 映射 浅蓝 -> 中蓝（平滑）
      r = Math.round(lerp(LGT[0], MID[0], k));
      g = Math.round(lerp(LGT[1], MID[1], k));
      b = Math.round(lerp(LGT[2], MID[2], k));
    } else {
      const k = smoothstep(GRADIENT_PIVOT, 1, t); // 0 -> 1 映射 中蓝 -> 深蓝（平滑）
      r = Math.round(lerp(MID[0], DRK[0], k));
      g = Math.round(lerp(MID[1], DRK[1], k));
      b = Math.round(lerp(MID[2], DRK[2], k));
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  /**
   * 自定义提示框：展示总次数、成功/失败、成功率与对应颜色
   */
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      const rate = calcSuccessRate(d);
      const color = interpolateColor(rate);
      return (
        <div className="bg-gray-900/95 backdrop-blur-md p-3 border border-gray-700 rounded-lg shadow-xl">
          <p className="font-semibold flex items-center gap-2 text-white mb-2">
            <span className="inline-block w-3 h-3 rounded" style={{ background: color }}></span>
            {label}
          </p>
          <p className="text-gray-300 text-sm">{`总发射次数: ${d.total}`}</p>
          <p className="text-blue-400 text-sm">{`成功: ${d.success}`}</p>
          <p className="text-orange-400 text-sm">{`失败: ${d.failure}`}</p>
          <p className="text-cyan-400 text-sm">{`成功率: ${(rate * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md opacity-80"></div>
          <div className="relative z-10">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
              <span className="text-2xl">🌍</span>
              全球发射场活动热力图
            </CardTitle>
            <CardDescription className="text-base text-gray-300 mt-2 font-medium">
              展示全球各大发射场的历史发射活动，柱子高度表示总次数，颜色连续梯度表示成功率
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2">
            <Button 
              variant={showTop === 10 ? "default" : "outline"}
              size="sm"
              onClick={() => setShowTop(10)}
            >
              前10名
            </Button>
            <Button 
              variant={showTop === 20 ? "default" : "outline"}
              size="sm"
              onClick={() => setShowTop(20)}
            >
              前20名
            </Button>
            <Button 
              variant={showTop === data.length ? "default" : "outline"}
              size="sm"
              onClick={() => setShowTop(data.length)}
            >
              全部
            </Button>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={siteData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 100,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="location" 
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              {/* 使用 Cell 为每根柱子应用对应成功率的颜色（清华紫渐变） */}
              <Bar 
                dataKey="total"
                onClick={handleSiteClick}
                cursor="pointer"
              >
                {siteData.map((entry, index) => {
                  const rate = calcSuccessRate(entry);
                  return (
                    <Cell key={`cell-${index}`} fill={interpolateColor(rate)} />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* 连续渐变图例：0% -> 100% 成功率（清华紫渐变） */}
          <div className="mt-4">
            <div className="text-sm text-gray-700 mb-2">颜色代表成功率</div>
            <div className="flex items-center gap-2">
              <span className="text-xs">0%</span>
              <div
                className="h-3 flex-1 rounded"
                style={{ background: `linear-gradient(90deg, #E9D5FF 0%, #722F8A ${Math.round(GRADIENT_PIVOT*100)}%, #4C1D95 100%)` }}
              />
              <span className="text-xs">100%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedSite && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedSite.location} - 详细信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-lg">
                <div className="text-xl font-bold text-blue-400">
                  <AnimatedNumber 
                    value={selectedSite.total} 
                    formatter={(val) => Math.round(val).toLocaleString()}
                    duration={500}
                    delay={100}
                  />
                </div>
                <div className="text-sm text-blue-300">总发射次数</div>
              </div>
              <div className="text-center p-3 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-lg">
                <div className="text-xl font-bold text-green-400">
                  <AnimatedNumber 
                    value={selectedSite.success} 
                    formatter={(val) => Math.round(val).toLocaleString()}
                    duration={500}
                    delay={200}
                  />
                </div>
                <div className="text-sm text-green-300">成功次数</div>
              </div>
              <div className="text-center p-3 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-lg">
                <div className="text-xl font-bold text-red-400">
                  <AnimatedNumber 
                    value={selectedSite.failure} 
                    formatter={(val) => Math.round(val).toLocaleString()}
                    duration={500}
                    delay={300}
                  />
                </div>
                <div className="text-sm text-red-300">失败次数</div>
              </div>
              <div className="text-center p-3 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-lg">
                <div className="text-xl font-bold text-purple-400">
                  <AnimatedNumber 
                    value={(calcSuccessRate(selectedSite) * 100).toFixed(1)} 
                    suffix="%"
                    duration={500}
                    delay={400}
                    enableCountUp={true}
                  />
                </div>
                <div className="text-sm text-purple-300">成功率</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>发射场地理分布洞察</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-700 space-y-2">
            <p>• <span className="font-medium">肯尼迪航天中心</span>：美国最重要的发射场，承担了大部分载人航天任务</p>
            <p>• <span className="font-medium">拜科努尔</span>：世界上最古老的航天发射场，苏联/俄罗斯航天的核心</p>
            <p>• <span className="font-medium">酒泉卫星发射中心</span>：中国航天的重要基地，承担了多项重大任务</p>
            <p>• <span className="font-medium">范登堡空军基地</span>：主要用于极地轨道和太阳同步轨道发射</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LaunchSiteHeatmap;
