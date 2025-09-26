import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const LaunchSiteHeatmap = ({ data }) => {
  const [selectedSite, setSelectedSite] = useState(null);
  const [showTop, setShowTop] = useState(10);

  // 处理发射地点数据
  const siteData = data.slice(0, showTop);

  const handleSiteClick = (site) => {
    setSelectedSite(selectedSite?.location === site.location ? null : site);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-semibold">{label}</p>
          <p className="text-blue-600">{`总发射次数: ${data.total}`}</p>
          <p className="text-green-600">{`成功: ${data.success}`}</p>
          <p className="text-red-600">{`失败: ${data.failure}`}</p>
          <p className="text-purple-600">{`成功率: ${((data.success / data.total) * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (successRate) => {
    if (successRate >= 90) return '#22c55e';
    if (successRate >= 80) return '#eab308';
    if (successRate >= 70) return '#f97316';
    return '#ef4444';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">全球发射场活动热力图</CardTitle>
          <CardDescription>
            展示全球各大发射场的历史发射活动，颜色深浅表示成功率高低
          </CardDescription>
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
              variant={showTop === siteData.length ? "default" : "outline"}
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
              <Bar 
                dataKey="total" 
                fill={(entry) => getBarColor((entry.success / entry.total) * 100)}
                onClick={handleSiteClick}
                cursor="pointer"
              />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              ■ 90%+ 成功率
            </Badge>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              ■ 80-90% 成功率
            </Badge>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              ■ 70-80% 成功率
            </Badge>
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              ■ &lt;70% 成功率
            </Badge>
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
              <div className="text-center p-3 bg-blue-50 rounded">
                <div className="text-xl font-bold text-blue-600">{selectedSite.total}</div>
                <div className="text-sm text-blue-800">总发射次数</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded">
                <div className="text-xl font-bold text-green-600">{selectedSite.success}</div>
                <div className="text-sm text-green-800">成功次数</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded">
                <div className="text-xl font-bold text-red-600">{selectedSite.failure}</div>
                <div className="text-sm text-red-800">失败次数</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded">
                <div className="text-xl font-bold text-purple-600">
                  {((selectedSite.success / selectedSite.total) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-purple-800">成功率</div>
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
