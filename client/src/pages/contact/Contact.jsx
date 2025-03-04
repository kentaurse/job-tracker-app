import { Card, Form, Input, Button, message } from 'antd';
import { MailOutlined, PhoneOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import emailjs from '@emailjs/browser';
import { useState } from 'react';

// Initialize EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const Contact = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Replace these with your EmailJS credentials
      const templateParams = {
        to_name: 'Ethan Tan',
        to_email: 'kentaurse0212@gmail.com',
        from_name: values.name,
        reply_to: values.email,
        phone: values.phone,
        message: values.message,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      message.success('Message sent successfully!');
      form.resetFields();
    } catch (error) {
      console.error('Error sending email:', error);
      message.error('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card 
        title="Contact Us" 
        className="shadow-md"
        extra={<MessageOutlined className="text-primary text-xl" />}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input 
              prefix={<UserOutlined className="text-gray-400" />} 
              placeholder="Your name"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input 
              prefix={<MailOutlined className="text-gray-400" />} 
              placeholder="your.email@example.com"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input 
              prefix={<PhoneOutlined className="text-gray-400" />} 
              placeholder="Your phone number"
            />
          </Form.Item>

          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: 'Please enter your message' }]}
          >
            <Input.TextArea 
              rows={4}
              placeholder="Your message here..."
              className="resize-none"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              Send Message
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-medium mb-4">Contact Information</h3>
          
          <div className="flex items-center space-x-3">
            <MailOutlined className="text-primary" />
            <span>support@example.com</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <PhoneOutlined className="text-primary" />
            <span>+1 (555) 123-4567</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <MessageOutlined className="text-primary" />
            <span>Live Chat (Mon-Fri, 9AM-6PM EST)</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Contact;