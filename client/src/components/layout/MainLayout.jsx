import { Layout } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";
import { themeConfig } from "@config/theme";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout
        style={{
          marginLeft: collapsed
            ? themeConfig.sidebarWidth.collapsed
            : themeConfig.sidebarWidth.expanded,
        }}
      >
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout.Content className="p-6 bg-bg-layout">
          <div className="bg-bg-container rounded-lg p-6 min-h-full">
            {children}
          </div>
        </Layout.Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
