interface TApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error: null;
}

interface TErrorResponse {
  success: false;
  error: string;
  message: string;
  data: null;
}

export type { TApiResponse, TErrorResponse };
