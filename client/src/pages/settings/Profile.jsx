import { Card, Form, Input, Button, Upload, message, Avatar, Divider } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';

const Profile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log('Profile update:', values);
      message.success('Profile updated successfully!');
    } catch (error) {
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (info) => {
    if (info.file.status === 'done') {
      setImageUrl(URL.createObjectURL(info.file.originFileObj));
      message.success('Avatar uploaded successfully');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card title="My Profile" className="shadow-md">
        <div className="flex flex-col items-center mb-8">
          <Upload
            name="avatar"
            showUploadList={false}
            onChange={handleImageUpload}
            className="mb-4"
          >
            {imageUrl ? (
              <Avatar size={100} src={imageUrl} />
            ) : (
              <Avatar size={100} icon={<UserOutlined />} />
            )}
          </Upload>
          <Button icon={<UploadOutlined />}>Change Avatar</Button>
        </div>

        <Divider />

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1 (555) 123-4567',
            position: 'Software Developer',
            company: 'Tech Corp',
            location: 'New York, USA'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true }]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: 'email' }]}
            >
              <Input prefix={<MailOutlined />} />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
            >
              <Input prefix={<PhoneOutlined />} />
            </Form.Item>

            <Form.Item
              name="position"
              label="Position"
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="company"
              label="Company"
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="location"
              label="Location"
            >
              <Input />
            </Form.Item>
          </div>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              className="w-full md:w-auto"
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;