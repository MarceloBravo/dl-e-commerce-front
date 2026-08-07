import type { ResponseInterface } from "../interfaces/responseInterface";

const BASE_URL = 'https://dummyjson.com';

const buildErrorResponse = (message: string, status = 500): ResponseInterface => ({
  data: message,
  ok: false,
  status,
});

export const apiClient = async (endpoint: string, options: RequestInit = {}): Promise<ResponseInterface> => {
  try {
    const url = `${BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw Object.assign(new Error(`HTTP error! status: ${response.status}`), {
        status: response.status,
      });
    }

    const responseData = await response.json();

    return {
      ...responseData,
      data: responseData,
      ok: true,
      status: response.status,
    } as ResponseInterface;
  } catch (error) {
    const status = error instanceof Error && 'status' in error && typeof error.status === 'number'
      ? error.status
      : 500;
    const message = error instanceof Error ? error.message : 'Unknown error';

    console.error('Error in apiClient:', message);
    throw buildErrorResponse(message, status);
  }
};