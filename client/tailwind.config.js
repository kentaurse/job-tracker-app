/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--colorPrimary)',
        success: 'var(--colorSuccess)',
        warning: 'var(--colorWarning)',
        error: 'var(--colorError)',
        info: 'var(--colorInfo)',
        blue: 'var(--ant-blue)',
        purple: 'var(--ant-purple)',
        cyan: 'var(--ant-cyan)',
        green: 'var(--ant-green)',
        magenta: 'var(--ant-magenta)',
        pink: 'var(--ant-pink)',
        red: 'var(--ant-red)',
        orange: 'var(--ant-orange)',
        yellow: 'var(--ant-yellow)',
        volcano: 'var(--ant-volcano)',
        geekblue: 'var(--ant-geekblue)',
        gold: 'var(--ant-gold)',
        lime: 'var(--ant-lime)',
        
        bg: {
          base: 'var(--colorBgBase)',
          layout: 'var(--colorBgLayout)',
          container: 'var(--colorBgContainer)',
          elevated: 'var(--colorBgElevated)',
          spotlight: 'var(--colorBgSpotlight)',
          header: 'var(--headerBg)',
          sider: 'var(--colorBgSider)',
          footer: 'var(--colorBgFooter)',
          card: 'var(--colorBgCard)',
          input: 'var(--colorBgInput)',
          button: 'var(--colorBgButton)',
          hover: 'var(--colorBgHover)',
          active: 'var(--colorBgActive)',
          mask: 'var(--colorBgMask)',
        },
        
        text: {
          base: 'var(--colorTextBase)',
          primary: 'var(--colorTextPrimary)',
          secondary: 'var(--colorTextSecondary)',
          tertiary: 'var(--colorTextTertiary)',
          disabled: 'var(--colorTextDisabled)',
        },
        
        border: {
          base: 'var(--colorBorder)',
          secondary: 'var(--colorBorderSecondary)',
        },
      },
      boxShadow: {
        custom: 'var(--boxShadow)',
      },
      borderRadius: {
        custom: 'var(--borderRadius)',
      },
      fontSize: {
        base: 'var(--fontSize)',
      },
      fontFamily: {
        sans: 'var(--fontFamily)',
      },
    },
  },
  plugins: [],
}