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

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const validCertificatesDatabase: Record<string, Certificate> = {
  'LINS-NR13-2026-X8892': {
    id: 'cert-1',
    code: 'LINS-NR13-2026-X8892',
    employeeName: 'José Aparecido da Silva',
    employeeDocument: 'Matrícula: MAT-14829',
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
    employeeDocument: 'Matrícula: MAT-12903',
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
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <img
          src="https://linsagro.com.br/wp-content/uploads/2022/07/cropped-Lins_Logo_Horizontal_RGB_Preferencial_20250512_Keenwork_AF.png"
          alt="Lins Agroindustrial"
          style={{ height: 44, objectFit: 'contain', marginBottom: 12 }}
        />
        <Title level={2} className="lins-page-title" style={{ margin: 0, fontSize: 24 }}>
          Portal de Validação Pública de Certificados
        </Title>
        <Paragraph type="secondary" style={{ marginTop: 6, color: '#54595F', fontSize: 14 }}>
          Consulte e comprove a autenticidade de certificações emitidas pela Universidade Corporativa da Lins Agroindustrial.
        </Paragraph>
      </div>

      <Card bordered={false} className="lins-card" style={{ marginBottom: 24, padding: '12px 16px' }}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Text strong style={{ color: '#184080', fontSize: 14 }}>
            Informe o código autenticador do certificado:
          </Text>
          <Search
            placeholder="Ex: LINS-NR13-2026-X8892"
            enterButton="Validar Certificado"
            size="large"
            value={queryCode}
            onChange={(e) => setQueryCode(e.target.value)}
            onSearch={handleSearch}
          />

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
            <Button
              icon={<QrcodeOutlined style={{ color: '#00B5AD' }} />}
              type="dashed"
              onClick={handleSimulateQRCode}
              style={{ borderRadius: 6, color: '#184080' }}
            >
              Simular Leitura de QR Code
            </Button>
          </div>
        </Space>
      </Card>

      {searched && (
        <Card bordered={false} className="lins-card">
          {verifiedCert ? (
            <Result
              status="success"
              title={<span style={{ color: '#0032A0', fontWeight: 700 }}>Certificado Autêntico e Registrado</span>}
              subTitle={<span style={{ color: '#54595F' }}>Registro oficial ativo na base da Lins Agroindustrial sob o código <strong>{verifiedCert.code}</strong></span>}
              extra={[
                <div key="details" style={{ textAlign: 'left', marginTop: 16 }}>
                  <Divider style={{ margin: '12px 0 20px', borderColor: '#e7e7e7' }} />
                  <Descriptions
                    title={<span style={{ color: '#184080', fontSize: 15 }}>Dados Oficiais de Capacitação</span>}
                    bordered
                    size="middle"
                    column={{ xs: 1, sm: 2 }}
                  >
                    <Descriptions.Item label="Colaborador">
                      <strong style={{ color: '#0032A0' }}>{verifiedCert.employeeName}</strong>
                    </Descriptions.Item>
                    <Descriptions.Item label="Identificação">
                      {verifiedCert.employeeDocument}
                    </Descriptions.Item>
                    <Descriptions.Item label="Treinamento Técnico" span={2}>
                      <strong>{verifiedCert.trainingTitle}</strong>
                    </Descriptions.Item>
                    <Descriptions.Item label="Carga Horária">
                      {verifiedCert.workloadHours} horas presenciais
                    </Descriptions.Item>
                    <Descriptions.Item label="Data de Conclusão">
                      {verifiedCert.completionDate}
                    </Descriptions.Item>
                    <Descriptions.Item label="Instrutor">
                      {verifiedCert.instructorName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Situação Cadastral">
                      <Tag color="cyan" icon={<CheckCircleOutlined />} style={{ borderRadius: 4, background: '#e6f7f6', color: '#0d9690', borderColor: '#b3e7e4', fontWeight: 600 }}>
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
              title="Registro Não Encontrado"
              subTitle="O código digitado não corresponde a nenhum certificado emitido pela Lins Agroindustrial."
              extra={[
                <Alert
                  key="alert"
                  message="Dica de Verificação"
                  description="Verifique se o código informado confere exatamente com a identificação impressa no rodapé do certificado (Ex: LINS-NR13-2026-X8892)."
                  type="warning"
                  showIcon
                  style={{ borderRadius: 6, textAlign: 'left' }}
                />,
              ]}
            />
          )}
        </Card>
      )}
    </div>
  );
};
