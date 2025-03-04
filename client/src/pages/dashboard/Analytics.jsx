import { useState } from 'react';
import { Row, Col, Card, DatePicker, Select, Table, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const { RangePicker } = DatePicker;

const Analytics = () => {
  const [dateRange, setDateRange] = useState(null);
  const [tableId, setTableId] = useState('all');

  // Sample data for charts
  const weeklyData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    bets: Math.floor(Math.random() * 1000) + 500,
    revenue: Math.floor(Math.random() * 10000) + 5000
  }));

  const detailedStats = [
    {
      key: '1',
      metric: 'Total Bets',
      value: '12,345',
      change: '+15%',
      trend: 'up'
    },
    {
      key: '2',
      metric: 'Average Bet Size',
      value: '$523',
      change: '+8%',
      trend: 'up'
    },
    // Add more statistics
  ];

  const columns = [
    { title: 'Metric', dataIndex: 'metric', key: 'metric' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
    {
      title: 'Change',
      dataIndex: 'change',
      key: 'change',
      render: (text, record) => (
        <span style={{ color: record.trend === 'up' ? '#52c41a' : '#f5222d' }}>
          {text}
        </span>
      )
    }
  ];

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting data...');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handleExport}
        >
          Export Data
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <Row gutter={16} align="middle">
          <Col xs={24} sm={12} md={8} lg={6}>
            <label className="block mb-2">Date Range</label>
            <RangePicker
              style={{ width: '100%' }}
              onChange={(dates) => setDateRange(dates)}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <label className="block mb-2">Table</label>
            <Select
              style={{ width: '100%' }}
              value={tableId}
              onChange={setTableId}
              options={[
                { value: 'all', label: 'All Tables' },
                { value: 'table1', label: 'Table 1' },
                { value: 'table2', label: 'Table 2' }
              ]}
            />
          </Col>
        </Row>
      </Card>

      {/* Charts */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={24}>
          <Card title="Weekly Performance">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="bets" fill="#1890ff" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#52c41a" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Detailed Statistics */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Detailed Statistics">
            <Table
              columns={columns}
              dataSource={detailedStats}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics; 