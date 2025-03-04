import { Form, Input, Button, Card, Divider, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { GoogleOutlined, LoadingOutlined, WarningOutlined } from "@ant-design/icons";
import axiosInstance from "@config/axios";
import { useAuth } from "@contexts/AuthContext";
import { useTranslation } from 'react-i18next';

const Register = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const { t } = useTranslation();

  const onFinish = async (values) => {
    try {
      api.info({
        key: 'register',
        message: t('auth.register.notifications.creating'),
        description: t('auth.register.notifications.verifying'),
        icon: <LoadingOutlined style={{ color: '#1890ff' }} />,
        duration: 0,
      });

      const response = await axiosInstance.post('/api/v1/auth/register', {
        name: values.username,
        email: values.email,
        password: values.password,
        role: 'user'
      });

      if (!response.data.success) {
        throw new Error(response.data.message || 'Registration failed');
      }

      api.success({
        key: 'register',
        message: t('auth.register.notifications.codeSent'),
        description: t('auth.register.notifications.checkEmail'),
        duration: 3,
      });

      navigate('/verify-email', {
        state: {
          registrationData: {
            name: values.username,
            email: values.email,
            password: values.password,
            verificationId: response.data.data.verificationId
          }
        }
      });

    } catch (error) {
      console.error('Registration error:', error);
      api.error({
        key: 'register',
        message: t('auth.register.notifications.failed'),
        description: error.response?.data?.message || error.message,
        icon: <WarningOutlined style={{ color: '#ff4d4f' }} />,
        duration: 3,
      });
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/v1/auth/google`;
  };

  return (
    <>
      {contextHolder}
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-lg mx-4">
          <h1 className="text-2xl font-bold text-center mb-6">{t('auth.register.title')}</h1>
          <Form
            name="register"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              label={t('auth.register.username')}
              name="username"
              rules={[
                { required: true, message: t('auth.validation.usernameRequired') },
                { min: 3, message: t('auth.validation.usernameLength') }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t('auth.register.email')}
              name="email"
              rules={[
                { required: true, message: t('auth.validation.emailRequired') },
                { type: 'email', message: t('auth.validation.emailValid') }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t('auth.register.password')}
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

            <Form.Item
              label={t('auth.register.confirmPassword')}
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: t('auth.validation.confirmRequired') },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t('auth.validation.passwordsMatch'))
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {t('auth.register.registerButton')}
              </Button>
            </Form.Item>

            <Divider>{t('auth.register.or')}</Divider>

            <Button
              block
              icon={<GoogleOutlined />}
              onClick={handleGoogleLogin}
              className="mb-4"
            >
              {t('auth.register.googleButton')}
            </Button>

            <div className="text-center text-gray-600">
              {t('auth.register.haveAccount')}{' '}
              <Button
                type="link"
                onClick={() => navigate('/login')}
                className="p-0"
              >
                {t('auth.register.loginLink')}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Register;
