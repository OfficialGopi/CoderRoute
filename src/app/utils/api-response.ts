class ApiResponse {
  public statusCode: number;
  public data: {
    [key: string]: any;
  } | null;
  public success: boolean;
  public message: string;

  constructor(
    statusCode: number,
    data: {
      [key: string]: any;
    } | null,
    message: string = "Success",
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
