// Camada base de comunicação HTTP Client-Side
// Isola a URL base do backend e fornece interface de requisição segura.

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
export const USE_MOCKS = import.meta.env.VITE_USE_MOCK !== 'false';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Cliente HTTP para requisições frontend.
 * Prepara a integração com o backend da equipe sem inventar regras no cliente.
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    throw new Error(`Erro na requisição [${response.status}]: ${errorBody || response.statusText}`);
  }

  return response.json() as Promise<T>;
}
