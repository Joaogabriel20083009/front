import { apiClient, USE_MOCKS } from './api';
import type { Training } from './types/training';
import { mockTrainings, mockRHIndicators, type RHIndicators } from './mocks/trainingMock';

export const trainingService = {
  async getIndicators(): Promise<RHIndicators> {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockRHIndicators;
    }
    return apiClient<RHIndicators>('/indicators');
  },

  async listTrainings(): Promise<Training[]> {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      return [...mockTrainings];
    }
    return apiClient<Training[]>('/trainings');
  },

  async createTraining(newTraining: Omit<Training, 'id' | 'enrolledCount'>): Promise<Training> {
    if (USE_MOCKS) {
      const created: Training = {
        ...newTraining,
        id: `tr-${Date.now()}`,
        enrolledCount: 0,
      };
      mockTrainings.unshift(created);
      return created;
    }
    return apiClient<Training>('/trainings', {
      method: 'POST',
      body: JSON.stringify(newTraining),
    });
  },
};
