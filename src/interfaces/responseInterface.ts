export interface ApiSuccess<T> {
  data: T;
  ok: true;
  status: number;
}

export interface ApiError {
  data: string;
  ok: false;
  status: number;
}

export type ResponseInterface<T = unknown> = ApiSuccess<T> | ApiError;
