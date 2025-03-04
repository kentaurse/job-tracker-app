import { useState, useEffect } from 'react';
import axiosInstance from '@config/axios';
import { useAuth } from './useAuth';

export const useUser = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get('/api/v1/auth/me');
        if (response.data.success) {
          setUserData(response.data.data.user);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message || 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  const refreshUserData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/v1/auth/me');
      if (response.data.success) {
        setUserData(response.data.data.user);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
      setError(error.message || 'Failed to refresh user data');
    } finally {
      setLoading(false);
    }
  };

  return { userData, loading, error, refreshUserData };
}; 