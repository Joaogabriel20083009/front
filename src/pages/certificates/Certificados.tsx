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
  {
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
  {
    id: 'cert-3',
    code: 'LINS-BPF-2026-M7721',
    employeeName: 'Claudio Roberto Souza',
    employeeDocument: 'Matrícula: MAT-09823',
    trainingTitle: 'Boas Práticas de Fabricação (BPF) no Processo de Açúcar',
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
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      <div className="lins-page-header" style={{ marginBottom: 28 }}>
        <Title level={2} className="lins-page-title" style={{ margin: 0, fontSize: 24 }}>
          Certificados Digitais de Capacitação
        </Title>
        <Paragraph type="secondary" style={{ margin: '4px 0 0', color: '#54595F', fontSize: 14 }}>
          Histórico e emissão oficial de certificados técnicos da Universidade Corporativa Lins Agroindustrial.
        </Paragraph>
      </div>

      <Row gutter={[20, 20]}>
        {mockCertificates.map((cert) => (
          <Col xs={24} md={8} key={cert.id}>
            <Card
              className="lins-card"
              bordered={false}
              title={
                <Space>
                  <SafetyCertificateOutlined style={{ color: '#00B5AD', fontSize: 18 }} />
                  <Text strong style={{ color: '#184080', fontSize: 14 }}>{cert.employeeName}</Text>
                </Space>
              }
              extra={<Tag color="cyan" style={{ borderRadius: 4, background: '#e6f7f6', color: '#0d9690', borderColor: '#b3e7e4' }}>Autêntico</Tag>}
              actions={[
                <Button
                  key="preview"
                  type="link"
                  icon={<EyeOutlined />}
                  onClick={() => handlePreview(cert)}
                  style={{ color: '#0032A0', fontWeight: 600 }}
                >
                  Visualizar Diploma
                </Button>,
              ]}
            >
              <Paragraph strong ellipsis={{ rows: 2 }} style={{ color: '#3d3d3d', minHeight: 44 }}>
                {cert.trainingTitle}
              </Paragraph>
              <div style={{ background: '#f8fbfd', padding: '10px 12px', borderRadius: 6, border: '1px solid #f2f5f7' }}>
                <Text type="secondary" style={{ fontSize: 12.5, display: 'block' }}>
                  Código: <Text code style={{ color: '#0032A0', background: '#ebf2ff' }}>{cert.code}</Text>
                </Text>
                <Text type="secondary" style={{ fontSize: 12.5 }}>
                  Conclusão: {cert.completionDate} • Carga: <strong>{cert.workloadHours}h</strong>
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal de Visualização e Exportação de Certificado */}
      <Modal
        open={isPreviewOpen}
        onCancel={() => setIsPreviewOpen(false)}
        width={800}
        footer={[
          <Button key="back" onClick={() => setIsPreviewOpen(false)} style={{ borderRadius: 6 }}>
            Fechar
          </Button>,
          <Button
            key="print"
            type="primary"
            icon={<PrinterOutlined />}
            onClick={handlePrint}
            style={{ backgroundColor: '#0032A0', borderColor: '#0032A0', borderRadius: 6 }}
          >
            Imprimir / Exportar PDF
          </Button>,
        ]}
      >
        {selectedCert && (
          <div
            style={{
              border: '6px double #0032A0',
              padding: '48px 40px',
              textAlign: 'center',
              backgroundColor: '#ffffff',
              margin: '16px 0',
              borderRadius: 4,
              position: 'relative',
            }}
          >
            {/* Logo da Lins Agroindustrial no Certificado */}
            <div style={{ marginBottom: 20 }}>
              <img
                src="https://linsagro.com.br/wp-content/uploads/2022/07/cropped-Lins_Logo_Horizontal_RGB_Preferencial_20250512_Keenwork_AF.png"
                alt="Lins Agroindustrial"
                style={{ height: 42, objectFit: 'contain' }}
              />
              <div style={{ fontSize: 11, color: '#00B5AD', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 6 }}>
                Universidade Corporativa • Gestão de Pessoas
              </div>
            </div>

            <Title level={3} style={{ textTransform: 'uppercase', letterSpacing: 2, color: '#0032A0', margin: '16px 0 24px' }}>
              Certificado de Capacitação Técnica
            </Title>

            <Paragraph style={{ fontSize: 15, color: '#54595F' }}>
              Certificamos que o colaborador
            </Paragraph>

            <Title level={2} style={{ color: '#184080', margin: '8px 0 16px', fontWeight: 700 }}>
              {selectedCert.employeeName}
            </Title>

            <Paragraph style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>
              {selectedCert.employeeDocument} • Unidade Lins/SP
            </Paragraph>

            <Paragraph style={{ fontSize: 15.5, maxWidth: 600, margin: '0 auto', color: '#3d3d3d', lineHeight: 1.6 }}>
              concluiu com êxito o programa de treinamento de{' '}
              <strong style={{ color: '#0032A0' }}>{selectedCert.trainingTitle}</strong>,
              com carga horária total de <strong>{selectedCert.workloadHours} horas</strong>,
              concluído em <strong>{selectedCert.completionDate}</strong>.
            </Paragraph>

            <Divider style={{ margin: '40px 0 24px', borderColor: '#e7e7e7' }} />

            <Row justify="space-between" align="bottom">
              <Col span={10}>
                <div style={{ borderTop: '1px solid #94a3b8', paddingTop: 8 }}>
                  <Text strong style={{ display: 'block', color: '#184080' }}>{selectedCert.instructorName}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>Instrutor Técnico Responsável</Text>
                </div>
              </Col>

              <Col span={10}>
                <div style={{ textAlign: 'right' }}>
                  <Space>
                    <CheckCircleFilled style={{ color: '#00B5AD', fontSize: 16 }} />
                    <Text strong style={{ fontSize: 12.5, color: '#0D9690' }}>Certificado Autenticado</Text>
                  </Space>
                  <div style={{ fontSize: 11, color: '#54595F', marginTop: 4 }}>
                    Código de Validação: <code>{selectedCert.code}</code>
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
