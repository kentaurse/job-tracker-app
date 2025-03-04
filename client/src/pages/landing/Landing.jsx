import React from "react";
import { Card, Row, Col, Typography, Tag, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Landing = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const tables = [
    {
      id: 1,
      name: "繁栄の木バカラ",
      players: 253,
      minBet: 200,
      image: "/images/baccarat-table1.jpg",
    },
    {
      id: 2,
      name: "ライトニングバカラ",
      players: 485,
      minBet: 200,
      image: "/images/baccarat-table2.jpg",
    },
    {
      id: 3,
      name: "ゴールデンウェルスバカラ",
      players: 350,
      minBet: 200,
      image: "/images/baccarat-table3.jpg",
    },
    {
      id: 4,
      name: "日本語ゴールデンウェルス",
      players: 11,
      minBet: 200,
      image: "/images/baccarat-table4.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-layout">
      <Row className="h-[calc(100vh)] p-2">
        {tables.map((table, index) => (
          <Col xs={24} sm={12} className="h-1/2" key={table.id}>
            <div
              className="h-full p-2 cursor-pointer"
              onClick={() => navigate("/lobby")}
            >
              <Card
                hoverable
                className="h-full bg-gray-800 border-0 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <Text className="text-white text-lg font-bold block">
                    {table.name}
                  </Text>
                  <div className="flex justify-between text-white/80 mt-2">
                    <span>¥{table.minBet}</span>
                    <span>👥 {table.players}</span>
                  </div>
                </div>
                {/* Add a roadmap display here if needed */}
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Landing;
