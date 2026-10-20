import type { Training } from '../types/training';

export interface RHIndicators {
  totalTrainings: number;
  activeTrainings: number;
  trainedEmployeesCount: number;
  averageAttendanceRate: number; // Porcentagem
  totalTrainingHours: number;
}

export const mockRHIndicators: RHIndicators = {
  totalTrainings: 12,
  activeTrainings: 4,
  trainedEmployeesCount: 148,
  averageAttendanceRate: 92.5,
  totalTrainingHours: 360,
};

export const mockTrainings: Training[] = [
  {
    id: 'tr-01',
    title: 'Integração de Cultura & Compliance 2026',
    description: 'Normas de governança, ética corporativa e diretrizes internas.',
    category: 'Institucional',
    instructor: 'Dra. Mariana Vasconcelos',
    workloadHours: 8,
    startDate: '2026-10-25',
    endDate: '2026-10-26',
    location: 'Auditório Principal / Híbrido',
    capacity: 40,
    enrolledCount: 38,
    status: 'planejado',
  },
  {
    id: 'tr-02',
    title: 'Liderança Ágil e Gestão de Conflitos',
    description: 'Capacitação prática para gestores operacionais e coordenadores.',
    category: 'Liderança',
    instructor: 'Carlos Eduardo Ramos',
    workloadHours: 16,
    startDate: '2026-10-20',
    endDate: '2026-10-22',
    location: 'Sala de Treinamento B',
    capacity: 25,
    enrolledCount: 25,
    status: 'em_andamento',
  },
  {
    id: 'tr-03',
    title: 'Segurança da Informação e LGPD no Dia a Dia',
    description: 'Proteção de dados corporativos, privacidade e políticas de segurança.',
    category: 'Tecnologia',
    instructor: 'Roberto Siqueira',
    workloadHours: 6,
    startDate: '2026-10-10',
    endDate: '2026-10-11',
    location: 'Online via Plataforma',
    capacity: 100,
    enrolledCount: 95,
    status: 'concluido',
  },
  {
    id: 'tr-04',
    title: 'Excel Avançado e Análise de Dados para RH',
    description: 'Modelagem de dados, fórmulas complexas e dashboards.',
    category: 'Ferramentas',
    instructor: 'Aline Pires',
    workloadHours: 12,
    startDate: '2026-11-03',
    endDate: '2026-11-05',
    location: 'Laboratório de Informática',
    capacity: 20,
    enrolledCount: 14,
    status: 'planejado',
  },
];
