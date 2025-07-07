const STATUS_CODE = {
  // 1xx: Informational
  CONTINUE: 100, // Server has received headers and expects body
  SWITCHING_PROTOCOL: 101, // Protocol switch (e.g., HTTP to WebSocket)
  EARLY_HINTS: 103, // Preload resources before final response

  // 2xx: Success
  OK: 200, // Request successful
  RESOURCE_CREATED: 201, // Resource created (e.g., POST success)
  ACCEPTED: 202, // Request accepted but not processed yet
  NO_CONTENT: 204, // Success, no content in response
  PARTIAL_CONTENT: 206, // Partial content (used in range requests)

  // 3xx: Redirection
  REDIRECT: 301, // URL permanently moved
  FOUND: 302, // URL temporarily moved
  SEE_OTHER: 303, // Redirect after POST to GET (e.g., success page)
  NOT_MODIFIED: 304, // Cached version still valid

  // 4xx: Client Errors
  BAD_REQUEST: 400, // Data validation failed or malformed request
  UNAUTHORIZED: 401, // Not logged in or invalid token
  FORBIDDEN: 403, // Authenticated but not allowed (e.g., not admin)
  NOT_FOUND: 404, // Resource not found
  METHOD_NOT_ALLOWED: 405, // HTTP method not allowed on this route
  CONFLICT: 409, // Resource conflict (e.g., email already exists)
  GONE: 410, // Resource permanently removed
  UNPROCESSABLE_ENTITY: 422, // Semantically invalid data (e.g., weak password)
  TOO_MANY_REQUESTS: 429, // Rate limit exceeded

  // 5xx: Server Errors
  INTERNAL_SERVER_ERROR: 500, // Server-side failure
  NOT_IMPLEMENTED: 501, // Not implemented (e.g., feature not ready)
  BAD_GATEWAY: 502, // Invalid response from upstream server
  SERVICE_UNAVAILABLE: 503, // Server down or under maintenance
  GATEWAY_TIMEOUT: 504, // Timeout from upstream service
};

export { STATUS_CODE };
