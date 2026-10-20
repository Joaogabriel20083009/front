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
  EyeOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { AttendanceStatus } from '../../lib/types/attendance';

const { Title, Text } = Typography;

interface StudentAttendee {
  id: string;
  name: string;
  badgeId: string;
  department: string;
  role: string;
  status: AttendanceStatus;
}

const initialAttendees: StudentAttendee[] = [
  { id: '1', name: 'José Aparecido da Silva', badgeId: 'MAT-14829', department: 'Colheita Mecanizada', role: 'Operador de Colhedora', status: 'presente' },
  { id: '2', name: 'Anderson Rodrigo Lima', badgeId: 'MAT-12903', department: 'Oficina Central', role: 'Mecânico Senior', status: 'presente' },
  { id: '3', name: 'Marcos Vinicius Santos', badgeId: 'MAT-16781', department: 'Tratos Culturais', role: 'Líder de Turma', status: 'ausente' },
  { id: '4', name: 'Valdir Ferreira', badgeId: 'MAT-10542', department: 'Logística Canavieira', role: 'Motorista Canavieiro', status: 'ausente' },
  { id: '5', name: 'Claudio Roberto Souza', badgeId: 'MAT-09823', department: 'Indústria / Caldeiras', role: 'Operador de Painel', status: 'justificado' },
];

export const PainelInstrutor: React.FC = () => {
  const [attendees, setAttendees] = useState<StudentAttendee[]>(initialAttendees);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [simulatedMatchName, setSimulatedMatchName] = useState<string | null>(null);

  const updateStatus = (id: string, newStatus: AttendanceStatus) => {
    setAttendees((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    message.success('Status atualizado.');
  };

  const handleSimulateFacialScan = () => {
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
      message.success(`Presença confirmada: ${simulatedMatchName}`);
      setSimulatedMatchName(null);
      setIsCameraModalOpen(false);
    }
  };

  const columns: ColumnsType<StudentAttendee> = [
    {
      title: 'Colaborador',
      key: 'name',
      render: (_, record) => (
        <Space size="small">
          <Avatar size="small" style={{ backgroundColor: '#ebf2ff', color: '#0032a0', fontSize: 11 }}>
            {record.name.charAt(0)}
          </Avatar>
          <div>
            <Text strong style={{ color: '#0f172a', fontSize: 13 }}>{record.name}</Text>
            <div style={{ fontSize: 11, color: '#64748b' }}>{record.role} • {record.badgeId}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Setor',
      dataIndex: 'department',
      key: 'department',
      render: (dep) => <span style={{ color: '#475569', fontSize: 12 }}>{dep}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: (status: AttendanceStatus) => {
        if (status === 'presente') return <Tag color="green" icon={<CheckCircleOutlined />} style={{ borderRadius: 3, fontSize: 11, margin: 0 }}>Presente</Tag>;
        if (status === 'justificado') return <Tag color="warning" icon={<WarningOutlined />} style={{ borderRadius: 3, fontSize: 11, margin: 0 }}>Justificado</Tag>;
        return <Tag color="error" icon={<CloseCircleOutlined />} style={{ borderRadius: 3, fontSize: 11, margin: 0 }}>Ausente</Tag>;
      },
    },
    {
      title: 'Ação Rápida',
      key: 'actions',
      width: 220,
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
      <div className="lins-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Title level={4} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>
            Painel do Instrutor
          </Title>
          <Text type="secondary" style={{ fontSize: 12.5 }}>
            Turma: NR-31: Segurança e Saúde no Trabalho Agroindustrial
          </Text>
        </div>

        <Button
          type="primary"
          icon={<CameraOutlined />}
          size="middle"
          onClick={() => {
            setSimulatedMatchName(null);
            setIsCameraModalOpen(true);
          }}
          style={{ backgroundColor: '#0032A0', borderColor: '#0032A0', borderRadius: 4 }}
        >
          Chamada com Câmera
        </Button>
      </div>

      <Card
        className="lins-card"
        styles={{
          header: { minHeight: 38, padding: '0 14px', borderBottom: '1px solid #e2e8f0' },
          body: { padding: 0 },
        }}
        title={<span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>Lista de Convocados</span>}
      >
        <div className="table-responsive-wrapper">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={attendees}
            pagination={false}
            size="small"
            scroll={{ x: 620 }}
          />
        </div>
      </Card>

      <Modal
        title={<span style={{ color: '#0032A0', fontSize: 14, fontWeight: 600 }}>Assistente Visual de Presença</span>}
        open={isCameraModalOpen}
        onCancel={() => setIsCameraModalOpen(false)}
        footer={null}
        width={460}
        style={{ maxWidth: '95vw' }}
      >
        <Alert
          message="Assistência Visual para o Instrutor"
          description="Auxílio visual para conferência rápida de presença. Não substitui assinatura formal."
          type="info"
          showIcon
          style={{ marginBottom: 12, borderRadius: 4, padding: '8px 12px' }}
        />

        <div
          style={{
            height: 180,
            background: '#0f172a',
            borderRadius: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 100,
              height: 120,
              border: '2px dashed #00B5AD',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <EyeOutlined style={{ fontSize: 24, color: '#00B5AD' }} />
          </div>
          <Text style={{ color: '#94a3b8', marginTop: 8, fontSize: 11.5 }}>
            Enquadre o rosto do operador
          </Text>
        </div>

        {simulatedMatchName && (
          <div style={{ marginTop: 12, textAlign: 'center' }}>
            <Tag color="cyan" style={{ padding: '4px 12px', fontSize: 12, borderRadius: 3 }}>
              Identificado: <strong>{simulatedMatchName}</strong>
            </Tag>
          </div>
        )}

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <Space>
            <Button size="small" onClick={handleSimulateFacialScan}>
              Identificar
            </Button>
            <Button
              type="primary"
              size="small"
              disabled={!simulatedMatchName}
              onClick={handleConfirmFacialAttendance}
              style={{ backgroundColor: '#0032A0', borderColor: '#0032A0', borderRadius: 4 }}
            >
              Confirmar Presença
            </Button>
          </Space>
        </div>
      </Modal>
    </div>
  );
};
