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
  SafetyCertificateOutlined,
  QrcodeOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import type { Certificate } from '../../types/certificate';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const validCertificatesDatabase: Record<string, Certificate> = {
  'RH-2026-X8892A': {
    id: 'cert-1',
    code: 'RH-2026-X8892A',
    employeeName: 'Ana Beatriz Souza',
    employeeDocument: '***.452.128-**',
    trainingTitle: 'Segurança da Informação e LGPD no Dia a Dia',
    workloadHours: 6,
    issueDate: '2026-10-12',
    completionDate: '2026-10-11',
    instructorName: 'Roberto Siqueira',
    isValid: true,
  },
  'RH-2026-B3419K': {
    id: 'cert-2',
    code: 'RH-2026-B3419K',
    employeeName: 'Lucas Gabriel Martins',
    employeeDocument: '***.781.993-**',
    trainingTitle: 'Segurança da Informação e LGPD no Dia a Dia',
    workloadHours: 6,
    issueDate: '2026-10-12',
    completionDate: '2026-10-11',
    instructorName: 'Roberto Siqueira',
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
    const demoCode = 'RH-2026-X8892A';
    setQueryCode(demoCode);
    handleSearch(demoCode);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <SafetyCertificateOutlined style={{ fontSize: 44, color: '#1E40AF', marginBottom: 12 }} />
        <Title level={2} style={{ margin: 0 }}>
          Validação Pública de Certificados
        </Title>
        <Paragraph type="secondary">
          Consulte e confirme a autenticidade de certificados emitidos pela área de Recursos Humanos.
        </Paragraph>
      </div>

      <Card bordered={false} className="card-hover-shadow" style={{ marginBottom: 24 }}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Text strong>Digite o código verificador do certificado:</Text>
          <Search
            placeholder="Ex: RH-2026-X8892A"
            enterButton="Verificar Autenticidade"
            size="large"
            value={queryCode}
            onChange={(e) => setQueryCode(e.target.value)}
            onSearch={handleSearch}
          />

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
            <Button
              icon={<QrcodeOutlined />}
              type="dashed"
              onClick={handleSimulateQRCode}
            >
              Simular Leitura de QR Code
            </Button>
          </div>
        </Space>
      </Card>

      {searched && (
        <Card bordered={false} className="card-hover-shadow">
          {verifiedCert ? (
            <Result
              status="success"
              title="Certificado Autêntico e Válido"
              subTitle={`Registro oficial encontrado na base corporativa sob o código ${verifiedCert.code}`}
              extra={[
                <div key="details" style={{ textAlign: 'left', marginTop: 16 }}>
                  <Divider style={{ margin: '12px 0 20px' }} />
                  <Descriptions title="Dados do Registro" bordered size="middle" column={{ xs: 1, sm: 2 }}>
                    <Descriptions.Item label="Colaborador">
                      <strong>{verifiedCert.employeeName}</strong>
                    </Descriptions.Item>
                    <Descriptions.Item label="Documento">
                      {verifiedCert.employeeDocument}
                    </Descriptions.Item>
                    <Descriptions.Item label="Treinamento" span={2}>
                      {verifiedCert.trainingTitle}
                    </Descriptions.Item>
                    <Descriptions.Item label="Carga Horária">
                      {verifiedCert.workloadHours} horas
                    </Descriptions.Item>
                    <Descriptions.Item label="Data de Conclusão">
                      {verifiedCert.completionDate}
                    </Descriptions.Item>
                    <Descriptions.Item label="Instrutor">
                      {verifiedCert.instructorName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Situação">
                      <Tag color="success" icon={<CheckCircleOutlined />}>Ativo e Válido</Tag>
                    </Descriptions.Item>
                  </Descriptions>
                </div>,
              ]}
            />
          ) : (
            <Result
              status="error"
              title="Certificado Não Encontrado"
              subTitle="O código informado não corresponde a nenhum certificado emitido ou foi revogado."
              extra={[
                <Alert
                  key="alert"
                  message="Dica de Consulta"
                  description="Verifique se o código foi digitado corretamente conforme expresso no rodapé do documento (Exemplo: RH-2026-X8892A)."
                  type="warning"
                  showIcon
                />,
              ]}
            />
          )}
        </Card>
      )}
    </div>
  );
};
