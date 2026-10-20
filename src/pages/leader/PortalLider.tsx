import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Tag,
  Badge,
  Modal,
  Checkbox,
  List,
  Avatar,
  message,
  Space,
} from 'antd';
import {
  UsergroupAddOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { mockTrainings } from '../../mocks/trainingMock';
import type { Training } from '../../types/training';

const { Title, Paragraph, Text } = Typography;

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
}

const mockTeamMembers: TeamMember[] = [
  { id: 'emp-1', name: 'Ana Beatriz Souza', role: 'Analista de Operações Jr', department: 'Operações' },
  { id: 'emp-2', name: 'Lucas Gabriel Martins', role: 'Assistente Técnico', department: 'Operações' },
  { id: 'emp-3', name: 'Juliana Costa e Silva', role: 'Supervisora de Turno', department: 'Operações' },
  { id: 'emp-4', name: 'Fernando Lima', role: 'Operador Especialista', department: 'Operações' },
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
      message.warning('Selecione ao menos um colaborador da equipe.');
      return;
    }
    message.success(
      `${selectedMemberIds.length} vaga(s) reservada(s) para o treinamento "${selectedTraining?.title}"!`
    );
    setIsModalOpen(false);
  };

  const toggleMemberSelection = (id: string) => {
    setSelectedMemberIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>
          Portal do Líder
        </Title>
        <Paragraph type="secondary" style={{ margin: 0 }}>
          Consulte os treinamentos corporativos abertos e inscreva membros da sua equipe para reserva de vagas.
        </Paragraph>
      </div>

      <Row gutter={[20, 20]}>
        {mockTrainings.map((training) => {
          const availableSlots = training.capacity - training.enrolledCount;
          return (
            <Col xs={24} md={12} key={training.id}>
              <Card
                className="card-hover-shadow"
                title={
                  <Space orientation="horizontal">
                    <Tag color="geekblue">{training.category}</Tag>
                    <Text strong>{training.title}</Text>
                  </Space>
                }
                extra={
                  <Badge
                    count={`${availableSlots} vagas restantes`}
                    style={{
                      backgroundColor: availableSlots > 5 ? '#52c41a' : '#faad14',
                    }}
                  />
                }
                actions={[
                  <Button
                    key="enroll"
                    type="primary"
                    icon={<UsergroupAddOutlined />}
                    onClick={() => handleOpenEnrollment(training)}
                    disabled={availableSlots <= 0 || training.status === 'concluido'}
                  >
                    Indicar Colaboradores
                  </Button>,
                ]}
              >
                <Paragraph ellipsis={{ rows: 2 }} type="secondary">
                  {training.description}
                </Paragraph>

                <Space direction="vertical" size={6} style={{ width: '100%', fontSize: 13 }}>
                  <div>
                    <UserOutlined style={{ marginRight: 8, color: '#64748b' }} />
                    <Text>Instrutor: </Text>
                    <Text strong>{training.instructor}</Text>
                  </div>
                  <div>
                    <CalendarOutlined style={{ marginRight: 8, color: '#64748b' }} />
                    <Text>Período: </Text>
                    <Text>{training.startDate} até {training.endDate} ({training.workloadHours}h)</Text>
                  </div>
                  <div>
                    <EnvironmentOutlined style={{ marginRight: 8, color: '#64748b' }} />
                    <Text>Local: </Text>
                    <Text>{training.location}</Text>
                  </div>
                </Space>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Modal de Reserva de Vagas */}
      <Modal
        title={`Indicação de Equipe: ${selectedTraining?.title}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleConfirmReservation}
        okText={`Confirmar Reserva (${selectedMemberIds.length})`}
        cancelText="Voltar"
      >
        <Paragraph type="secondary">
          Selecione os colaboradores do seu departamento que participarão desta capacitação:
        </Paragraph>

        <List
          dataSource={mockTeamMembers}
          renderItem={(member) => (
            <List.Item
              style={{ cursor: 'pointer' }}
              onClick={() => toggleMemberSelection(member.id)}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={
                  <Checkbox checked={selectedMemberIds.includes(member.id)}>
                    {member.name}
                  </Checkbox>
                }
                description={`${member.role} • ${member.department}`}
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};
