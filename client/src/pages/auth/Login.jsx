import { Form, Input, Button, Card, Divider, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { GoogleOutlined, CheckCircleOutlined, LoadingOutlined, WarningOutlined } from '@ant-design/icons';
import axiosInstance from '@config/axios';
import { useAuth } from '@contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [api, contextHolder] = notification.useNotification();
  const { t } = useTranslation();

  const onFinish = async (values) => {
    try {
      api.info({
        key: 'login',
        message: t('auth.login.notifications.loggingIn'),
        description: t('auth.login.notifications.pleaseWait'),
        icon: <LoadingOutlined style={{ color: '#1890ff' }} />,
        duration: 0,
      });

      const response = await axiosInstance.post('/api/v1/auth/login', {
        email: values.username,
        password: values.password
      });

      if (!response.data.success) {
        throw new Error(response.data.message || 'Login failed');
      }

      const { token, user } = response.data.data;
      
      if (!token) {
        throw new Error('No token received from server');
      }

      if (!user) {
        throw new Error('No user data received from server');
      }

      login(user, token);

      api.success({
        key: 'login',
        message: t('auth.login.notifications.success'),
        description: t('auth.login.notifications.welcomeBack', { name: user.name || '' }),
        icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
        duration: 3,
      });

      navigate('/', { replace: true });
    } catch (error) {
      console.error('Login error details:', {
        error,
        response: error.response,
        data: error.response?.data,
        status: error.response?.status,
        message: error.message
      });

      const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
      
      api.error({
        key: 'login',
        message: t('auth.login.notifications.failed'),
        description: errorMessage,
        icon: <WarningOutlined style={{ color: '#ff4d4f' }} />,
        duration: 3,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      api.info({
        key: 'google-login',
        message: 'Google Login',
        description: 'Connecting to Google...',
        icon: <LoadingOutlined style={{ color: '#1890ff' }} />,
        duration: 0,
      });

      // Use the correct URL format
      window.location.href = `${import.meta.env.VITE_API_URL}/api/v1/auth/google`;
      
    } catch (error) {
      console.error('Google login error:', error);
      api.error({
        key: 'google-login',
        message: 'Login Failed',
        description: 'Failed to connect to Google. Please try again.',
        icon: <WarningOutlined style={{ color: '#ff4d4f' }} />,
        duration: 3,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-lg mx-4">
          <h1 className="text-2xl font-bold text-center mb-6">{t('auth.login.title')}</h1>
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              label={t('auth.login.email')}
              name="username"
              rules={[
                { required: true, message: t('auth.validation.emailRequired') },
                { type: 'email', message: t('auth.validation.emailValid') },
                { 
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('auth.validation.emailValid')
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t('auth.login.password')}
              name="password"
              rules={[
                { required: true, message: t('auth.validation.passwordRequired') },
                { min: 8, message: t('auth.validation.passwordLength') },
                {
                  pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: t('auth.validation.passwordFormat')
                }
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {t('auth.login.loginButton')}
              </Button>
            </Form.Item>

            <Divider>{t('auth.login.or')}</Divider>

            <Button 
              block 
              icon={<GoogleOutlined />} 
              onClick={handleGoogleLogin}
              className="mb-4"
            >
              {t('auth.login.googleButton')}
            </Button>
            
            <div className="text-center text-gray-600">
              {t('auth.login.noAccount')}{' '}
              <Button type="link" onClick={() => navigate('/register')} className="p-0">
                {t('auth.login.registerLink')}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Login; 