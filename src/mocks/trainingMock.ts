import type { Training } from '../types/training';

export interface RHIndicators {
  totalTrainings: number;
  activeTrainings: number;
  trainedEmployeesCount: number;
  averageAttendanceRate: number; // Porcentagem
  totalTrainingHours: number;
}

export const mockRHIndicators: RHIndicators = {
  totalTrainings: 18,
  activeTrainings: 5,
  trainedEmployeesCount: 640,
  averageAttendanceRate: 96.4,
  totalTrainingHours: 1420,
};

export const mockTrainings: Training[] = [
  {
    id: 'tr-01',
    title: 'NR-31: Segurança e Saúde no Trabalho Agroindustrial',
    description: 'Normas regulamentadoras obrigatórias para frentes de corte, plantio e logística canavieira.',
    category: 'Segurança do Trabalho',
    instructor: 'Eng. Roberto Vasconcelos',
    workloadHours: 20,
    startDate: '2026-10-22',
    endDate: '2026-10-25',
    location: 'Centro de Treinamento Agrícola - Sala 01',
    capacity: 35,
    enrolledCount: 32,
    status: 'em_andamento',
  },
  {
    id: 'tr-02',
    title: 'Operação e Manutenção Preventiva de Colhedoras de Cana',
    description: 'Técnicas avançadas de corte de base, telemetria e redução de consumo de combustível na colheita mecanizada.',
    category: 'Agrícola',
    instructor: 'Marcos Aurélio Pires',
    workloadHours: 40,
    startDate: '2026-10-28',
    endDate: '2026-11-03',
    location: 'Oficina Central / Campo Piloto',
    capacity: 25,
    enrolledCount: 22,
    status: 'planejado',
  },
  {
    id: 'tr-03',
    title: 'NR-13: Segurança Operacional em Caldeiras e Destilaria',
    description: 'Operação segura de vasos sob pressão, monitoramento termodinâmico e procedimentos de emergência.',
    category: 'Indústria',
    instructor: 'Dra. Camila Toledo',
    workloadHours: 16,
    startDate: '2026-10-15',
    endDate: '2026-10-17',
    location: 'Auditório da Usina / Área Industrial',
    capacity: 30,
    enrolledCount: 30,
    status: 'concluido',
  },
  {
    id: 'tr-04',
    title: 'Boas Práticas de Fabricação (BPF) no Processo de Açúcar',
    description: 'Higiene e conformidade sanitária para produção de açúcar cristal e levedura seca para exportação.',
    category: 'Qualidade & BPF',
    instructor: 'Aline Barbosa - Controle de Qualidade',
    workloadHours: 12,
    startDate: '2026-11-05',
    endDate: '2026-11-07',
    location: 'Laboratório Industrial Lins',
    capacity: 40,
    enrolledCount: 28,
    status: 'planejado',
  },
  {
    id: 'tr-05',
    title: 'Liderança Eficaz no Campo e Gestão de Frentes de Colheita',
    description: 'Desenvolvimento de supervisores e encarregados: feedback, engajamento e segurança operacional na safra.',
    category: 'Liderança',
    instructor: 'Carlos Eduardo Ramos - DHO',
    workloadHours: 16,
    startDate: '2026-11-10',
    endDate: '2026-11-12',
    location: 'Sala de Capacitação DHO',
    capacity: 20,
    enrolledCount: 15,
    status: 'planejado',
  },
];
