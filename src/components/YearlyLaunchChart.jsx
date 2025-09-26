import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * 年度发射统计图表组件
 * @param {Object} props - 组件属性
 * @param {Array} props.data - 年度发射数据
 * @returns {JSX.Element} 年度发射图表组件
 */
const YearlyLaunchChart = ({ data }) => {
  /**
   * 自定义工具提示组件
   * @param {Object} props - 工具提示属性
   * @returns {JSX.Element|null} 工具提示内容
   */
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800/95 backdrop-blur-md p-3 border border-gray-600/50 rounded-lg shadow-xl text-white">
          <p className="font-semibold text-gray-100">{`年份: ${label}`}</p>
          <p className="text-blue-400">{`成功: ${payload[0]?.value || 0}`}</p>
          <p className="text-orange-400">{`失败: ${payload[1]?.value || 0}`}</p>
          <p className="text-gray-300">{`总计: ${(payload[0]?.value || 0) + (payload[1]?.value || 0)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-indigo-900/20 opacity-80"></div>
        <div className="relative z-10">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-3">
            <span className="text-2xl">📊</span>
            全球航天发射年度统计
          </CardTitle>
          <CardDescription className="text-base text-gray-300 mt-2 font-medium">
            展示从1957年至今的全球航天发射活动，蓝色表示成功任务，橙色表示失败任务
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 12, fill: '#d1d5db' }}
              axisLine={{ stroke: '#6b7280' }}
              tickLine={{ stroke: '#6b7280' }}
              interval="preserveStartEnd"
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#d1d5db' }}
              axisLine={{ stroke: '#6b7280' }}
              tickLine={{ stroke: '#6b7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ color: '#d1d5db' }}
            />
            <Bar 
              dataKey="success" 
              stackId="a" 
              fill="#60a5fa" 
              name="成功任务"
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="failure" 
              stackId="a" 
              fill="#fb923c" 
              name="失败任务"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default YearlyLaunchChart;
