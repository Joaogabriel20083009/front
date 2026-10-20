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
          colorPrimary: '#1E40AF',
          colorSuccess: '#10B981',
          colorWarning: '#F59E0B',
          colorError: '#EF4444',
          colorInfo: '#0284C7',
          borderRadius: 8,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          colorBgLayout: '#F8FAFC',
        },
        components: {
          Card: {
            borderRadiusLG: 10,
          },
          Button: {
            borderRadius: 6,
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
