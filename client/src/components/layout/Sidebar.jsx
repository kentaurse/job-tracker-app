import { Layout, Menu } from "antd";
import { useTheme } from "@hooks/useTheme";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  DashboardOutlined,
  TableOutlined,
  BarChartOutlined,
  TeamOutlined,
  SettingOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { themeConfig } from "@config/theme";

const { Sider: AntSider } = Layout;

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { theme, isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "game",
      icon: <TableOutlined />,
      label: "Game Management",
      children: [
        {
          key: "/game/tables",
          label: "Game Tables",
        },
        {
          key: "/game/history",
          label: "Game History",
        },
      ],
    },
    {
      key: "finance",
      icon: <BankOutlined />,
      label: "Finance",
      children: [
        {
          key: "/finance/deposits",
          label: "Deposits",
        },
        {
          key: "/finance/withdrawals",
          label: "Withdrawals",
        },
        {
          key: "/finance/transactions",
          label: "Transactions",
        },
      ],
    },
    {
      key: "users",
      icon: <TeamOutlined />,
      label: "User Management",
      children: [
        {
          key: "/users/list",
          label: "User List",
        },
        {
          key: "/users/roles",
          label: "Roles & Permissions",
        },
      ],
    },
    {
      key: "reports",
      icon: <BarChartOutlined />,
      label: "Reports",
      children: [
        {
          key: "/reports/financial",
          label: "Financial Reports",
        },
        {
          key: "/reports/gaming",
          label: "Gaming Reports",
        },
        {
          key: "/reports/user",
          label: "User Reports",
        },
      ],
    },
    {
      key: "system",
      icon: <SettingOutlined />,
      label: "System",
      children: [
        {
          key: "/system/settings",
          label: "Settings",
        },
        {
          key: "/system/logs",
          label: "System Logs",
        },
        {
          key: "/system/maintenance",
          label: "Maintenance",
        },
      ],
    },
  ];

  // Filter menu items based on user role/permissions
  const filteredItems = menuItems.filter((item) => {
    // Add your permission logic here
    return true; // For now, show all items
  });
  
  return (
    <AntSider
      width={themeConfig.sidebarWidth.expanded}
      collapsedWidth={themeConfig.sidebarWidth.collapsed}
      breakpoint="lg"
      collapsed={collapsed}
      onCollapse={setCollapsed}
      className="h-screen left-0 top-0 bottom-0 border-r border-border-base"
      style={{
        position: "fixed",
        background: 'var(--colorBgSider)',
      }}
    >
      <div className="logo p-4 flex items-center justify-center">
        <img src={"/vite.svg"} alt="Logo" className="h-8" />
        <h1 style={{ display: collapsed ? "none" : "block" }}>PS</h1>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        // defaultOpenKeys={["game", "finance", "users", "reports", "system"]}
        items={filteredItems}
        onClick={({ key }) => navigate(key)}
      />
    </AntSider>
  );
};

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
};

export default Sidebar;
