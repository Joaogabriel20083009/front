import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Tag,
  Button,
  Space,
  Typography,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  message,
  Spin,
} from 'antd';
import {
  PlusOutlined,
  ReadOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Training, TrainingStatus } from '../../lib/types/training';
import { trainingService } from '../../lib/trainingService';
import type { RHIndicators } from '../../lib/mocks/trainingMock';

const { Title, Text } = Typography;
const { Option } = Select;

export const DashboardRH: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [indicators, setIndicators] = useState<RHIndicators | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  const reloadData = React.useCallback(async () => {
    try {
      setLoading(true);
      const [trainingsData, indicatorsData] = await Promise.all([
        trainingService.listTrainings(),
        trainingService.getIndicators(),
      ]);
      setTrainings(trainingsData);
      setIndicators(indicatorsData);
    } catch {
      message.error('Não foi possível carregar os dados do dashboard.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      trainingService.listTrainings(),
      trainingService.getIndicators(),
    ])
      .then(([trainingsData, indicatorsData]) => {
        if (isMounted) {
          setTrainings(trainingsData);
          setIndicators(indicatorsData);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          message.error('Não foi possível carregar os dados do dashboard.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreateTraining = async (values: any) => {
    try {
      const formattedDates = values.dates
        ? [values.dates[0].format('YYYY-MM-DD'), values.dates[1].format('YYYY-MM-DD')]
        : ['2026-11-01', '2026-11-02'];

      await trainingService.createTraining({
        title: values.title,
        description: values.description || '',
        category: values.category,
        instructor: values.instructor,
        workloadHours: values.workloadHours,
        capacity: values.capacity,
        startDate: formattedDates[0],
        endDate: formattedDates[1],
        location: values.location,
        status: 'planejado',
      });

      message.success('Treinamento cadastrado com sucesso!');
      setIsModalOpen(false);
      form.resetFields();
      reloadData();
    } catch {
      message.error('Erro ao cadastrar novo treinamento.');
    }
  };

  const getStatusTag = (status: TrainingStatus) => {
    switch (status) {
      case 'planejado':
        return <Tag color="blue" style={{ borderRadius: 3, fontSize: 11, margin: 0 }}>Planejado</Tag>;
      case 'em_andamento':
        return <Tag color="cyan" style={{ borderRadius: 3, fontSize: 11, margin: 0 }}>Em Andamento</Tag>;
      case 'concluido':
        return <Tag color="green" style={{ borderRadius: 3, fontSize: 11, margin: 0 }}>Concluído</Tag>;
      case 'cancelado':
        return <Tag color="error" style={{ borderRadius: 3, fontSize: 11, margin: 0 }}>Cancelado</Tag>;
      default:
        return <Tag style={{ borderRadius: 3, fontSize: 11, margin: 0 }}>{status}</Tag>;
    }
  };

  const columns: ColumnsType<Training> = [
    {
      title: 'Treinamento',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          <Text strong style={{ color: '#0f172a', fontSize: 13 }}>{text}</Text>
          <div style={{ fontSize: 11, color: '#64748b' }}>{record.category}</div>
        </div>
      ),
    },
    {
      title: 'Instrutor',
      dataIndex: 'instructor',
      key: 'instructor',
      render: (val) => <span style={{ color: '#475569', fontSize: 12.5 }}>{val}</span>,
    },
    {
      title: 'Carga',
      dataIndex: 'workloadHours',
      key: 'workloadHours',
      width: 90,
      render: (hours) => <Tag style={{ borderRadius: 3, background: '#f1f5f9', border: 'none', color: '#334155', fontSize: 11.5 }}>{hours}h</Tag>,
    },
    {
      title: 'Período',
      key: 'period',
      width: 170,
      render: (_, record) => <span style={{ color: '#64748b', fontSize: 12 }}>{record.startDate} ~ {record.endDate}</span>,
    },
    {
      title: 'Vagas',
      key: 'occupancy',
      width: 130,
      render: (_, record) => (
        <span style={{ fontSize: 12, color: '#0f172a' }}>
          <strong>{record.enrolledCount}</strong> / {record.capacity}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: TrainingStatus) => getStatusTag(status),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Cabeçalho Limpo */}
      <div className="lins-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <Title level={4} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>
            Painel Geral do RH
          </Title>
          <Text type="secondary" style={{ fontSize: 12.5 }}>
            Indicadores e grade de capacitação da Lins Agroindustrial
          </Text>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="middle"
          onClick={() => setIsModalOpen(true)}
          style={{ backgroundColor: '#0032A0', borderColor: '#0032A0', borderRadius: 4 }}
        >
          Novo Treinamento
        </Button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Spin />
        </div>
      ) : (
        <>
          {/* Cards de Indicadores Compactos */}
          <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
            <Col xs={12} sm={6}>
              <Card className="lins-card" styles={{ body: { padding: '12px 14px' } }}>
                <Statistic
                  title={<span style={{ color: '#64748b', fontSize: 11.5, textTransform: 'uppercase', letterSpacing: 0.5 }}>Treinamentos Ativos</span>}
                  value={indicators?.activeTrainings || 0}
                  valueStyle={{ color: '#0032A0', fontWeight: 700, fontSize: 20 }}
                  prefix={<ReadOutlined style={{ color: '#0032A0', fontSize: 14 }} />}
                  suffix={<span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 400 }}>/ {indicators?.totalTrainings || 0}</span>}
                />
              </Card>
            </Col>

            <Col xs={12} sm={6}>
              <Card className="lins-card" styles={{ body: { padding: '12px 14px' } }}>
                <Statistic
                  title={<span style={{ color: '#64748b', fontSize: 11.5, textTransform: 'uppercase', letterSpacing: 0.5 }}>Capacitados</span>}
                  value={indicators?.trainedEmployeesCount || 0}
                  valueStyle={{ color: '#0f172a', fontWeight: 700, fontSize: 20 }}
                  prefix={<TeamOutlined style={{ color: '#00B5AD', fontSize: 14 }} />}
                />
              </Card>
            </Col>

            <Col xs={12} sm={6}>
              <Card className="lins-card" styles={{ body: { padding: '12px 14px' } }}>
                <Statistic
                  title={<span style={{ color: '#64748b', fontSize: 11.5, textTransform: 'uppercase', letterSpacing: 0.5 }}>Presença Média</span>}
                  value={indicators?.averageAttendanceRate || 0}
                  valueStyle={{ color: '#0D9690', fontWeight: 700, fontSize: 20 }}
                  precision={1}
                  prefix={<CheckCircleOutlined style={{ color: '#0D9690', fontSize: 14 }} />}
                  suffix="%"
                />
              </Card>
            </Col>

            <Col xs={12} sm={6}>
              <Card className="lins-card" styles={{ body: { padding: '12px 14px' } }}>
                <Statistic
                  title={<span style={{ color: '#64748b', fontSize: 11.5, textTransform: 'uppercase', letterSpacing: 0.5 }}>Horas Realizadas</span>}
                  value={indicators?.totalTrainingHours || 0}
                  valueStyle={{ color: '#0032A0', fontWeight: 700, fontSize: 20 }}
                  prefix={<ClockCircleOutlined style={{ color: '#3063D6', fontSize: 14 }} />}
                  suffix={<span style={{ fontSize: 12, color: '#64748b' }}>h</span>}
                />
              </Card>
            </Col>
          </Row>

          {/* Tabela de Treinamentos Compacta */}
          <Card
            styles={{
              header: { minHeight: 40, padding: '0 14px', borderBottom: '1px solid #e2e8f0' },
              body: { padding: 0 },
            }}
            title={<span style={{ color: '#0f172a', fontWeight: 600, fontSize: 13.5 }}>Grade de Treinamentos</span>}
            className="lins-card"
          >
            <div className="table-responsive-wrapper">
              <Table
                rowKey="id"
                columns={columns}
                dataSource={trainings}
                pagination={{ pageSize: 6, size: 'small' }}
                size="small"
              />
            </div>
          </Card>
        </>
      )}

      {/* Modal de Criação de Treinamento */}
      <Modal
        title={<span style={{ color: '#0032A0', fontWeight: 600, fontSize: 15 }}>Novo Treinamento</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          size="middle"
          onFinish={handleCreateTraining}
          initialValues={{ capacity: 30, workloadHours: 16, category: 'Segurança do Trabalho' }}
          style={{ marginTop: 12 }}
        >
          <Form.Item
            name="title"
            label="Título"
            rules={[{ required: true, message: 'Informe o título' }]}
            style={{ marginBottom: 12 }}
          >
            <Input placeholder="Ex: NR-35: Trabalho em Altura" />
          </Form.Item>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="category" label="Área" rules={[{ required: true }]} style={{ marginBottom: 12 }}>
                <Select>
                  <Option value="Segurança do Trabalho">Segurança (NRs)</Option>
                  <Option value="Agrícola">Agrícola</Option>
                  <Option value="Indústria">Indústria</Option>
                  <Option value="Qualidade & BPF">Qualidade & BPF</Option>
                  <Option value="Liderança">Liderança</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="instructor" label="Instrutor" rules={[{ required: true }]} style={{ marginBottom: 12 }}>
                <Input placeholder="Nome do facilitador" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="workloadHours" label="Carga Horária (h)" rules={[{ required: true }]} style={{ marginBottom: 12 }}>
                <InputNumber min={1} max={200} style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="capacity" label="Vagas" rules={[{ required: true }]} style={{ marginBottom: 12 }}>
                <InputNumber min={1} max={500} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="location" label="Local" rules={[{ required: true }]} style={{ marginBottom: 12 }}>
            <Input placeholder="Ex: Sala 01 CT Lins" />
          </Form.Item>

          <Form.Item name="dates" label="Período" style={{ marginBottom: 12 }}>
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="description" label="Ementa / Observações" style={{ marginBottom: 16 }}>
            <Input.TextArea rows={2} placeholder="Descrição rápida..." />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Space>
              <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button type="primary" htmlType="submit" style={{ backgroundColor: '#0032A0', borderColor: '#0032A0' }}>
                Salvar
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
