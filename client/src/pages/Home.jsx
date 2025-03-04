import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Space, Card, Row, Col } from 'antd';
import { CameraOutlined, SettingOutlined } from '@ant-design/icons';
import { useAppContext } from '../contexts/AppContext';

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const { startNewSession } = useAppContext();

  const handleStartSession = async () => {
    try {
      await startNewSession();
      navigate('/setup');
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card className="shadow-lg">
            <div className="text-center mb-8">
              <Title level={1}>AI Photography Studio</Title>
              <Paragraph className="text-lg">
                Welcome to the Virtual AI Photographer experience. Our AI will guide you through
                a professional photo session and create amazing photos and videos.
              </Paragraph>
            </div>

            <Row gutter={[16, 16]} justify="center">
              <Col xs={24} md={12}>
                <Card 
                  hoverable 
                  className="text-center h-full"
                  cover={<CameraOutlined className="text-6xl mt-6" />}
                >
                  <Title level={3}>Start Photo Session</Title>
                  <Paragraph>
                    Begin a new photo session with our AI photographer
                  </Paragraph>
                  <Button type="primary" size="large" onClick={handleStartSession}>
                    Start Session
                  </Button>
                </Card>
              </Col>
              
              <Col xs={24} md={12}>
                <Card 
                  hoverable 
                  className="text-center h-full"
                  cover={<SettingOutlined className="text-6xl mt-6" />}
                >
                  <Title level={3}>Admin Panel</Title>
                  <Paragraph>
                    Configure AI models, scenarios, and camera settings
                  </Paragraph>
                  <Button size="large" onClick={() => navigate('/admin')}>
                    Open Admin Panel
                  </Button>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home; 