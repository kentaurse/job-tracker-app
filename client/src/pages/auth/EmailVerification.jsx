import { useState, useEffect } from 'react';
import { Form, Input, Button, Card, notification } from 'antd';
import { LoadingOutlined, WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';
import axiosInstance from '@config/axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [api, contextHolder] = notification.useNotification();
  const { t } = useTranslation();
  
  // Get registration data from location state
  const [registrationData, setRegistrationData] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Get registration data from location state
    const data = location.state?.registrationData;
    
    if (!data) {
      navigate('/register');
      return;
    }

    setRegistrationData(data);
  }, [location.state, navigate]);

  useEffect(() => {
    if (!registrationData) return;

    let timer;
    if (countdown > 0 && !canResend) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }

    return () => clearInterval(timer);
  }, [countdown, canResend, registrationData]);

  const onFinish = async (values) => {
    if (!registrationData) {
      navigate('/register');
      return;
    }

    try {
      api.info({
        key: 'verify',
        message: 'Verifying Code',
        description: 'Please wait...',
        icon: <LoadingOutlined style={{ color: '#1890ff' }} />,
        duration: 0,
      });

      const response = await axiosInstance.post('/api/v1/auth/verify-email', {
        email: registrationData.email,
        code: values.verificationCode,
        verificationId: registrationData.verificationId
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      api.success({
        key: 'verify',
        message: 'Verification Successful',
        description: 'Your email has been verified successfully!',
        icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
        duration: 3,
      });

      // Navigate to login page
      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please login with your credentials.' 
        }
      });

    } catch (error) {
      console.error('Verification error:', error);
      api.error({
        key: 'verify',
        message: 'Verification Failed',
        description: error.response?.data?.message || error.message,
        icon: <WarningOutlined style={{ color: '#ff4d4f' }} />,
        duration: 3,
      });
    }
  };

  const handleResendCode = async () => {
    if (!registrationData) {
      navigate('/register');
      return;
    }

    try {
      api.info({
        key: 'resend',
        message: 'Sending Code',
        description: 'Please wait...',
        icon: <LoadingOutlined style={{ color: '#1890ff' }} />,
        duration: 0,
      });

      const response = await axiosInstance.post('/api/v1/auth/resend-verification', {
        email: registrationData.email,
        verificationId: registrationData.verificationId
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      setCountdown(3);
      setCanResend(false);

      api.success({
        key: 'resend',
        message: 'Code Sent',
        description: 'A new verification code has been sent to your email.',
        icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
        duration: 3,
      });

    } catch (error) {
      console.error('Resend error:', error);
      api.error({
        key: 'resend',
        message: 'Failed to Resend',
        description: error.response?.data?.message || error.message,
        icon: <WarningOutlined style={{ color: '#ff4d4f' }} />,
        duration: 3,
      });
    }
  };

  if (!registrationData) {
    return null; // or a loading spinner
  }

  return (
    <>
      {contextHolder}
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <Card className="w-full max-w-lg mx-4">
          <h1 className="text-2xl font-bold text-center mb-6">Verify Your Email</h1>
          <p className="text-center text-gray-600 mb-6">
            We&apos;ve sent a verification code to<br />
            <strong>{registrationData.email}</strong>
          </p>
          
          <Form
            name="verification"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="verificationCode"
              rules={[
                { required: true, message: t('auth.verification.codeRequired') },
                { len: 6, message: t('auth.verification.codeLength') },
                { pattern: /^\d+$/, message: t('auth.verification.codeFormat') }
              ]}
              className='flex justify-center items-center'
            >
              <Input.OTP
                autoFocus
                length={6}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Verify Email
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-4">
            <p className="text-gray-600 mb-2">
              Didn&apos;t receive the code?
            </p>
            <Button 
              type="link" 
              onClick={handleResendCode}
              disabled={!canResend}
            >
              {canResend ? 'Resend Code' : `Resend code in ${countdown}s`}
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default EmailVerification; 