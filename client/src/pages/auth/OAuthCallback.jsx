import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { notification } from 'antd';
import { CheckCircleOutlined, WarningOutlined, LoadingOutlined } from '@ant-design/icons';
import axiosInstance from '@config/axios';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const fetchUserData = async (token) => {
      try {
        // Set the token in axios headers
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Fetch user data
        const response = await axiosInstance.get('/api/v1/auth/me');
        
        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to fetch user data');
        }

        const { user } = response.data.data;

        // Login with user data and token
        login(user, token);
        
        api.success({
          message: 'Login Successful',
          description: `Welcome back${user.name ? ', ' + user.name : ''}!`,
          icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
          duration: 3,
        });
        
        navigate('/');
      } catch (error) {
        console.error('Error fetching user data:', error);
        api.error({
          message: 'Login Failed',
          description: 'Failed to fetch user data. Please try again.',
          icon: <WarningOutlined style={{ color: '#ff4d4f' }} />,
          duration: 3,
        });
        navigate('/login');
      }
    };

    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      api.error({
        message: 'Login Failed',
        description: error === 'google_login_failed' ? 'Google login failed. Please try again.' : error,
        icon: <WarningOutlined style={{ color: '#ff4d4f' }} />,
        duration: 3,
      });
      navigate('/login');
      return;
    }

    if (token) {
      // Show loading notification
      api.info({
        key: 'loading',
        message: 'Loading',
        description: 'Fetching your information...',
        icon: <LoadingOutlined style={{ color: '#1890ff' }} />,
        duration: 0,
      });

      fetchUserData(token);
    } else {
      navigate('/login');
    }
  }, [navigate, login, api, searchParams]);

  return (
    <>
      {contextHolder}
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    </>
  );
};

export default OAuthCallback; 