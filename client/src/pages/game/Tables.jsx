import { Table, Card, Button, Tag, Space } from 'antd';
import { useTheme } from '@hooks/useTheme';

const Tables = () => {
  const { theme } = useTheme();

  const columns = [
    {
      title: 'Table ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'success' : 'error'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    // Add more columns
  ];

  return (
    <div>
      <Card 
        title={<span style={{ color: theme.text }}>Game Tables</span>}
        style={{ 
          background: theme.cardBackground,
          borderColor: theme.border
        }}
      >
        <Table 
          columns={columns} 
          // Add data prop
          style={{
            '& .ant-table': {
              background: theme.cardBackground,
              color: theme.text
            }
          }}
        />
      </Card>
    </div>
  );
};

export default Tables; 