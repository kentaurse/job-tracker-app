import {
  Layout,
  Button,
  Avatar,
  Dropdown,
  Badge,
  Space,
  Input,
  Switch,
} from "antd";
import { useTheme } from "@hooks/useTheme";
import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  GlobalOutlined,
  MessageOutlined,
  SunOutlined,
  MoonOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Header: AntHeader } = Layout;
const { Search } = Input;

const Header = ({ collapsed, setCollapsed }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const notifications = [
    {
      key: "1",
      label: "New deposit request #123",
      description: "$1,000.00 deposit pending approval",
      time: "2 minutes ago",
      onClick: () => navigate("/finance/deposits"),
    },
    {
      key: "2",
      label: "Withdrawal completed #456",
      description: "$500.00 has been processed",
      time: "5 minutes ago",
      onClick: () => navigate("/finance/withdrawals"),
    },
  ];

  const messages = [
    {
      key: "1",
      title: "New Message",
      content: "You have a new message from support",
      time: "1 minute ago",
    },
    {
      key: "2",
      title: "System Message",
      content: "System maintenance scheduled",
      time: "1 hour ago",
    },
  ];

  const languages = [
    { key: "ja", label: "日本語", onClick: () => i18n.changeLanguage("ja") },
    { key: "en", label: "English", onClick: () => i18n.changeLanguage("en") },
  ];

  const userMenuItems = [
    {
      key: "account",
      label: (
        <div className="py-2 px-4">
          <div className="font-semibold">{user?.name}</div>
          <div className="text-sm text-gray-500">{user?.email}</div>
        </div>
      ),
    },
    { type: "divider" },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: t("menu.profile"),
      onClick: () => navigate("/settings/profile"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: t("menu.settings"),
      onClick: () => navigate("/settings/account"),
    },
    { type: "divider" },
    {
      key: "help",
      icon: <QuestionCircleOutlined />,
      label: t("menu.help"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: t("menu.logout"),
      onClick: logout,
    },
  ];

  return (
    <AntHeader className="flex items-center justify-between px-6 backdrop-blur-sm border-b border-border-base sticky top-0 z-10">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className="rounded-full"
      />

      <Search
        placeholder={t("search.placeholder")}
        allowClear
        className="w-[300px] max-w-[500px] flex-grow rounded-full hidden md:inline mx-auto px-2"
      />

      <div className="flex items-center space-x-4">
        <Space size="large">
          <Button
            type="text"
            icon={<SearchOutlined className="text-sm" />}
            className="rounded-full md:hidden"
          />
          {/* <Switch
            checkedChildren={<SunOutlined className="text-sm"/>}
            unCheckedChildren={<MoonOutlined className="text-sm"/>}
            checked={isDark}
            onChange={toggleTheme}
            style={{
              backgroundColor: "var(--colorPrimary)",
            }}
          /> */}
          <Button
            type="text"
            icon={
              isDark ? (
                <SunOutlined className="text-sm" />
              ) : (
                <MoonOutlined className="text-sm" />
              )
            }
            onClick={toggleTheme}
            className={`rounded-full duration-300 transition-transform ${
              isDark ? "-rotate-180" : "rotate-0"
            }`}
          />

          <Dropdown
            menu={{
              items: languages,
              selectable: true,
              selectedKeys: [i18n.language],
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button
              type="text"
              className="rounded-full"
              icon={<GlobalOutlined />}
            />
          </Dropdown>

          <Dropdown
            menu={{
              items: messages.map((msg) => ({
                key: msg.key,
                label: (
                  <div>
                    <div className="font-semibold">{msg.title}</div>
                    <div className="text-sm">{msg.content}</div>
                    <div className="text-xs mt-1">{msg.time}</div>
                  </div>
                ),
              })),
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Badge count={messages.length}>
              <Button
                type="text"
                className="rounded-full"
                icon={<MessageOutlined />}
              />
            </Badge>
          </Dropdown>

          <Dropdown
            menu={{
              items: notifications.map((notif) => ({
                key: notif.key,
                label: (
                  <div onClick={notif.onClick}>
                    <div className="font-semibold">{notif.label}</div>
                    <div className="text-sm">{notif.description}</div>
                    <div className="text-xs mt-1">{notif.time}</div>
                  </div>
                ),
              })),
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Badge count={notifications.length}>
              <Button
                type="text"
                className="rounded-full"
                icon={<BellOutlined />}
              />
            </Badge>
          </Dropdown>

          <Dropdown
            menu={{
              items: userMenuItems,
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Space className="flex items-center justify-center cursor-pointer">
              <Avatar src={user?.avatar} icon={<UserOutlined />} />
            </Space>
          </Dropdown>
        </Space>
      </div>
    </AntHeader>
  );
};

Header.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
};

export default Header;
