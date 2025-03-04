import { Row, Col, Card, Statistic, Table } from "antd";
import {
  ArrowUpOutlined,
  UserOutlined,
  DollarOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import { Line, Pie } from "@ant-design/plots";
import { useTheme } from "@hooks/useTheme";

const Dashboard = () => {
  const { isDark } = useTheme();
  // Sample data for charts
  const lineConfig = {
    theme: isDark ? "dark" : "light",
    data: {
      type: "fetch",
      value:
        "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json",
    },
    xField: (d) => new Date(d.year),
    yField: "value",
    sizeField: "value",
    shapeField: "trail",
    legend: { size: false },
    colorField: "category",
  };

  const pieConfig = {
    theme: isDark ? "dark" : "light",
    data: [
      { type: '分类一', value: 27 },
      { type: '分类二', value: 25 },
      { type: '分类三', value: 18 },
      { type: '分类四', value: 15 },
      { type: '分类五', value: 10 },
      { type: '其他', value: 5 },
    ],
    angleField: 'value',
    colorField: 'type',
    innerRadius: 0.6,
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };  

  const recentBets = [
    {
      key: "1",
      user: "John Doe",
      amount: 1000,
      type: "Player",
      result: "Win",
      time: "2 min ago",
    },
    {
      key: "2",
      user: "Jane Smith",
      amount: 500,
      type: "Banker",
      result: "Loss",
      time: "5 min ago",
    },
  ];

  const columns = [
    { title: "User", dataIndex: "user", key: "user" },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (val) => `$${val}`,
    },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
      render: (text) => (
        <span style={{ color: text === "Win" ? "#52c41a" : "#f5222d" }}>
          {text}
        </span>
      ),
    },
    { title: "Time", dataIndex: "time", key: "time" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={1234}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={543210}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Win Rate"
              value={68.2}
              prefix={<ArrowUpOutlined />}
              suffix="%"
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Tables"
              value={8}
              prefix={<FieldTimeOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={12}>
          <Card title="Revenue Trend">
            <Line {...lineConfig} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Bet Distribution"><Pie {...pieConfig} /></Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Card title="Recent Bets" className="mb-6">
        <Table
          columns={columns}
          dataSource={recentBets}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
