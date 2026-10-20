import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Tag,
  Modal,
  Space,
  Divider,
  message,
} from 'antd';
import {
  SafetyCertificateOutlined,
  PrinterOutlined,
  EyeOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import type { Certificate } from '../../types/certificate';

const { Title, Paragraph, Text } = Typography;

const mockCertificates: Certificate[] = [
  {
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
  {
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
  {
    id: 'cert-3',
    code: 'RH-2026-M7721P',
    employeeName: 'Juliana Costa e Silva',
    employeeDocument: '***.320.441-**',
    trainingTitle: 'Gestão de Tempo e Produtividade Corporativa',
    workloadHours: 10,
    issueDate: '2026-09-30',
    completionDate: '2026-09-29',
    instructorName: 'Aline Pires',
    isValid: true,
  },
];

export const Certificados: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = (cert: Certificate) => {
    setSelectedCert(cert);
    setIsPreviewOpen(true);
  };

  const handlePrint = () => {
    window.print();
    message.success('Comando de impressão acionado.');
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>
          Certificados Digitais
        </Title>
        <Paragraph type="secondary" style={{ margin: 0 }}>
          Consulte, pré-visualize e exporte os certificados emitidos para os colaboradores.
        </Paragraph>
      </div>

      <Row gutter={[20, 20]}>
        {mockCertificates.map((cert) => (
          <Col xs={24} md={8} key={cert.id}>
            <Card
              className="card-hover-shadow"
              title={
                <Space>
                  <SafetyCertificateOutlined style={{ color: '#10B981', fontSize: 18 }} />
                  <Text strong>{cert.employeeName}</Text>
                </Space>
              }
              extra={<Tag color="green">Válido</Tag>}
              actions={[
                <Button
                  key="preview"
                  type="link"
                  icon={<EyeOutlined />}
                  onClick={() => handlePreview(cert)}
                >
                  Visualizar
                </Button>,
              ]}
            >
              <Paragraph strong ellipsis={{ rows: 2 }}>
                {cert.trainingTitle}
              </Paragraph>
              <Text type="secondary" style={{ fontSize: 13, display: 'block' }}>
                Código: <Text code>{cert.code}</Text>
              </Text>
              <Text type="secondary" style={{ fontSize: 13 }}>
                Emitido em: {cert.issueDate} ({cert.workloadHours}h)
              </Text>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal de Visualização e Exportação de Certificado */}
      <Modal
        open={isPreviewOpen}
        onCancel={() => setIsPreviewOpen(false)}
        width={760}
        footer={[
          <Button key="back" onClick={() => setIsPreviewOpen(false)}>
            Fechar
          </Button>,
          <Button
            key="print"
            type="primary"
            icon={<PrinterOutlined />}
            onClick={handlePrint}
          >
            Imprimir / Salvar PDF
          </Button>,
        ]}
      >
        {selectedCert && (
          <div
            style={{
              border: '8px double #1E40AF',
              padding: '40px 30px',
              textAlign: 'center',
              backgroundColor: '#fff',
              margin: '20px 0',
              borderRadius: 4,
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <SafetyCertificateOutlined style={{ fontSize: 48, color: '#1E40AF' }} />
            </div>

            <Title level={3} style={{ textTransform: 'uppercase', letterSpacing: 2, color: '#1e3a8a' }}>
              Certificado de Conclusão
            </Title>

            <Paragraph style={{ fontSize: 16, marginTop: 24 }}>
              Certificamos que
            </Paragraph>

            <Title level={2} style={{ color: '#0f172a', margin: '8px 0 16px' }}>
              {selectedCert.employeeName}
            </Title>

            <Paragraph style={{ fontSize: 15, maxWidth: 540, margin: '0 auto', color: '#334155' }}>
              concluiu com êxito o treinamento corporativo de{' '}
              <strong>{selectedCert.trainingTitle}</strong>, com carga horária total de{' '}
              <strong>{selectedCert.workloadHours} horas</strong>, finalizado em{' '}
              <strong>{selectedCert.completionDate}</strong>.
            </Paragraph>

            <Divider style={{ margin: '36px 0 24px' }} />

            <Row justify="space-between" align="bottom">
              <Col span={10}>
                <div style={{ borderTop: '1px solid #94a3b8', paddingTop: 8 }}>
                  <Text strong style={{ display: 'block' }}>{selectedCert.instructorName}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>Instrutor Responsável</Text>
                </div>
              </Col>

              <Col span={10}>
                <div style={{ textAlign: 'right' }}>
                  <Space>
                    <CheckCircleFilled style={{ color: '#10b981' }} />
                    <Text style={{ fontSize: 12 }}>Certificado Autêntico</Text>
                  </Space>
                  <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>
                    Validador: {selectedCert.code}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};
