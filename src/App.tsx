import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, App as AntdApp } from 'antd';
import ptBR from 'antd/locale/pt_BR';
import { AppRoutes } from './routes';
import './App.css';

export const App: React.FC = () => {
  return (
    <ConfigProvider
      locale={ptBR}
      theme={{
        token: {
          colorPrimary: '#0032A0',
          colorSuccess: '#00B5AD',
          colorWarning: '#F59E0B',
          colorError: '#DC2626',
          colorInfo: '#3063D6',
          colorText: '#3D3D3D',
          colorTextHeading: '#184080',
          borderRadius: 6,
          fontFamily: "'Noto Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          colorBgLayout: '#F8FBFD',
          colorBorderSecondary: '#E7E7E7',
        },
        components: {
          Card: {
            borderRadiusLG: 8,
            boxShadowTertiary: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
          },
          Button: {
            borderRadius: 6,
            controlHeight: 38,
            fontWeight: 500,
          },
          Table: {
            headerBg: '#F2F5F7',
            headerColor: '#184080',
            rowHoverBg: '#F8FBFD',
          },
          Menu: {
            itemSelectedBg: '#EBF2FF',
            itemSelectedColor: '#0032A0',
            itemHoverBg: '#F2F5F7',
          },
        },
      }}
    >
      <AntdApp>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
