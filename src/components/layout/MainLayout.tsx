import React, { useState } from 'react';
import { Layout, Menu, Typography, Tag, Space } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  VideoCameraOutlined,
  SafetyCertificateOutlined,
  QrcodeOutlined,
  BankOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content, Footer } = Layout;
const { Title, Text } = Typography;

export const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/rh',
      icon: <DashboardOutlined />,
      label: 'Dashboard do RH',
    },
    {
      key: '/lider',
      icon: <TeamOutlined />,
      label: 'Portal do Líder',
    },
    {
      key: '/instrutor',
      icon: <VideoCameraOutlined />,
      label: 'Painel do Instrutor',
    },
    {
      key: '/certificados',
      icon: <SafetyCertificateOutlined />,
      label: 'Certificados',
    },
    {
      key: '/validar',
      icon: <QrcodeOutlined />,
      label: 'Validação Pública',
    },
  ];

  // Identifica a chave selecionada no menu
  const selectedKey = menuItems.find((item) =>
    location.pathname.startsWith(item.key)
  )?.key || '/rh';

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <div className="app-logo">
          <BankOutlined style={{ fontSize: 24, color: '#1E40AF' }} />
          <Title level={4} style={{ margin: 0, color: '#1E40AF' }}>
            RH Treinamentos
          </Title>
        </div>

        <Space orientation="horizontal" size="middle">
          <Tag color="blue" icon={<UserOutlined />}>
            Ambiente de Demonstração (Hackathon)
          </Tag>
        </Space>
      </Header>

      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={240}
          className="app-sider"
          theme="light"
        >
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0' }}>
            <Text type="secondary" style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
              {collapsed ? 'RH' : 'Navegação'}
            </Text>
          </div>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            style={{ borderRight: 0, marginTop: 8 }}
          />
        </Sider>

        <Layout style={{ padding: '0' }}>
          <Content
            className="app-content"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#f8fafc',
            }}
          >
            <Outlet />
          </Content>

          <Footer className="app-footer">
            Gestão Inteligente de Treinamentos Internos de RH © 2026 — Plataforma Frontend
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
