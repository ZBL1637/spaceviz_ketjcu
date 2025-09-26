import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SpaceRaceChart = ({ data }) => {
  // 深色主题适配的颜色配置
  const colors = {
    'RVSN USSR': '#60a5fa',  // 亮蓝色，适合深色背景
    'NASA': '#3b82f6',       // 蓝色
    'SpaceX': '#fbbf24',     // 亮橙色
    'CASC': '#f87171',       // 亮红色
    'Roscosmos': '#22d3ee'   // 亮青色
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-md p-3 border border-gray-700 rounded-lg shadow-xl">
          <p className="font-semibold text-white mb-2">{`年份: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.dataKey}: ${entry.value} 次`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20 opacity-60"></div>
        <div className="relative z-10">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-3">
            <span className="text-2xl">🏁</span>
            太空竞赛：主要参与者对比
          </CardTitle>
          <CardDescription className="text-base text-gray-300 mt-2 font-medium">
            展示美苏太空竞赛到商业航天公司崛起的历史变迁，清晰呈现各大参与者的发射活动演变
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={500}>
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 12, fill: 'rgba(255, 255, 255, 0.8)' }}
              interval="preserveStartEnd"
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
              tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: 'rgba(255, 255, 255, 0.8)' }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
              tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ color: 'rgba(255, 255, 255, 0.9)' }}
            />
            <Area
              type="monotone"
              dataKey="RVSN USSR"
              stackId="1"
              stroke={colors['RVSN USSR']}
              fill={colors['RVSN USSR']}
              fillOpacity={0.7}
              name="苏联航天"
            />
            <Area
              type="monotone"
              dataKey="NASA"
              stackId="1"
              stroke={colors['NASA']}
              fill={colors['NASA']}
              fillOpacity={0.7}
              name="美国NASA"
            />
            <Area
              type="monotone"
              dataKey="SpaceX"
              stackId="1"
              stroke={colors['SpaceX']}
              fill={colors['SpaceX']}
              fillOpacity={0.7}
              name="SpaceX"
            />
            <Area
              type="monotone"
              dataKey="CASC"
              stackId="1"
              stroke={colors['CASC']}
              fill={colors['CASC']}
              fillOpacity={0.7}
              name="中国航天"
            />
            <Area
              type="monotone"
              dataKey="Roscosmos"
              stackId="1"
              stroke={colors['Roscosmos']}
              fill={colors['Roscosmos']}
              fillOpacity={0.7}
              name="俄罗斯航天"
            />
          </AreaChart>
        </ResponsiveContainer>
        
        <div className="mt-6 p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
          <h4 className="font-semibold mb-2 text-white">历史洞察</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• 1957-1970年代：美苏太空竞赛激烈，苏联早期领先</li>
            <li>• 1980-2000年代：NASA稳步发展，航天飞机时代</li>
            <li>• 2010年后：SpaceX崛起，商业航天新纪元</li>
            <li>• 近年来：中国航天快速发展，多极化竞争格局</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpaceRaceChart;
