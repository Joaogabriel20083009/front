import React, { useState } from 'react';
import { Layout, Menu, Typography, Tag, Space, Badge } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  VideoCameraOutlined,
  SafetyCertificateOutlined,
  QrcodeOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content, Footer } = Layout;
const { Text } = Typography;

export const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/rh',
      icon: <DashboardOutlined style={{ fontSize: 14 }} />,
      label: 'Dashboard do RH',
    },
    {
      key: '/lider',
      icon: <TeamOutlined style={{ fontSize: 14 }} />,
      label: 'Portal do Líder',
    },
    {
      key: '/instrutor',
      icon: <VideoCameraOutlined style={{ fontSize: 14 }} />,
      label: 'Painel do Instrutor',
    },
    {
      key: '/certificados',
      icon: <SafetyCertificateOutlined style={{ fontSize: 14 }} />,
      label: 'Certificados',
    },
    {
      key: '/validar',
      icon: <QrcodeOutlined style={{ fontSize: 14 }} />,
      label: 'Validação Pública',
    },
  ];

  const selectedKey = menuItems.find((item) =>
    location.pathname.startsWith(item.key)
  )?.key || '/rh';

  return (
    <Layout className="app-layout">
      {/* Header Minimalista */}
      <Header className="app-header">
        <div className="app-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/rh')}>
          <img
            src="https://linsagro.com.br/wp-content/uploads/2022/07/cropped-Lins_Logo_Horizontal_RGB_Preferencial_20250512_Keenwork_AF.png"
            alt="Lins Agroindustrial"
            className="app-brand-logo"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <div className="app-brand-divider" />
          <div className="app-brand-text">
            <span className="app-brand-title">Treinamentos RH</span>
            <span className="app-brand-subtitle">Universidade Corporativa</span>
          </div>
        </div>

        <Space size="middle">
          <Badge status="processing" color="#00B5AD" text={
            <span style={{ fontSize: 12, color: '#64748b' }}>
              Safra 2026/27
            </span>
          } />

          <Tag
            color="default"
            icon={<EnvironmentOutlined style={{ color: '#0032A0', fontSize: 11 }} />}
            style={{
              padding: '2px 8px',
              borderRadius: 4,
              fontSize: 11.5,
              borderColor: '#e2e8f0',
              backgroundColor: '#f8fafc',
              color: '#475569',
            }}
          >
            Lins/SP
          </Tag>
        </Space>
      </Header>

      <Layout>
        {/* Menu Lateral Compacto */}
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={210}
          className="app-sider"
          theme="light"
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            style={{ borderRight: 0, marginTop: 10 }}
          />
        </Sider>

        <Layout style={{ background: '#f8fafc' }}>
          <Content className="app-content">
            <Outlet />
          </Content>

          <Footer className="app-footer">
            <Text type="secondary" style={{ fontSize: 11.5 }}>
              Lins Agroindustrial S/A • Recursos Humanos © 2026
            </Text>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
