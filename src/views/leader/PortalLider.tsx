import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Tag,
  Modal,
  Checkbox,
  List,
  Avatar,
  message,
} from 'antd';
import {
  UsergroupAddOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { mockTrainings } from '../../lib/mocks/trainingMock';
import type { Training } from '../../lib/types/training';

const { Title, Paragraph, Text } = Typography;

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
}

const mockTeamMembers: TeamMember[] = [
  { id: 'emp-1', name: 'José Aparecido da Silva', role: 'Operador de Colhedora II', department: 'Colheita Mecanizada' },
  { id: 'emp-2', name: 'Anderson Rodrigo Lima', role: 'Mecânico de Tratores', department: 'Oficina Central' },
  { id: 'emp-3', name: 'Marcos Vinicius Santos', role: 'Líder de Turma', department: 'Tratos Culturais' },
  { id: 'emp-4', name: 'Valdir Ferreira', role: 'Motorista Canavieiro', department: 'Logística Canavieira' },
  { id: 'emp-5', name: 'Claudio Roberto Souza', role: 'Operador de Caldeira', department: 'Indústria / Bioeletricidade' },
];

export const PortalLider: React.FC = () => {
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenEnrollment = (training: Training) => {
    setSelectedTraining(training);
    setSelectedMemberIds([]);
    setIsModalOpen(true);
  };

  const handleConfirmReservation = () => {
    if (selectedMemberIds.length === 0) {
      message.warning('Selecione ao menos um colaborador.');
      return;
    }
    message.success(`${selectedMemberIds.length} vaga(s) reservada(s) para "${selectedTraining?.title}"!`);
    setIsModalOpen(false);
  };

  const toggleMemberSelection = (id: string) => {
    setSelectedMemberIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div className="lins-page-header" style={{ marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>
          Portal do Líder
        </Title>
        <Text type="secondary" style={{ fontSize: 12.5 }}>
          Selecione capacitações para indicar e inscrever operadores da sua frente
        </Text>
      </div>

      {/* Grid Compacto com 3 colunas */}
      <Row gutter={[12, 12]}>
        {mockTrainings.map((training) => {
          const availableSlots = training.capacity - training.enrolledCount;
          const isFullOrDone = availableSlots <= 0 || training.status === 'concluido';
          return (
            <Col xs={24} sm={12} lg={8} key={training.id}>
              <Card
                className="lins-card"
                styles={{
                  header: { minHeight: 38, padding: '0 12px', borderBottom: '1px solid #f1f5f9' },
                  body: { padding: '12px' },
                }}
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Tag style={{ borderRadius: 3, border: 'none', background: '#ebf2ff', color: '#0032a0', fontSize: 11, margin: 0 }}>
                      {training.category}
                    </Tag>
                    <span
                      style={{
                        fontSize: 11,
                        color: availableSlots > 5 ? '#0D9690' : availableSlots > 0 ? '#d97706' : '#DC2626',
                        fontWeight: 600,
                      }}
                    >
                      {availableSlots > 0 ? `${availableSlots} vagas` : 'Esgotado'}
                    </span>
                  </div>
                }
              >
                <Text strong style={{ fontSize: 13, color: '#0f172a', display: 'block', minHeight: 36, lineHeight: 1.3 }}>
                  {training.title}
                </Text>

                <Paragraph ellipsis={{ rows: 2 }} type="secondary" style={{ fontSize: 11.5, minHeight: 32, margin: '6px 0 10px', color: '#64748b' }}>
                  {training.description}
                </Paragraph>

                <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: 4, border: '1px solid #f1f5f9', fontSize: 11.5, marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ color: '#64748b' }}><UserOutlined style={{ marginRight: 4 }} />{training.instructor}</span>
                    <strong style={{ color: '#334155' }}>{training.workloadHours}h</strong>
                  </div>
                  <div style={{ color: '#64748b' }}>
                    <CalendarOutlined style={{ marginRight: 4 }} />{training.startDate}
                    <span style={{ margin: '0 4px' }}>•</span>
                    <EnvironmentOutlined style={{ marginRight: 4 }} />{training.location.split('-')[0]}
                  </div>
                </div>

                <Button
                  type={isFullOrDone ? 'default' : 'primary'}
                  icon={!isFullOrDone ? <UsergroupAddOutlined /> : undefined}
                  block
                  size="small"
                  onClick={() => handleOpenEnrollment(training)}
                  disabled={isFullOrDone}
                  style={{
                    borderRadius: 4,
                    height: 30,
                    fontSize: 12,
                    ...(isFullOrDone
                      ? {
                          backgroundColor: '#f1f5f9',
                          borderColor: '#e2e8f0',
                          color: '#94a3b8',
                          cursor: 'not-allowed',
                        }
                      : {
                          backgroundColor: '#0032A0',
                          borderColor: '#0032A0',
                          color: '#ffffff',
                        }),
                  }}
                >
                  {training.status === 'concluido'
                    ? 'Treinamento Concluído'
                    : availableSlots <= 0
                    ? 'Vagas Esgotadas'
                    : 'Indicar Equipe'}
                </Button>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Modal de Reserva Compacto */}
      <Modal
        title={<span style={{ color: '#0032A0', fontSize: 14, fontWeight: 600 }}>Indicar Colaboradores • {selectedTraining?.title}</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleConfirmReservation}
        okText={`Confirmar (${selectedMemberIds.length})`}
        cancelText="Voltar"
        width={440}
        style={{ maxWidth: '95vw' }}
        okButtonProps={{
          style: { backgroundColor: '#0032A0', borderColor: '#0032A0', borderRadius: 4 },
        }}
      >
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 10 }}>
          Selecione os operadores da equipe para o treinamento:
        </Text>

        <List
          size="small"
          dataSource={mockTeamMembers}
          renderItem={(member) => (
            <List.Item
              style={{
                cursor: 'pointer',
                borderRadius: 4,
                padding: '6px 8px',
                marginBottom: 2,
              }}
              onClick={() => toggleMemberSelection(member.id)}
            >
              <List.Item.Meta
                avatar={<Avatar size="small" style={{ backgroundColor: '#ebf2ff', color: '#0032a0', fontSize: 11 }}>{member.name.charAt(0)}</Avatar>}
                title={
                  <Checkbox checked={selectedMemberIds.includes(member.id)} style={{ fontSize: 12.5 }}>
                    <span style={{ fontWeight: 500, color: '#1e293b' }}>{member.name}</span>
                  </Checkbox>
                }
                description={<span style={{ fontSize: 11, color: '#64748b' }}>{member.role} • {member.department}</span>}
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};
