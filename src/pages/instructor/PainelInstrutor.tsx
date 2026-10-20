import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Tag,
  Space,
  Typography,
  Modal,
  Alert,
  Radio,
  message,
  Avatar,
} from 'antd';
import {
  CameraOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  UserOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { AttendanceStatus } from '../../types/attendance';

const { Title, Paragraph, Text } = Typography;

interface StudentAttendee {
  id: string;
  name: string;
  document: string;
  department: string;
  status: AttendanceStatus;
}

const initialAttendees: StudentAttendee[] = [
  { id: '1', name: 'Ana Beatriz Souza', document: '***.452.128-**', department: 'Operações', status: 'presente' },
  { id: '2', name: 'Lucas Gabriel Martins', document: '***.781.993-**', department: 'Operações', status: 'presente' },
  { id: '3', name: 'Juliana Costa e Silva', document: '***.320.441-**', department: 'Operações', status: 'ausente' },
  { id: '4', name: 'Carlos Santos Nogueira', document: '***.908.215-**', department: 'TI & Inovação', status: 'ausente' },
  { id: '5', name: 'Patrícia Mendes', document: '***.612.870-**', department: 'Financeiro', status: 'justificado' },
];

export const PainelInstrutor: React.FC = () => {
  const [attendees, setAttendees] = useState<StudentAttendee[]>(initialAttendees);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [simulatedMatchName, setSimulatedMatchName] = useState<string | null>(null);

  const updateStatus = (id: string, newStatus: AttendanceStatus) => {
    setAttendees((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    message.success('Status de presença atualizado.');
  };

  const handleSimulateFacialScan = () => {
    // Simulação visual de detecção de participante para conferência rápida
    const absentStudent = attendees.find((a) => a.status === 'ausente');
    if (absentStudent) {
      setSimulatedMatchName(absentStudent.name);
    } else {
      setSimulatedMatchName('Participante identificado');
    }
  };

  const handleConfirmFacialAttendance = () => {
    if (simulatedMatchName) {
      setAttendees((prev) =>
        prev.map((item) =>
          item.name === simulatedMatchName ? { ...item, status: 'presente' } : item
        )
      );
      message.success(`Presença confirmada para ${simulatedMatchName}!`);
      setSimulatedMatchName(null);
      setIsCameraModalOpen(false);
    }
  };

  const columns: ColumnsType<StudentAttendee> = [
    {
      title: 'Participante',
      key: 'name',
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <Text strong>{record.name}</Text>
            <div style={{ fontSize: 12, color: '#64748b' }}>Doc: {record.document}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Departamento',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Status de Presença',
      dataIndex: 'status',
      key: 'status',
      render: (status: AttendanceStatus) => {
        if (status === 'presente') return <Tag color="success" icon={<CheckCircleOutlined />}>Presente</Tag>;
        if (status === 'justificado') return <Tag color="warning" icon={<WarningOutlined />}>Justificado</Tag>;
        return <Tag color="error" icon={<CloseCircleOutlined />}>Ausente</Tag>;
      },
    },
    {
      title: 'Ações Rápidas',
      key: 'actions',
      render: (_, record) => (
        <Radio.Group
          size="small"
          value={record.status}
          onChange={(e) => updateStatus(record.id, e.target.value)}
        >
          <Radio.Button value="presente">Presente</Radio.Button>
          <Radio.Button value="ausente">Ausente</Radio.Button>
          <Radio.Button value="justificado">Justificado</Radio.Button>
        </Radio.Group>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Painel do Instrutor
          </Title>
          <Paragraph type="secondary" style={{ margin: 0 }}>
            Turma: Liderança Ágil e Gestão de Conflitos — Lista de Convocados e Chamada
          </Paragraph>
        </div>

        <Button
          type="primary"
          icon={<CameraOutlined />}
          size="large"
          onClick={() => {
            setSimulatedMatchName(null);
            setIsCameraModalOpen(true);
          }}
        >
          Chamada com Captura Facial
        </Button>
      </div>

      <Card bordered={false} className="card-hover-shadow">
        <div className="table-responsive-wrapper">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={attendees}
            pagination={false}
          />
        </div>
      </Card>

      {/* Modal de Chamada com Câmera */}
      <Modal
        title="Assistente de Chamada por Captura Facial"
        open={isCameraModalOpen}
        onCancel={() => setIsCameraModalOpen(false)}
        footer={null}
        width={560}
      >
        <Alert
          message="Aviso de Assistência Visual"
          description="Este recurso é uma ferramenta de conferência visual e agilidade para o instrutor. Não constitui biometria legal ou autenticação pericial."
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />

        <div
          style={{
            height: 260,
            background: '#0f172a',
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: 140,
              height: 180,
              border: '2px dashed #38bdf8',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <EyeOutlined style={{ fontSize: 32, color: '#38bdf8' }} />
          </div>
          <Text style={{ color: '#cbd5e1', marginTop: 12 }}>
            Posicione o rosto do participante na moldura
          </Text>
        </div>

        {simulatedMatchName && (
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Tag color="green" style={{ padding: '6px 12px', fontSize: 14 }}>
              Sugestão de Participante: <strong>{simulatedMatchName}</strong>
            </Tag>
          </div>
        )}

        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <Space>
            <Button onClick={handleSimulateFacialScan}>
              Simular Detecção Facial
            </Button>
            <Button
              type="primary"
              disabled={!simulatedMatchName}
              onClick={handleConfirmFacialAttendance}
            >
              Confirmar Presença
            </Button>
          </Space>
        </div>
      </Modal>
    </div>
  );
};
