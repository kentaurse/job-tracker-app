import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const onDashboard = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={onDashboard}>Back Home</Button>}
      />
    </div>
  );
};

export default ErrorPage;
