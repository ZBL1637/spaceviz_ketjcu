import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SpaceRaceChart = ({ data }) => {
  const colors = {
    'RVSN USSR': '#dc2626',
    'NASA': '#2563eb', 
    'SpaceX': '#059669',
    'CASC': '#dc2626',
    'Roscosmos': '#7c3aed'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-semibold">{`年份: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
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
      <CardHeader>
        <CardTitle className="text-2xl font-bold">太空竞赛：主要参与者对比</CardTitle>
        <CardDescription>
          展示美苏太空竞赛到商业航天公司崛起的历史变迁，清晰呈现各大参与者的发射活动演变
        </CardDescription>
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="RVSN USSR"
              stackId="1"
              stroke={colors['RVSN USSR']}
              fill={colors['RVSN USSR']}
              fillOpacity={0.6}
              name="苏联航天"
            />
            <Area
              type="monotone"
              dataKey="NASA"
              stackId="1"
              stroke={colors['NASA']}
              fill={colors['NASA']}
              fillOpacity={0.6}
              name="美国NASA"
            />
            <Area
              type="monotone"
              dataKey="SpaceX"
              stackId="1"
              stroke={colors['SpaceX']}
              fill={colors['SpaceX']}
              fillOpacity={0.6}
              name="SpaceX"
            />
            <Area
              type="monotone"
              dataKey="CASC"
              stackId="1"
              stroke={colors['CASC']}
              fill={colors['CASC']}
              fillOpacity={0.6}
              name="中国航天"
            />
            <Area
              type="monotone"
              dataKey="Roscosmos"
              stackId="1"
              stroke={colors['Roscosmos']}
              fill={colors['Roscosmos']}
              fillOpacity={0.6}
              name="俄罗斯航天"
            />
          </AreaChart>
        </ResponsiveContainer>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">历史洞察</h4>
          <div className="text-sm text-gray-700 space-y-2">
            <p>• <span className="font-medium text-red-600">1957-1991年</span>：苏联在早期太空竞赛中占据主导地位</p>
            <p>• <span className="font-medium text-blue-600">1960-2000年</span>：美国NASA逐步追赶并在某些时期超越苏联</p>
            <p>• <span className="font-medium text-green-600">2010年后</span>：SpaceX等商业公司崛起，彻底改变太空探索格局</p>
            <p>• <span className="font-medium text-purple-600">2000年后</span>：俄罗斯继承苏联航天遗产，中国航天快速发展</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpaceRaceChart;
