import React, { useState } from "react";
import { Card, Badge, Row, Col, Button, Typography, Tag, Space } from "antd";
import { HeartOutlined, HeartFilled, GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const { Title, Text } = Typography;

const Lobby = ({ roadmap }) => {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState([]);

  const tables = [
    {
      id: 1,
      name: "繁栄の木バカラ",
      players: 253,
      minBet: 200,
      status: "active",
      roadmap: Array(15)
        .fill(null)
        .map(() => (Math.random() > 0.5 ? "P" : "B")),
      isNew: false,
    },
    {
      id: 2,
      name: "ライトニングバカラ",
      players: 485,
      minBet: 200,
      status: "active",
      roadmap: Array(15)
        .fill(null)
        .map(() => (Math.random() > 0.5 ? "P" : "B")),
      isNew: false,
    },
    {
      id: 3,
      name: "ゴールデンウェルスバカラ",
      players: 350,
      minBet: 200,
      status: "active",
      roadmap: Array(15)
        .fill(null)
        .map(() => (Math.random() > 0.5 ? "P" : "B")),
      isNew: false,
    },
    {
      id: 4,
      name: "日本語ゴールデンウェルス",
      players: 11,
      minBet: 200,
      status: "active",
      roadmap: Array(15)
        .fill(null)
        .map(() => (Math.random() > 0.5 ? "P" : "B")),
      isNew: true,
    },
    {
      id: 5,
      name: "ライトニングドラゴンタイガー",
      players: 418,
      minBet: 100,
      status: "active",
      roadmap: Array(15)
        .fill(null)
        .map(() => (Math.random() > 0.5 ? "D" : "T")),
      isNew: true,
    },
  ];

  const toggleFavorite = (tableId) => {
    setFavorites((prev) =>
      prev.includes(tableId)
        ? prev.filter((id) => id !== tableId)
        : [...prev, tableId]
    );
  };

  const RoadmapDisplay = ({ roadmap }) => (
    <div className="flex gap-1">
      {roadmap.map((result, index) => (
        <div
          key={index}
          className={`w-4 h-4 text-xs flex items-center justify-center rounded
            ${
              result === "P"
                ? "bg-blue-500 text-white"
                : result === "B"
                ? "bg-red-500 text-white"
                : "bg-yellow-500 text-white"
            }`}
        >
          {result}
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-2">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Space>
            <Button type="text" icon={<GlobalOutlined />}>
              {t("lobby.favorites")}
            </Button>
            <Tag color="blue">{t("lobby.newDealer")}</Tag>
          </Space>
        </div>

        <Row gutter={[16, 16]}>
          {tables.map((table) => (
            <Col xs={24} sm={12} md={8} lg={6} key={table.id}>
              <Card
                className="h-full relative hover:shadow-lg transition-shadow"
                cover={
                  <div className="relative h-48 bg-gray-800">
                    {/* Placeholder for table video/image */}
                    <div className="absolute top-2 right-2">
                      <Button
                        type="text"
                        icon={
                          favorites.includes(table.id) ? (
                            <HeartFilled className="text-red-500" />
                          ) : (
                            <HeartOutlined />
                          )
                        }
                        onClick={() => toggleFavorite(table.id)}
                      />
                    </div>
                    {table.isNew && (
                      <div className="absolute top-2 left-2">
                        <Tag color="red">{t('lobby.new')}</Tag>
                      </div>
                      //   <Badge.Ribbon text={t('lobby.new')} color="red" />
                    )}
                  </div>
                }
              >
                <div className="space-y-2">
                  <Title level={5} className="m-0">
                    {table.name}
                  </Title>
                  <div className="flex justify-between items-center">
                    <Text type="secondary">¥{table.minBet}</Text>
                    <Text type="secondary">👥 {table.players}</Text>
                  </div>
                  <RoadmapDisplay roadmap={table.roadmap} />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

Lobby.propTypes = {
  roadmap: PropTypes.arrayOf(
    PropTypes.shape({
      // Add the specific shape of your roadmap items here
      // For example:
      id: PropTypes.number,
      // Add other properties that exist in your roadmap items
    })
  ),
};

Lobby.defaultProps = {
  roadmap: [], // Provide a default empty array if roadmap is not passed
};

export default Lobby;
