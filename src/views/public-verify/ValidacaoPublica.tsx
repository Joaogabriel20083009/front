import React, { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
  Space,
  Result,
  Descriptions,
  Divider,
  Tag,
  Alert,
} from 'antd';
import {
  QrcodeOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import type { Certificate } from '../../lib/types/certificate';

const { Title, Text } = Typography;
const { Search } = Input;

const validCertificatesDatabase: Record<string, Certificate> = {
  'LINS-NR13-2026-X8892': {
    id: 'cert-1',
    code: 'LINS-NR13-2026-X8892',
    employeeName: 'José Aparecido da Silva',
    employeeDocument: 'MAT-14829',
    trainingTitle: 'NR-13: Segurança Operacional em Caldeiras e Destilaria',
    workloadHours: 16,
    issueDate: '2026-10-18',
    completionDate: '2026-10-17',
    instructorName: 'Dra. Camila Toledo',
    isValid: true,
  },
  'LINS-NR31-2026-B3419': {
    id: 'cert-2',
    code: 'LINS-NR31-2026-B3419',
    employeeName: 'Anderson Rodrigo Lima',
    employeeDocument: 'MAT-12903',
    trainingTitle: 'NR-31: Segurança e Saúde no Trabalho Agroindustrial',
    workloadHours: 20,
    issueDate: '2026-10-15',
    completionDate: '2026-10-14',
    instructorName: 'Eng. Roberto Vasconcelos',
    isValid: true,
  },
};

export const ValidacaoPublica: React.FC = () => {
  const [queryCode, setQueryCode] = useState('');
  const [verifiedCert, setVerifiedCert] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (value: string) => {
    const cleanCode = value.trim().toUpperCase();
    setSearched(true);
    if (validCertificatesDatabase[cleanCode]) {
      setVerifiedCert(validCertificatesDatabase[cleanCode]);
    } else {
      setVerifiedCert(null);
    }
  };

  const handleSimulateQRCode = () => {
    const demoCode = 'LINS-NR13-2026-X8892';
    setQueryCode(demoCode);
    handleSearch(demoCode);
  };

  return (
    <div style={{ maxWidth: 640, margin: '20px auto 0', padding: '0 8px' }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <img
          src="https://linsagro.com.br/wp-content/uploads/2022/07/cropped-Lins_Logo_Horizontal_RGB_Preferencial_20250512_Keenwork_AF.png"
          alt="Lins Agroindustrial"
          style={{ height: 34, objectFit: 'contain', marginBottom: 8 }}
        />
        <Title level={4} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>
          Validação Pública de Certificados
        </Title>
        <Text type="secondary" style={{ fontSize: 12.5 }}>
          Autenticidade de certificações emitidas pela Lins Agroindustrial
        </Text>
      </div>

      <Card variant="borderless" className="lins-card" styles={{ body: { padding: '16px' } }} style={{ marginBottom: 16 }}>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Text strong style={{ color: '#334155', fontSize: 12.5 }}>
            Código autenticador:
          </Text>
          <Search
            placeholder="Ex: LINS-NR13-2026-X8892"
            enterButton="Validar"
            size="middle"
            value={queryCode}
            onChange={(e) => setQueryCode(e.target.value)}
            onSearch={handleSearch}
          />

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <Button
              icon={<QrcodeOutlined style={{ color: '#00B5AD' }} />}
              type="link"
              size="small"
              onClick={handleSimulateQRCode}
              style={{ fontSize: 12, color: '#0032A0' }}
            >
              Simular leitura de QR Code
            </Button>
          </div>
        </Space>
      </Card>

      {searched && (
        <Card variant="borderless" className="lins-card" styles={{ body: { padding: '16px' } }}>
          {verifiedCert ? (
            <Result
              status="success"
              title={<span style={{ color: '#0032A0', fontWeight: 700, fontSize: 16 }}>Certificado Válido</span>}
              subTitle={<span style={{ color: '#64748b', fontSize: 12 }}>Registro oficial <strong>{verifiedCert.code}</strong></span>}
              extra={[
                <div key="details" style={{ textAlign: 'left', marginTop: 12 }}>
                  <Divider style={{ margin: '8px 0 14px', borderColor: '#e2e8f0' }} />
                  <Descriptions
                    bordered
                    size="small"
                    column={{ xs: 1, sm: 2 }}
                  >
                    <Descriptions.Item label="Colaborador">
                      <strong style={{ color: '#0032A0' }}>{verifiedCert.employeeName}</strong>
                    </Descriptions.Item>
                    <Descriptions.Item label="Identificação">
                      {verifiedCert.employeeDocument}
                    </Descriptions.Item>
                    <Descriptions.Item label="Treinamento" span={2}>
                      <strong>{verifiedCert.trainingTitle}</strong>
                    </Descriptions.Item>
                    <Descriptions.Item label="Carga">
                      {verifiedCert.workloadHours} horas
                    </Descriptions.Item>
                    <Descriptions.Item label="Conclusão">
                      {verifiedCert.completionDate}
                    </Descriptions.Item>
                    <Descriptions.Item label="Instrutor" span={2}>
                      {verifiedCert.instructorName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={2}>
                      <Tag color="cyan" icon={<CheckCircleOutlined />} style={{ borderRadius: 3, fontSize: 11 }}>
                        Ativo e Conforme
                      </Tag>
                    </Descriptions.Item>
                  </Descriptions>
                </div>,
              ]}
            />
          ) : (
            <Result
              status="error"
              title={<span style={{ fontSize: 15 }}>Não Encontrado</span>}
              subTitle={<span style={{ fontSize: 12 }}>O código não corresponde a nenhum certificado ativo.</span>}
              extra={[
                <Alert
                  key="alert"
                  message="Dica"
                  description="Verifique o código impresso no certificado (Ex: LINS-NR13-2026-X8892)."
                  type="warning"
                  showIcon
                  style={{ borderRadius: 4, textAlign: 'left', fontSize: 12 }}
                />,
              ]}
            />
          )}
        </Card>
      )}
    </div>
  );
};
