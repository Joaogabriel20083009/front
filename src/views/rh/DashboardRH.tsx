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

const { Title, Paragraph, Text } = Typography;
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
        return <Tag color="blue" style={{ borderRadius: 4 }}>Planejado</Tag>;
      case 'em_andamento':
        return <Tag color="cyan" style={{ borderRadius: 4, color: '#0d9690', borderColor: '#b3e7e4', background: '#e6f7f6' }}>Em Andamento</Tag>;
      case 'concluido':
        return <Tag color="green" style={{ borderRadius: 4 }}>Concluído</Tag>;
      case 'cancelado':
        return <Tag color="error" style={{ borderRadius: 4 }}>Cancelado</Tag>;
      default:
        return <Tag style={{ borderRadius: 4 }}>{status}</Tag>;
    }
  };

  const columns: ColumnsType<Training> = [
    {
      title: 'Programa de Treinamento',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          <Text strong style={{ color: '#184080', fontSize: 14 }}>{text}</Text>
          <div style={{ fontSize: 12, color: '#54595F', marginTop: 2 }}>{record.category}</div>
        </div>
      ),
    },
    {
      title: 'Instrutor / Facilitador',
      dataIndex: 'instructor',
      key: 'instructor',
      render: (val) => <span style={{ color: '#3d3d3d' }}>{val}</span>,
    },
    {
      title: 'Carga Horária',
      dataIndex: 'workloadHours',
      key: 'workloadHours',
      render: (hours) => <Tag style={{ borderRadius: 4, background: '#f2f5f7', border: '1px solid #e7e7e7', color: '#184080', fontWeight: 600 }}>{hours} horas</Tag>,
    },
    {
      title: 'Período',
      key: 'period',
      render: (_, record) => <span style={{ color: '#54595F', fontSize: 13 }}>{record.startDate} a {record.endDate}</span>,
    },
    {
      title: 'Ocupação de Vagas',
      key: 'occupancy',
      render: (_, record) => (
        <span style={{ fontSize: 13, fontWeight: 500, color: '#184080' }}>
          {record.enrolledCount} / {record.capacity} vagas
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: TrainingStatus) => getStatusTag(status),
    },
  ];

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      <div className="lins-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <Title level={2} className="lins-page-title" style={{ margin: 0, fontSize: 24 }}>
            Painel Geral do RH
          </Title>
          <Paragraph type="secondary" style={{ margin: '4px 0 0', color: '#54595F', fontSize: 14 }}>
            Monitoramento de capacitação técnica, normas regulamentadoras e desenvolvimento de equipes da Lins Agroindustrial.
          </Paragraph>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="middle"
          onClick={() => setIsModalOpen(true)}
          style={{
            backgroundColor: '#0032A0',
            borderColor: '#0032A0',
            borderRadius: 6,
            height: 40,
            padding: '0 20px',
            boxShadow: '0 2px 4px rgba(0, 50, 160, 0.15)',
          }}
        >
          Novo Treinamento
        </Button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]} style={{ marginBottom: 28 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card className="lins-card" bordered={false}>
                <Statistic
                  title={<span style={{ color: '#54595F', fontSize: 13, fontWeight: 500 }}>Treinamentos Ativos</span>}
                  value={indicators?.activeTrainings || 0}
                  valueStyle={{ color: '#0032A0', fontWeight: 700 }}
                  prefix={<ReadOutlined style={{ color: '#0032A0', marginRight: 8 }} />}
                  suffix={<span style={{ fontSize: 14, color: '#8c9ba5', fontWeight: 400 }}>/ {indicators?.totalTrainings || 0} total</span>}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="lins-card" bordered={false}>
                <Statistic
                  title={<span style={{ color: '#54595F', fontSize: 13, fontWeight: 500 }}>Colaboradores Capacitados</span>}
                  value={indicators?.trainedEmployeesCount || 0}
                  valueStyle={{ color: '#184080', fontWeight: 700 }}
                  prefix={<TeamOutlined style={{ color: '#00B5AD', marginRight: 8 }} />}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="lins-card" bordered={false}>
                <Statistic
                  title={<span style={{ color: '#54595F', fontSize: 13, fontWeight: 500 }}>Taxa Média de Presença</span>}
                  value={indicators?.averageAttendanceRate || 0}
                  valueStyle={{ color: '#0D9690', fontWeight: 700 }}
                  precision={1}
                  prefix={<CheckCircleOutlined style={{ color: '#0D9690', marginRight: 8 }} />}
                  suffix="%"
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="lins-card" bordered={false}>
                <Statistic
                  title={<span style={{ color: '#54595F', fontSize: 13, fontWeight: 500 }}>Horas de Capacitação</span>}
                  value={indicators?.totalTrainingHours || 0}
                  valueStyle={{ color: '#0032A0', fontWeight: 700 }}
                  prefix={<ClockCircleOutlined style={{ color: '#3063D6', marginRight: 8 }} />}
                  suffix={<span style={{ fontSize: 14, color: '#54595F' }}>h</span>}
                />
              </Card>
            </Col>
          </Row>

          <Card
            title={
              <span style={{ color: '#184080', fontWeight: 700, fontSize: 16 }}>
                Programas de Capacitação Corporativa
              </span>
            }
            bordered={false}
            className="lins-card"
          >
            <div className="table-responsive-wrapper">
              <Table
                rowKey="id"
                columns={columns}
                dataSource={trainings}
                pagination={{ pageSize: 5 }}
              />
            </div>
          </Card>
        </>
      )}

      <Modal
        title={
          <span style={{ color: '#0032A0', fontWeight: 700, fontSize: 16 }}>
            Cadastrar Novo Programa de Treinamento
          </span>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateTraining}
          initialValues={{ capacity: 30, workloadHours: 16, category: 'Segurança do Trabalho' }}
          style={{ marginTop: 16 }}
        >
          <Form.Item
            name="title"
            label="Título do Treinamento"
            rules={[{ required: true, message: 'Informe o título do treinamento' }]}
          >
            <Input placeholder="Ex: NR-35: Trabalho em Altura na Indústria" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Categoria / Área"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="Segurança do Trabalho">Segurança do Trabalho (NRs)</Option>
                  <Option value="Agrícola">Agrícola & Colheita</Option>
                  <Option value="Indústria">Indústria & Destilaria</Option>
                  <Option value="Qualidade & BPF">Qualidade & BPF</Option>
                  <Option value="Liderança">Liderança & Gestão</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="instructor"
                label="Instrutor / Facilitador"
                rules={[{ required: true, message: 'Informe o nome do instrutor' }]}
              >
                <Input placeholder="Ex: Eng. Carlos Silva" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="workloadHours"
                label="Carga Horária (horas)"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} max={200} style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="capacity"
                label="Capacidade de Vagas"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} max={500} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="location"
            label="Local de Realização"
            rules={[{ required: true, message: 'Informe o local ou sala' }]}
          >
            <Input placeholder="Ex: Centro de Treinamento Lins - Sala 02" />
          </Form.Item>

          <Form.Item name="dates" label="Período de Realização">
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="description" label="Ementa / Conteúdo Programático">
            <Input.TextArea rows={3} placeholder="Objetivos pedagógicos, normas aplicáveis..." />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right', marginBottom: 0, marginTop: 24 }}>
            <Space>
              <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: '#0032A0', borderColor: '#0032A0' }}
              >
                Salvar Treinamento
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
