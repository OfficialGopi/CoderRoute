import type { TApiResponse, TErrorResponse } from "../types/fetchApi.types";

class FetchApi {
  public baseUrl: string;

  constructor() {
    const apiUrl = (import.meta as any).env.VITE_API_URL ?? "";
    this.baseUrl = apiUrl + "/api";
  }

  public init(service: string) {
    return async <T, TBody = undefined>(
      url: string,
      method:
        | "GET"
        | "POST"
        | "PUT"
        | "PATCH"
        | "DELETE"
        | "HEAD"
        | "OPTIONS" = "GET",
      body?: TBody,
      headers?: Record<string, string>,
    ): Promise<TApiResponse<T> | TErrorResponse> => {
      try {
        if (body && (method === "GET" || method === "HEAD")) {
          throw new Error("Request body not allowed for GET or HEAD requests.");
        }
        const options: RequestInit = {
          method: String(method),
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
          credentials: "include",
        };
        const res = await fetch(this.baseUrl + service + url, options);
        const data = await res.json();
        return data as TApiResponse<T>;
      } catch (error: unknown) {
        return error as TErrorResponse;
      }
    };
  }
}

const fetchApi = new FetchApi();

export { fetchApi };
