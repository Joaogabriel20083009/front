export interface Certificate {
  id: string;
  code: string;
  employeeName: string;
  employeeDocument: string;
  trainingTitle: string;
  workloadHours: number;
  issueDate: string;
  completionDate: string;
  instructorName: string;
  isValid: boolean;
  qrCodeUrl?: string;
}

export interface CertificateVerificationResult {
  found: boolean;
  certificate?: Certificate;
  verificationMessage: string;
  verifiedAt: string;
}
