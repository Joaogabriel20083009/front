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
      icon: <DashboardOutlined style={{ fontSize: 16 }} />,
      label: 'Dashboard do RH',
    },
    {
      key: '/lider',
      icon: <TeamOutlined style={{ fontSize: 16 }} />,
      label: 'Portal do Líder',
    },
    {
      key: '/instrutor',
      icon: <VideoCameraOutlined style={{ fontSize: 16 }} />,
      label: 'Painel do Instrutor',
    },
    {
      key: '/certificados',
      icon: <SafetyCertificateOutlined style={{ fontSize: 16 }} />,
      label: 'Certificados Digitais',
    },
    {
      key: '/validar',
      icon: <QrcodeOutlined style={{ fontSize: 16 }} />,
      label: 'Validação Pública',
    },
  ];

  // Identifica a chave selecionada no menu
  const selectedKey = menuItems.find((item) =>
    location.pathname.startsWith(item.key)
  )?.key || '/rh';

  return (
    <Layout className="app-layout">
      {/* Header Corporativo Lins Agroindustrial */}
      <Header className="app-header">
        <div className="app-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/rh')}>
          <img
            src="https://linsagro.com.br/wp-content/uploads/2022/07/cropped-Lins_Logo_Horizontal_RGB_Preferencial_20250512_Keenwork_AF.png"
            alt="Lins Agroindustrial"
            className="app-brand-logo"
            onError={(e) => {
              // Fallback se a imagem externa não carregar
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <div className="app-brand-divider" />
          <div className="app-brand-text">
            <span className="app-brand-title">Gestão de Treinamentos</span>
            <span className="app-brand-subtitle">Universidade Corporativa RH</span>
          </div>
        </div>

        <Space size="large">
          <Badge status="processing" color="#00B5AD" text={
            <span style={{ fontSize: 13, color: '#54595F' }}>
              Safra 2026/27
            </span>
          } />

          <Tag
            color="default"
            icon={<EnvironmentOutlined style={{ color: '#0032A0' }} />}
            style={{
              padding: '4px 10px',
              borderRadius: 4,
              borderColor: '#e7e7e7',
              backgroundColor: '#f8fbfd',
              color: '#184080',
              fontWeight: 500,
            }}
          >
            Unidade Agroindustrial Lins/SP
          </Tag>
        </Space>
      </Header>

      <Layout>
        {/* Menu Lateral Clean */}
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={250}
          className="app-sider"
          theme="light"
        >
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #f2f5f7' }}>
            <Text type="secondary" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, color: '#8c9ba5' }}>
              {collapsed ? 'MENU' : 'MÓDULOS DE CAPACITAÇÃO'}
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

        <Layout style={{ background: '#f8fbfd' }}>
          <Content className="app-content">
            <Outlet />
          </Content>

          <Footer className="app-footer">
            <Text type="secondary" style={{ fontSize: 12.5 }}>
              <strong>Lins Agroindustrial S/A</strong> • Diretoria de Recursos Humanos e Relações Trabalhistas © 2026
            </Text>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
