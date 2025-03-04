import { Table, Card, Button, Avatar, Tag, Space } from 'antd';
import { useTheme } from '@hooks/useTheme';
import { UserOutlined } from '@ant-design/icons';

const UserList = () => {
  const { theme } = useTheme();

  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <Space>
          <Avatar 
            src={record.avatar} 
            icon={<UserOutlined />}
            style={{ backgroundColor: theme.primary }}
          />
          <span style={{ color: theme.text }}>{name}</span>
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={
          role === 'admin' ? 'red' : 
          role === 'moderator' ? 'blue' : 
          'default'
        }>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    // Add more columns
  ];

  return (
    <div>
      <Card 
        title={<span style={{ color: theme.text }}>Users</span>}
        extra={
          <Button type="primary">Add User</Button>
        }
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

export default UserList; 