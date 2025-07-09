import { fetchApi } from "../utils/FetchApi";

class AuthServices {
  public authFetchData;
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
    try {
      const response = await this.authFetchData("/signup", "POST", {
        name,
        email,
        username,
        password,
        confirmPassword,
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  public async login({
    credentials,
    password,
  }: {
    credentials: string;
    password: string;
  }) {
    try {
      const response = await this.authFetchData("/login", "POST", {
        credentials,
        password,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public async refreshAccessToken() {
    try {
      const response = await this.authFetchData(
        "/refresh-access-token",
        "PATCH",
      );

      return await response.json();
    } catch (error) {
      return error;
    }
  }

  public async forgotPasswordRequest(email: string) {
    try {
      const response = await this.authFetchData(
        "/forgot-password-request",
        "POST",
        {
          email,
        },
      );

      return response;
    } catch (error) {
      return error;
    }
  }

  public async resetForgottenPassword(
    token: string,
    newPassword: string,
    confirmNewPassword: string,
  ) {
    try {
      const response = await this.authFetchData(
        `/reset-forgotten-password?token=${token}`,
        "POST",
        {
          newPassword,
          confirmNewPassword,
        },
      );

      return response;
    } catch (error) {
      return error;
    }
  }

  public async verifyEmail(token: string) {
    try {
      const response = await this.authFetchData(`/verify-email/${token}`);

      return response;
    } catch (error) {
      return error;
    }
  }

  public async resendEmailVerification() {
    try {
      const response = await this.authFetchData(
        "/resend-email-verification-token",
        "PATCH",
      );

      return response;
    } catch (error) {
      return error;
    }
  }

  public async logout() {
    try {
      const response = await this.authFetchData("/logout", "DELETE");

      return response;
    } catch (error) {
      return error;
    }
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
    try {
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
    } catch (error) {
      return error;
    }
  }

  public async getUser() {
    try {
      const response = await this.authFetchData("/me");
      return response;
    } catch (error) {
      return error;
    }
  }
}

const authServices = new AuthServices();

export { authServices };
