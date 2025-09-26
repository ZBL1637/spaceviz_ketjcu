import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import AnimatedNumber from './AnimatedNumber';

// 深色主题适配的颜色配置
const COLORS = ['#60a5fa', '#fbbf24', '#a78bfa', '#22d3ee', '#f87171', '#34d399', '#fb923c'];

const InteractiveTimeline = ({ data, yearlyData }) => {
  const [yearRange, setYearRange] = useState([1957, 2024]);
  
  const filteredData = useMemo(() => {
    return data.filter(mission => {
      const year = mission.Year;
      return year >= yearRange[0] && year <= yearRange[1];
    });
  }, [data, yearRange]);

  /**
   * 自定义饼图工具提示组件
   * @param {Object} props - 工具提示属性
   * @returns {JSX.Element|null} 工具提示内容
   */
  const CustomPieTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-gray-900/95 backdrop-blur-md p-3 border border-gray-700 rounded-lg shadow-xl">
          <p className="font-semibold text-white mb-1">{data.payload.company}</p>
          <p className="text-blue-400 text-sm">{`发射次数: ${data.value}`}</p>
          <p className="text-gray-300 text-sm">{`占比: ${((data.value / companyStats.reduce((sum, item) => sum + item.count, 0)) * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  /**
   * 自定义线图工具提示组件
   * @param {Object} props - 工具提示属性
   * @returns {JSX.Element|null} 工具提示内容
   */
  const CustomLineTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-md p-3 border border-gray-700/50 rounded-lg shadow-xl text-white">
          <p className="font-semibold text-gray-100 mb-1">{`年份: ${label}`}</p>
          <p className="text-blue-400 text-sm">{`总发射次数: ${payload[0]?.value || 0}`}</p>
        </div>
      );
    }
    return null;
  };

  const filteredYearlyData = useMemo(() => {
    return yearlyData.filter(item => item.year >= yearRange[0] && item.year <= yearRange[1]);
  }, [yearlyData, yearRange]);

  const companyStats = useMemo(() => {
    const stats = filteredData.reduce((acc, mission) => {
      const company = mission['Company Name'];
      if (!acc[company]) {
        acc[company] = 0;
      }
      acc[company]++;
      return acc;
    }, {});
    
    return Object.entries(stats)
      .map(([company, count]) => ({ company, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 7); // 只显示前7个
  }, [filteredData]);

  const totalMissions = filteredData.length;
  const successfulMissions = filteredData.filter(m => m['Status Mission Simplified'] === 'Success').length;
  const successRate = totalMissions > 0 ? ((successfulMissions / totalMissions) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md opacity-80"></div>
          <div className="relative z-10">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-3">
              <span className="text-2xl">🚀</span>
              交互式太空探索时间线
            </CardTitle>
            <CardDescription className="text-base text-gray-300 mt-2 font-medium">
              拖动滑块选择时间范围，查看特定时期的太空活动统计
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">时间范围:</span>
              <span className="text-sm text-muted-foreground">
                {yearRange[0]} - {yearRange[1]}
              </span>
            </div>
            <Slider
              value={yearRange}
              onValueChange={setYearRange}
              max={2024}
              min={1957}
              step={1}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">
                <AnimatedNumber 
                  value={totalMissions} 
                  formatter={(val) => Math.round(val).toLocaleString()}
                  duration={600}
                  delay={100}
                />
              </div>
              <div className="text-sm text-blue-300">总任务数</div>
            </div>
            <div className="text-center p-4 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-400">
                <AnimatedNumber 
                  value={successfulMissions} 
                  formatter={(val) => Math.round(val).toLocaleString()}
                  duration={600}
                  delay={200}
                />
              </div>
              <div className="text-sm text-orange-300">成功任务</div>
            </div>
            <div className="text-center p-4 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">
                <AnimatedNumber 
                  value={successRate} 
                  suffix="%"
                  duration={600}
                  delay={300}
                  enableCountUp={true}
                />
              </div>
              <div className="text-sm text-purple-300">成功率</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>时期发射趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredYearlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomLineTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="总发射次数"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>主要参与者占比</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={companyStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ company, percent }) => `${company}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {companyStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>时期内主要参与者</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {companyStats.map((item, index) => (
              <Badge 
                key={item.company} 
                variant="secondary"
                className="text-sm"
                style={{ backgroundColor: COLORS[index % COLORS.length] + '20' }}
              >
                {item.company}: {item.count} 次
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveTimeline;
