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
import type { Training, TrainingStatus } from '../../types/training';
import { trainingService } from '../../services/trainingService';
import type { RHIndicators } from '../../mocks/trainingMock';

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
        return <Tag color="blue">Planejado</Tag>;
      case 'em_andamento':
        return <Tag color="processing">Em Andamento</Tag>;
      case 'concluido':
        return <Tag color="success">Concluído</Tag>;
      case 'cancelado':
        return <Tag color="error">Cancelado</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const columns: ColumnsType<Training> = [
    {
      title: 'Treinamento',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <div style={{ fontSize: 12, color: '#64748b' }}>{record.category}</div>
        </div>
      ),
    },
    {
      title: 'Instrutor',
      dataIndex: 'instructor',
      key: 'instructor',
    },
    {
      title: 'Carga Horária',
      dataIndex: 'workloadHours',
      key: 'workloadHours',
      render: (hours) => `${hours}h`,
    },
    {
      title: 'Período',
      key: 'period',
      render: (_, record) => `${record.startDate} a ${record.endDate}`,
    },
    {
      title: 'Ocupação',
      key: 'occupancy',
      render: (_, record) => (
        <span>
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
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Dashboard do RH
          </Title>
          <Paragraph type="secondary" style={{ margin: 0 }}>
            Visão consolidada dos programas de treinamento, indicadores e gestão de turmas.
          </Paragraph>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => setIsModalOpen(true)}
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
          {/* Indicadores / KPIs */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card className="card-hover-shadow" bordered={false}>
                <Statistic
                  title="Treinamentos Ativos"
                  value={indicators?.activeTrainings || 0}
                  prefix={<ReadOutlined style={{ color: '#2563EB' }} />}
                  suffix={`/ ${indicators?.totalTrainings || 0}`}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="card-hover-shadow" bordered={false}>
                <Statistic
                  title="Colaboradores Capacitados"
                  value={indicators?.trainedEmployeesCount || 0}
                  prefix={<TeamOutlined style={{ color: '#10B981' }} />}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="card-hover-shadow" bordered={false}>
                <Statistic
                  title="Taxa Média de Presença"
                  value={indicators?.averageAttendanceRate || 0}
                  precision={1}
                  prefix={<CheckCircleOutlined style={{ color: '#059669' }} />}
                  suffix="%"
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="card-hover-shadow" bordered={false}>
                <Statistic
                  title="Horas de Treinamento"
                  value={indicators?.totalTrainingHours || 0}
                  prefix={<ClockCircleOutlined style={{ color: '#F59E0B' }} />}
                  suffix="h"
                />
              </Card>
            </Col>
          </Row>

          {/* Listagem de Treinamentos */}
          <Card
            title="Programas de Treinamento"
            bordered={false}
            className="card-hover-shadow"
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

      {/* Modal de Criação de Treinamento */}
      <Modal
        title="Cadastrar Novo Treinamento"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateTraining}
          initialValues={{ capacity: 30, workloadHours: 8, category: 'Institucional' }}
        >
          <Form.Item
            name="title"
            label="Título do Treinamento"
            rules={[{ required: true, message: 'Informe o título do treinamento' }]}
          >
            <Input placeholder="Ex: Comunicação Não-Violenta no Trabalho" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Categoria"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="Institucional">Institucional</Option>
                  <Option value="Liderança">Liderança</Option>
                  <Option value="Tecnologia">Tecnologia</Option>
                  <Option value="Ferramentas">Ferramentas</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="instructor"
                label="Instrutor / Facilitador"
                rules={[{ required: true, message: 'Informe o nome do instrutor' }]}
              >
                <Input placeholder="Ex: Profa. Helena Dias" />
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
            label="Local ou Plataforma"
            rules={[{ required: true, message: 'Informe o local ou link' }]}
          >
            <Input placeholder="Ex: Sala de Reunião A ou Teams" />
          </Form.Item>

          <Form.Item name="dates" label="Período (Início e Fim)">
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="description" label="Ementa / Descrição Breve">
            <Input.TextArea rows={3} placeholder="Objetivos e tópicos abordados..." />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Space>
              <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button type="primary" htmlType="submit">
                Salvar Treinamento
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
