export type AttendanceStatus = 'presente' | 'ausente' | 'justificado';

export interface Attendee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  avatarUrl?: string;
}

export interface AttendanceRecord {
  id: string;
  trainingId: string;
  employeeId: string;
  employeeName: string;
  status: AttendanceStatus;
  verifiedAt?: string;
  verificationMethod: 'manual' | 'camera_auxiliar';
  notes?: string;
}

export interface CameraAuxiliaryMatch {
  detected: boolean;
  suggestedEmployeeId?: string;
  suggestedName?: string;
  note: string;
}
