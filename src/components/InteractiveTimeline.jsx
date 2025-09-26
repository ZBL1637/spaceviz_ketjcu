import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const InteractiveTimeline = ({ data, yearlyData }) => {
  const [yearRange, setYearRange] = useState([1957, 2024]);
  
  const filteredData = useMemo(() => {
    return data.filter(mission => {
      const year = mission.Year;
      return year >= yearRange[0] && year <= yearRange[1];
    });
  }, [data, yearRange]);

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
        <CardHeader>
          <CardTitle className="text-2xl font-bold">交互式太空探索时间线</CardTitle>
          <CardDescription>
            拖动滑块选择时间范围，查看特定时期的太空活动统计
          </CardDescription>
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
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalMissions}</div>
              <div className="text-sm text-blue-800">总任务数</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{successfulMissions}</div>
              <div className="text-sm text-green-800">成功任务</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{successRate}%</div>
              <div className="text-sm text-purple-800">成功率</div>
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
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#8884d8" 
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
                <Tooltip />
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
