import { fetchApi } from "../utils/FetchApi";

class AuthServices {
  private authFetchData;
  constructor() {
    this.authFetchData = fetchApi.init("/auth");
  }

  public async signup({
    name,
    email,
    username,
    password,
    confirmPassword,
  }: {
    name: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) {
    const response = await this.authFetchData("/signup", "POST", {
      name,
      email,
      username,
      password,
      confirmPassword,
    });
    return response;
  }

  public async login({
    credentials,
    password,
  }: {
    credentials: string;
    password: string;
  }) {
    const response = await this.authFetchData("/login", "POST", {
      credentials,
      password,
    });

    return response;
  }

  public async refreshAccessToken() {
    const response = await this.authFetchData("/refresh-access-token", "PATCH");

    return response;
  }

  public async forgotPasswordRequest(email: string) {
    const response = await this.authFetchData(
      "/forgot-password-request",
      "POST",
      {
        email,
      },
    );

    return response;
  }

  public async resetForgottenPassword(
    token: string,
    newPassword: string,
    confirmNewPassword: string,
  ) {
    const response = await this.authFetchData(
      `/reset-forgotten-password?token=${token}`,
      "POST",
      {
        newPassword,
        confirmNewPassword,
      },
    );

    return response;
  }

  public async verifyEmail(token: string) {
    const response = await this.authFetchData(`/verify-email/${token}`);

    return response;
  }

  public async resendEmailVerification() {
    const response = await this.authFetchData(
      "/resend-email-verification-token",
      "PATCH",
    );

    return response;
  }

  public async logout() {
    const response = await this.authFetchData("/logout", "DELETE");

    return response;
  }
  public async changeCurrentPassword({
    currentPassword,
    newPassword,
    confirmNewPassword,
  }: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) {
    const response = await this.authFetchData(
      "/change-current-password",
      "PATCH",
      {
        currentPassword,
        newPassword,
        confirmNewPassword,
      },
    );

    return response;
  }

  public async getUser() {
    const response = await this.authFetchData("/me");
    return response;
  }
}

const authServices = new AuthServices();

export { authServices };
