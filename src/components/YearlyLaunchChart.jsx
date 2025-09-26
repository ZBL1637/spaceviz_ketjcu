import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const YearlyLaunchChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-semibold">{`年份: ${label}`}</p>
          <p className="text-green-600">{`成功: ${payload[0]?.value || 0}`}</p>
          <p className="text-red-600">{`失败: ${payload[1]?.value || 0}`}</p>
          <p className="text-blue-600">{`总计: ${(payload[0]?.value || 0) + (payload[1]?.value || 0)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">全球航天发射年度统计</CardTitle>
        <CardDescription>
          展示从1957年至今的全球航天发射活动，绿色表示成功任务，红色表示失败任务
        </CardDescription>
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="success" 
              stackId="a" 
              fill="#22c55e" 
              name="成功任务"
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="failure" 
              stackId="a" 
              fill="#ef4444" 
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
