import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { useResponsive } from 'antd-style';

export const ThemeContext = createContext();

// Base colors - Single source of truth for all color definitions
const baseColors = {
  primary: {
    light: '#00b96b',
    dark: '#dde000'
  },
  success: {
    light: '#52c41a',
    dark: '#49aa19'
  },
  warning: {
    light: '#faad14',
    dark: '#d89614'
  },
  error: {
    light: '#ff4d4f',
    dark: '#dc4446'
  },
  info: {
    light: '#1677ff',
    dark: '#177ddc'
  }
};

// Theme tokens - Used by both Ant Design and CSS variables
const getThemeTokens = (mode) => ({
  // Base Ant Design tokens
  colorPrimary: baseColors.primary[mode],
  colorSuccess: baseColors.success[mode],
  colorWarning: baseColors.warning[mode],
  colorError: baseColors.error[mode],
  colorInfo: baseColors.info[mode],

  // Background colors
  colorBgBase: mode === 'light' ? '#ffffff' : '#101319',
  colorBgLayout: mode === 'light' ? '#eeffff' : '#111621',
  colorBgContainer: mode === 'light' ? '#ffffff' : '#1F2634',
  colorBgElevated: mode === 'light' ? '#ffffff' : '#2a3142',
  colorBgSpotlight: mode === 'light' ? '#DFFBEC' : '#242813',
  
  // Text colors
  colorTextBase: mode === 'light' ? '#5b5c5f' : '#afb6c1',
  colorTextPrimary: mode === 'light' ? '#5b5c5f' : '#afb6c1',
  colorTextSecondary: mode === 'light' ? '#8E9DB2' : '#8E9DB2',
  colorTextTertiary: mode === 'light' ? '#a7a7a7' : '#7a7a7a',
  colorTextDisabled: mode === 'light' ? '#00000040' : '#ffffff40',
  
  // Border colors
  colorBorder: mode === 'light' ? '#CCD7E9' : '#313D50',
  colorBorderSecondary: mode === 'light' ? '#E8EEF6' : '#313D50',
  
  // Component specific colors
  headerBg: mode === 'light' ? '#ffffff' : '#1F2634',
  colorBgSider: mode === 'light' ? '#ffffff' : '#1a2438',
  colorBgFooter: mode === 'light' ? '#ffffff' : '#1F2634',
  colorBgCard: mode === 'light' ? '#ffffff' : '#1F2634',
  colorBgInput: mode === 'light' ? '#ffffff' : '#1F2634',
  colorBgButton: mode === 'light' ? '#ffffff' : '#1F2634',
  
  // Additional UI colors
  colorBgHover: mode === 'light' ? '#f5f5f5' : '#2a3142',
  colorBgActive: mode === 'light' ? '#e6e6e6' : '#353f54',
  colorBgMask: mode === 'light' ? 'rgba(0, 0, 0, 0.45)' : 'rgba(0, 0, 0, 0.65)',
  
  // Shadow
  boxShadow: mode === 'light' 
    ? '0 2px 8px rgba(0, 0, 0, 0.15)' 
    : '0 2px 8px rgba(0, 0, 0, 0.35)',
  
  // Border radius
  borderRadius: 6,
  
  // Font
  fontSize: 14,
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
});

export const ThemeProvider = ({ children }) => {
  const { xxl } = useResponsive();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    const tokens = getThemeTokens(isDark ? 'dark' : 'light');
    
    // Set CSS variables
    Object.entries(tokens).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    // Toggle dark mode class for Tailwind
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Ant Design theme configuration
  const theme = {
    token: getThemeTokens(isDark ? 'dark' : 'light'),
    algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    cssVar: true, // Enable CSS variables mode
    hashed: true, // Enable hash classes for better performance
    components: {
      Button: { algorithm: true },
      Input: { algorithm: true },
      Select: { algorithm: true },
      Table: { algorithm: true },
      Card: { algorithm: true },
      Menu: { algorithm: true },
      Layout: { algorithm: true },
      Form: { algorithm: true },
      Dropdown: { algorithm: true },
      Modal: { algorithm: true },
      Drawer: { algorithm: true },
      Message: { algorithm: true },
      Notification: { algorithm: true },
      // Add more components as needed
    },
  };

  return (
    <ConfigProvider theme={theme} componentSize={xxl ? 'middle' : 'small'}>
      <ThemeContext.Provider value={{ isDark, toggleTheme, theme: theme.token }}>
        {children}
      </ThemeContext.Provider>
    </ConfigProvider>
  );
};
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
