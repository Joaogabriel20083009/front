import React, { useState } from 'react';
import { Layout, Menu, Typography, Tag, Space, Badge, Button, Drawer } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  VideoCameraOutlined,
  SafetyCertificateOutlined,
  QrcodeOutlined,
  EnvironmentOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content, Footer } = Layout;
const { Text } = Typography;

export const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
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

  const handleMenuClick = (key: string) => {
    navigate(key);
    setMobileDrawerOpen(false);
  };

  return (
    <Layout className="app-layout">
      {/* Header Responsivo */}
      <Header className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 16, color: '#0032a0' }} />}
            className="mobile-menu-btn"
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Abrir Menu de Navegação"
            style={{ padding: 4 }}
          />

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
        </div>

        <Space size="middle" className="header-meta-tags">
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
        {/* Menu Lateral Desktop com Autocollapse em Telas Médias */}
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          breakpoint="lg"
          collapsedWidth={0}
          width={210}
          className="app-sider desktop-sider"
          theme="light"
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={({ key }) => handleMenuClick(key)}
            style={{ borderRight: 0, marginTop: 10 }}
          />
        </Sider>

        {/* Drawer de Navegação Mobile */}
        <Drawer
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#0032a0', fontWeight: 700, fontSize: 14 }}>Menu de Navegação</span>
            </div>
          }
          placement="left"
          onClose={() => setMobileDrawerOpen(false)}
          open={mobileDrawerOpen}
          width={260}
          styles={{ body: { padding: '12px 8px' } }}
        >
          <div style={{ padding: '4px 12px 14px', borderBottom: '1px solid #f1f5f9', marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0032a0' }}>Lins Agroindustrial</div>
            <div style={{ fontSize: 11, color: '#00B5AD', fontWeight: 600 }}>Universidade Corporativa RH</div>
          </div>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={({ key }) => handleMenuClick(key)}
            style={{ borderRight: 0 }}
          />
        </Drawer>

        <Layout style={{ background: '#f8fafc', overflow: 'hidden' }}>
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
