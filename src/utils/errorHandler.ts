import type { ResponseInterface } from "../interfaces/responseInterface";

export const handleError = (error: unknown, fallbackMessage: string): ResponseInterface => {
    error.data = fallbackMessage ?? error.data;
    if (typeof error === 'object' && error !== null && 'ok' in error && 'status' in error && 'data' in error) {
        return error as ResponseInterface;
    }

    const status = typeof error === 'object' && error !== null && 'status' in error && typeof (error as { status?: unknown }).status === 'number'
      ? (error as { status: number }).status
      : 500;

    const message = error instanceof Error ? error.message : fallbackMessage;

    return {
      data: message,
      ok: false,
      status,
    };
  }