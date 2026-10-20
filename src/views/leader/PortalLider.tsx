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
  { id: 'emp-1', name: 'José Aparecido da Silva', role: 'Operador de Colhedora de Cana II', department: 'Colheita Mecanizada' },
  { id: 'emp-2', name: 'Anderson Rodrigo Lima', role: 'Mecânico de Tratores e Implementos', department: 'Oficina Central Agrícola' },
  { id: 'emp-3', name: 'Marcos Vinicius Santos', role: 'Líder de Turma de Plantio', department: 'Tratos Culturais' },
  { id: 'emp-4', name: 'Valdir Ferreira', role: 'Motorista Canavieiro Rodoviário', department: 'Logística Canavieira' },
  { id: 'emp-5', name: 'Claudio Roberto Souza', role: 'Operador de Caldeira e Destilaria', department: 'Indústria / Bioeletricidade' },
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
      `${selectedMemberIds.length} vaga(s) reservada(s) com sucesso para "${selectedTraining?.title}"!`
    );
    setIsModalOpen(false);
  };

  const toggleMemberSelection = (id: string) => {
    setSelectedMemberIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      <div className="lins-page-header" style={{ marginBottom: 28 }}>
        <Title level={2} className="lins-page-title" style={{ margin: 0, fontSize: 24 }}>
          Portal do Líder & Gestão de Equipes
        </Title>
        <Paragraph type="secondary" style={{ margin: '4px 0 0', color: '#54595F', fontSize: 14 }}>
          Indique os operadores e colaboradores da sua frente operacional para os treinamentos técnicos e NRs da safra.
        </Paragraph>
      </div>

      <Row gutter={[20, 20]}>
        {mockTrainings.map((training) => {
          const availableSlots = training.capacity - training.enrolledCount;
          return (
            <Col xs={24} md={12} key={training.id}>
              <Card
                className="lins-card"
                bordered={false}
                title={
                  <Space direction="vertical" size={2} style={{ width: '100%' }}>
                    <Tag
                      style={{
                        borderRadius: 4,
                        border: '1px solid #d0e1fd',
                        background: '#ebf2ff',
                        color: '#0032a0',
                        fontWeight: 600,
                        fontSize: 11,
                      }}
                    >
                      {training.category}
                    </Tag>
                    <Text strong style={{ fontSize: 15, color: '#184080' }}>
                      {training.title}
                    </Text>
                  </Space>
                }
                extra={
                  <Badge
                    count={`${availableSlots} vagas abertas`}
                    style={{
                      backgroundColor: availableSlots > 5 ? '#00B5AD' : '#f59e0b',
                      borderRadius: 4,
                      fontWeight: 600,
                      boxShadow: 'none',
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
                    style={{
                      backgroundColor: '#0032A0',
                      borderColor: '#0032A0',
                      borderRadius: 6,
                    }}
                  >
                    Indicar Operadores da Equipe
                  </Button>,
                ]}
              >
                <Paragraph ellipsis={{ rows: 2 }} type="secondary" style={{ minHeight: 40, color: '#54595F', fontSize: 13.5 }}>
                  {training.description}
                </Paragraph>

                <div style={{ background: '#f8fbfd', padding: '12px 16px', borderRadius: 6, border: '1px solid #f2f5f7' }}>
                  <Space direction="vertical" size={6} style={{ width: '100%', fontSize: 13 }}>
                    <div>
                      <UserOutlined style={{ marginRight: 8, color: '#0032A0' }} />
                      <Text type="secondary">Instrutor: </Text>
                      <Text strong style={{ color: '#184080' }}>{training.instructor}</Text>
                    </div>
                    <div>
                      <CalendarOutlined style={{ marginRight: 8, color: '#00B5AD' }} />
                      <Text type="secondary">Período: </Text>
                      <Text style={{ color: '#3d3d3d' }}>{training.startDate} até {training.endDate} ({training.workloadHours}h)</Text>
                    </div>
                    <div>
                      <EnvironmentOutlined style={{ marginRight: 8, color: '#54595F' }} />
                      <Text type="secondary">Local: </Text>
                      <Text style={{ color: '#3d3d3d' }}>{training.location}</Text>
                    </div>
                  </Space>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Modal
        title={
          <div>
            <div style={{ fontSize: 13, color: '#00B5AD', fontWeight: 600, textTransform: 'uppercase' }}>
              Reserva de Vagas de Capacitação
            </div>
            <div style={{ fontSize: 16, color: '#0032A0', fontWeight: 700 }}>
              {selectedTraining?.title}
            </div>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleConfirmReservation}
        okText={`Confirmar Indicação (${selectedMemberIds.length} selecionados)`}
        cancelText="Voltar"
        okButtonProps={{
          style: { backgroundColor: '#0032A0', borderColor: '#0032A0', borderRadius: 6 },
        }}
      >
        <Paragraph type="secondary" style={{ marginTop: 12, fontSize: 13.5 }}>
          Selecione os operadores ou mecânicos do seu turno para participação no treinamento:
        </Paragraph>

        <List
          dataSource={mockTeamMembers}
          renderItem={(member) => (
            <List.Item
              style={{
                cursor: 'pointer',
                borderRadius: 6,
                padding: '10px 12px',
                marginBottom: 4,
                transition: 'background 0.2s',
              }}
              onClick={() => toggleMemberSelection(member.id)}
            >
              <List.Item.Meta
                avatar={<Avatar style={{ backgroundColor: '#eef2ff', color: '#0032A0' }} icon={<UserOutlined />} />}
                title={
                  <Checkbox checked={selectedMemberIds.includes(member.id)}>
                    <span style={{ fontWeight: 600, color: '#184080' }}>{member.name}</span>
                  </Checkbox>
                }
                description={
                  <span style={{ fontSize: 12, color: '#54595F' }}>
                    {member.role} • <strong>{member.department}</strong>
                  </span>
                }
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};
