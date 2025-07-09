class FetchApi {
  public baseUrl: string;

  constructor() {
    const apiUrl = (import.meta as any).env.VITE_API_URL ?? "";
    this.baseUrl = apiUrl + "/api";
  }

  public init(service: string) {
    return async (
      url: string,
      method:
        | "GET"
        | "POST"
        | "PUT"
        | "PATCH"
        | "DELETE"
        | "HEAD"
        | "OPTIONS" = "GET",
      body:
        | {
            [key: string]: string;
          }
        | undefined = undefined,
      headers: Record<string, string> = {},
    ) => {
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
        return {
          success: true,
          error: undefined,
          ...data,
        };
      } catch (error: any) {
        return {
          success: false,
          data: undefined,
          ...error,
        };
      }
    };
  }
}

const fetchApi = new FetchApi();

export { fetchApi };
