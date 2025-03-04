import { Card, Tabs, Form, Input, Button, Switch, Alert, Divider, message } from 'antd';
import { LockOutlined, SecurityScanOutlined, BellOutlined } from '@ant-design/icons';
import { useState } from 'react';

const AccountSettings = () => {
  const [loading, setLoading] = useState(false);
  const [passwordForm] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [notificationForm] = Form.useForm();

  const onPasswordChange = async (values) => {
    setLoading(true);
    try {
      console.log('Password update:', values);
      message.success('Password updated successfully!');
      passwordForm.resetFields();
    } catch (error) {
      message.error('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const items = [
    {
      key: 'password',
      label: (
        <span>
          <LockOutlined />
          Password
        </span>
      ),
      children: (
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={onPasswordChange}
          className="max-w-md"
        >
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true },
              { min: 8, message: 'Password must be at least 8 characters' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['newPassword']}
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Passwords do not match');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Password
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'security',
      label: (
        <span>
          <SecurityScanOutlined />
          Security
        </span>
      ),
      children: (
        <Form
          form={securityForm}
          layout="vertical"
          className="max-w-md"
        >
          <Alert
            message="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
            type="info"
            showIcon
            className="mb-4"
          />

          <Form.Item label="Enable 2FA">
            <Switch />
          </Form.Item>

          <Divider />

          <Form.Item label="Login Notifications">
            <Switch defaultChecked />
          </Form.Item>

          <Form.Item label="Unusual Activity Alerts">
            <Switch defaultChecked />
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'notifications',
      label: (
        <span>
          <BellOutlined />
          Notifications
        </span>
      ),
      children: (
        <Form
          form={notificationForm}
          layout="vertical"
          className="max-w-md"
        >
          <Form.Item label="Email Notifications">
            <Switch defaultChecked />
          </Form.Item>

          <Form.Item label="Push Notifications">
            <Switch defaultChecked />
          </Form.Item>

          <Form.Item label="Marketing Emails">
            <Switch />
          </Form.Item>

          <Form.Item label="Security Updates">
            <Switch defaultChecked />
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Card title="Account Settings" className="shadow-md">
        <Tabs items={items} />
      </Card>
    </div>
  );
};

export default AccountSettings;
