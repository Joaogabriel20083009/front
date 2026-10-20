export type TrainingStatus = 'planejado' | 'em_andamento' | 'concluido' | 'cancelado';

export interface Training {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  workloadHours: number;
  startDate: string;
  endDate: string;
  location: string;
  capacity: number;
  enrolledCount: number;
  status: TrainingStatus;
}

export interface TrainingFilter {
  category?: string;
  status?: TrainingStatus;
  search?: string;
}

export interface TrainingEnrollmentRequest {
  trainingId: string;
  employeeIds: string[];
}
