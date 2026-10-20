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

const { Title, Paragraph, Text } = Typography;

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
  { id: '2', name: 'Anderson Rodrigo Lima', badgeId: 'MAT-12903', department: 'Oficina Mecânica Agrícola', role: 'Mecânico Senior', status: 'presente' },
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
    message.success('Presença atualizada com sucesso.');
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
      message.success(`Presença confirmada para ${simulatedMatchName}!`);
      setSimulatedMatchName(null);
      setIsCameraModalOpen(false);
    }
  };

  const columns: ColumnsType<StudentAttendee> = [
    {
      title: 'Colaborador / Operador',
      key: 'name',
      render: (_, record) => (
        <Space size="middle">
          <Avatar style={{ backgroundColor: '#eef2ff', color: '#0032a0', fontWeight: 600 }}>
            {record.name.charAt(0)}
          </Avatar>
          <div>
            <Text strong style={{ color: '#184080', fontSize: 14 }}>{record.name}</Text>
            <div style={{ fontSize: 12, color: '#54595F' }}>{record.role} • Matrícula: {record.badgeId}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Frente / Setor',
      dataIndex: 'department',
      key: 'department',
      render: (dep) => <Tag style={{ borderRadius: 4, background: '#f8fbfd', border: '1px solid #e7e7e7', color: '#3d3d3d' }}>{dep}</Tag>,
    },
    {
      title: 'Situação na Chamada',
      dataIndex: 'status',
      key: 'status',
      render: (status: AttendanceStatus) => {
        if (status === 'presente') return <Tag color="success" icon={<CheckCircleOutlined />} style={{ borderRadius: 4, fontWeight: 600 }}>Presente</Tag>;
        if (status === 'justificado') return <Tag color="warning" icon={<WarningOutlined />} style={{ borderRadius: 4, fontWeight: 600 }}>Justificado</Tag>;
        return <Tag color="error" icon={<CloseCircleOutlined />} style={{ borderRadius: 4, fontWeight: 600 }}>Ausente</Tag>;
      },
    },
    {
      title: 'Controle de Frequência',
      key: 'actions',
      render: (_, record) => (
        <Radio.Group
          size="middle"
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
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      <div className="lins-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <Title level={2} className="lins-page-title" style={{ margin: 0, fontSize: 24 }}>
            Painel do Instrutor & Controle de Turma
          </Title>
          <Paragraph type="secondary" style={{ margin: '4px 0 0', color: '#54595F', fontSize: 14 }}>
            Turma: <strong>NR-31: Segurança e Saúde no Trabalho Agroindustrial</strong> • Sala 01 CT Lins
          </Paragraph>
        </div>

        <Button
          type="primary"
          icon={<CameraOutlined />}
          size="middle"
          onClick={() => {
            setSimulatedMatchName(null);
            setIsCameraModalOpen(true);
          }}
          style={{
            backgroundColor: '#0032A0',
            borderColor: '#0032A0',
            borderRadius: 6,
            height: 40,
            padding: '0 20px',
          }}
        >
          Chamada com Assistência por Câmera
        </Button>
      </div>

      <Card bordered={false} className="lins-card">
        <div className="table-responsive-wrapper">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={attendees}
            pagination={false}
          />
        </div>
      </Card>

      <Modal
        title={
          <div>
            <div style={{ fontSize: 12, color: '#00B5AD', fontWeight: 600, textTransform: 'uppercase' }}>
              Universidade Corporativa Lins Agro
            </div>
            <div style={{ fontSize: 16, color: '#0032A0', fontWeight: 700 }}>
              Assistente de Conferência Visual de Presença
            </div>
          </div>
        }
        open={isCameraModalOpen}
        onCancel={() => setIsCameraModalOpen(false)}
        footer={null}
        width={560}
      >
        <Alert
          message="Assistência Visual para o Instrutor"
          description="Este recurso atua exclusivamente como auxílio visual para conferência rápida de presença dos operadores em sala de treinamento. Não substitui assinatura formal nem constitui biometria pericial."
          type="info"
          showIcon
          style={{ marginBottom: 20, borderRadius: 6, borderColor: '#d0e1fd', background: '#f8fbfd' }}
        />

        <div
          style={{
            height: 250,
            background: '#184080',
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: 140,
              height: 170,
              border: '2px dashed #00B5AD',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(0, 181, 173, 0.3)',
            }}
          >
            <EyeOutlined style={{ fontSize: 32, color: '#00B5AD' }} />
          </div>
          <Text style={{ color: '#ffffff', marginTop: 12, fontSize: 13, fontWeight: 500 }}>
            Posicione o rosto do colaborador na área indicada
          </Text>
        </div>

        {simulatedMatchName && (
          <div style={{ marginTop: 18, textAlign: 'center' }}>
            <Tag color="cyan" style={{ padding: '6px 16px', fontSize: 13, borderRadius: 4, background: '#e6f7f6', color: '#0d9690', borderColor: '#b3e7e4' }}>
              Operador Reconhecido: <strong>{simulatedMatchName}</strong>
            </Tag>
          </div>
        )}

        <div style={{ marginTop: 22, textAlign: 'center' }}>
          <Space size="middle">
            <Button onClick={handleSimulateFacialScan} style={{ borderRadius: 6 }}>
              Identificar Participante
            </Button>
            <Button
              type="primary"
              disabled={!simulatedMatchName}
              onClick={handleConfirmFacialAttendance}
              style={{ backgroundColor: '#0032A0', borderColor: '#0032A0', borderRadius: 6 }}
            >
              Confirmar Presença na Turma
            </Button>
          </Space>
        </div>
      </Modal>
    </div>
  );
};
