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
  PrinterOutlined,
  EyeOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import type { Certificate } from '../../lib/types/certificate';

const { Title, Paragraph, Text } = Typography;

const mockCertificates: Certificate[] = [
  {
    id: 'cert-1',
    code: 'LINS-NR13-2026-X8892',
    employeeName: 'José Aparecido da Silva',
    employeeDocument: 'MAT-14829',
    trainingTitle: 'NR-13: Segurança em Caldeiras e Destilaria',
    workloadHours: 16,
    issueDate: '2026-10-18',
    completionDate: '2026-10-17',
    instructorName: 'Dra. Camila Toledo',
    isValid: true,
  },
  {
    id: 'cert-2',
    code: 'LINS-NR31-2026-B3419',
    employeeName: 'Anderson Rodrigo Lima',
    employeeDocument: 'MAT-12903',
    trainingTitle: 'NR-31: Segurança no Trabalho Agroindustrial',
    workloadHours: 20,
    issueDate: '2026-10-15',
    completionDate: '2026-10-14',
    instructorName: 'Eng. Roberto Vasconcelos',
    isValid: true,
  },
  {
    id: 'cert-3',
    code: 'LINS-BPF-2026-M7721',
    employeeName: 'Claudio Roberto Souza',
    employeeDocument: 'MAT-09823',
    trainingTitle: 'Boas Práticas de Fabricação no Açúcar',
    workloadHours: 12,
    issueDate: '2026-10-05',
    completionDate: '2026-10-04',
    instructorName: 'Aline Barbosa - CQ',
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
      <div className="lins-page-header" style={{ marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>
          Certificados Emitidos
        </Title>
        <Text type="secondary" style={{ fontSize: 12.5 }}>
          Consulta e exportação de certificados da Universidade Corporativa Lins Agro
        </Text>
      </div>

      <Row gutter={[12, 12]}>
        {mockCertificates.map((cert) => (
          <Col xs={24} sm={12} lg={8} key={cert.id}>
            <Card
              className="lins-card"
              styles={{
                header: { minHeight: 38, padding: '0 12px', borderBottom: '1px solid #f1f5f9' },
                body: { padding: '12px' },
              }}
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text strong style={{ color: '#0f172a', fontSize: 13 }}>{cert.employeeName}</Text>
                  <Tag color="cyan" style={{ borderRadius: 3, border: 'none', background: '#e6f7f6', color: '#0d9690', fontSize: 10.5, margin: 0 }}>
                    Válido
                  </Tag>
                </div>
              }
            >
              <Text strong style={{ color: '#0032A0', fontSize: 12.5, display: 'block', minHeight: 34, lineHeight: 1.3 }}>
                {cert.trainingTitle}
              </Text>

              <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: 4, border: '1px solid #f1f5f9', margin: '8px 0 10px', fontSize: 11.5 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ color: '#64748b' }}>Matrícula: {cert.employeeDocument}</span>
                  <span style={{ color: '#334155' }}><strong>{cert.workloadHours}h</strong></span>
                </div>
                <div style={{ color: '#64748b' }}>
                  Código: <Text code style={{ fontSize: 11 }}>{cert.code}</Text>
                </div>
              </div>

              <Button
                type="dashed"
                icon={<EyeOutlined />}
                block
                size="small"
                onClick={() => handlePreview(cert)}
                style={{ borderRadius: 4, height: 30, fontSize: 12, color: '#0032A0' }}
              >
                Visualizar Diploma
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        open={isPreviewOpen}
        onCancel={() => setIsPreviewOpen(false)}
        width={680}
        footer={[
          <Button key="back" size="small" onClick={() => setIsPreviewOpen(false)}>
            Fechar
          </Button>,
          <Button
            key="print"
            type="primary"
            size="small"
            icon={<PrinterOutlined />}
            onClick={handlePrint}
            style={{ backgroundColor: '#0032A0', borderColor: '#0032A0', borderRadius: 4 }}
          >
            Imprimir / Salvar PDF
          </Button>,
        ]}
      >
        {selectedCert && (
          <div
            style={{
              border: '4px double #0032A0',
              padding: '32px 28px',
              textAlign: 'center',
              backgroundColor: '#ffffff',
              margin: '10px 0',
              borderRadius: 4,
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <img
                src="https://linsagro.com.br/wp-content/uploads/2022/07/cropped-Lins_Logo_Horizontal_RGB_Preferencial_20250512_Keenwork_AF.png"
                alt="Lins Agroindustrial"
                style={{ height: 32, objectFit: 'contain' }}
              />
              <div style={{ fontSize: 10.5, color: '#00B5AD', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginTop: 4 }}>
                Universidade Corporativa
              </div>
            </div>

            <Title level={4} style={{ textTransform: 'uppercase', letterSpacing: 1.5, color: '#0032A0', margin: '12px 0 16px' }}>
              Certificado de Capacitação
            </Title>

            <Paragraph style={{ fontSize: 13, color: '#64748b', margin: 0 }}>
              Certificamos que o colaborador
            </Paragraph>

            <Title level={3} style={{ color: '#0f172a', margin: '4px 0 12px', fontWeight: 700 }}>
              {selectedCert.employeeName}
            </Title>

            <Paragraph style={{ fontSize: 13.5, maxWidth: 520, margin: '0 auto', color: '#334155', lineHeight: 1.5 }}>
              concluiu com êxito o treinamento de{' '}
              <strong style={{ color: '#0032A0' }}>{selectedCert.trainingTitle}</strong>,
              com carga horária de <strong>{selectedCert.workloadHours} horas</strong>,
              concluído em <strong>{selectedCert.completionDate}</strong>.
            </Paragraph>

            <Divider style={{ margin: '24px 0 16px', borderColor: '#e2e8f0' }} />

            <Row justify="space-between" align="bottom">
              <Col span={10}>
                <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: 6 }}>
                  <Text strong style={{ display: 'block', color: '#0f172a', fontSize: 12 }}>{selectedCert.instructorName}</Text>
                  <Text type="secondary" style={{ fontSize: 11 }}>Instrutor Técnico</Text>
                </div>
              </Col>

              <Col span={10}>
                <div style={{ textAlign: 'right' }}>
                  <Space size="small">
                    <CheckCircleFilled style={{ color: '#00B5AD', fontSize: 14 }} />
                    <Text strong style={{ fontSize: 11.5, color: '#0D9690' }}>Autêntico</Text>
                  </Space>
                  <div style={{ fontSize: 10.5, color: '#64748b', marginTop: 2 }}>
                    Cód: <code>{selectedCert.code}</code>
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
