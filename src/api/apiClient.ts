import type { ApiError, ResponseInterface } from "../interfaces/responseInterface";

//const BASE_URL = 'https://dummyjson.com';
const BASE_URL = import.meta.env.VITE_API_URL;

const buildErrorResponse = (message: string, status = 500): ApiError => ({
  data: message,
  ok: false,
  status,
});

export const apiClient = async <T,>(endpoint: string, options: RequestInit = {}): Promise<ResponseInterface<T>> => {
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

    const responseData = (await response.json()) as T;

    return {
      data: responseData,
      ok: true,
      status: response.status,
    } as ResponseInterface<T>;
  } catch (error) {
    const status = error instanceof Error && 'status' in error && typeof error.status === 'number'
      ? error.status
      : 500;
    const message = error instanceof Error ? error.message : 'Unknown error';

    console.error('Error in apiClient:', message);
    throw buildErrorResponse(message, status);
  }
};
