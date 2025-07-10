import { fetchApi } from "../../utils/FetchApi";
import type {
  TChangeCurrentPasswordInput,
  TChangeCurrentPasswordResponse,
  TForgotPasswordRequestInput,
  TForgotPasswordRequestResponse,
  TGetUserInput,
  TLoginInput,
  TLoginOrSignupOrGetUserResponse,
  TLogoutInput,
  TLogoutResoponse,
  TRefreshAccessTokenInput,
  TRefreshAccessTokenResponse,
  TResendEmailVerificationInput,
  TResendEmailVerificationResponse,
  TResetForgottenPasswordInput,
  TResetForgottenPasswordResponse,
  TSignupInput,
  TVerifyEmailInput,
  TVerifyEmailResponse,
} from "./types";

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
  }: TSignupInput) {
    const response = await this.authFetchData<
      TLoginOrSignupOrGetUserResponse,
      TSignupInput
    >("/signup", "POST", {
      name,
      email,
      username,
      password,
      confirmPassword,
    });
    return response;
  }

  public async login({ credential, password }: TLoginInput) {
    const response = await this.authFetchData<
      TLoginOrSignupOrGetUserResponse,
      TLoginInput
    >("/login", "POST", {
      credential,
      password,
    });

    return response;
  }

  public async refreshAccessToken() {
    const response = await this.authFetchData<
      TRefreshAccessTokenResponse,
      TRefreshAccessTokenInput
    >("/refresh-access-token", "PATCH");

    return response;
  }

  public async forgotPasswordRequest({ email }: TForgotPasswordRequestInput) {
    const response = await this.authFetchData<
      TForgotPasswordRequestResponse,
      TForgotPasswordRequestInput
    >("/forgot-password-request", "POST", {
      email,
    });

    return response;
  }

  public async resetForgottenPassword({
    token,
    newPassword,
    confirmNewPassword,
  }: { token: string } & TResetForgottenPasswordInput) {
    const response = await this.authFetchData<
      TResetForgottenPasswordResponse,
      TResetForgottenPasswordInput
    >(`/reset-forgotten-password?token=${token}`, "POST", {
      newPassword,
      confirmNewPassword,
    });

    return response;
  }

  public async verifyEmail({ token }: { token: string } & TVerifyEmailInput) {
    const response = await this.authFetchData<
      TVerifyEmailResponse,
      TVerifyEmailInput
    >(`/verify-email/${token}`);

    return response;
  }

  public async resendEmailVerification() {
    const response = await this.authFetchData<
      TResendEmailVerificationResponse,
      TResendEmailVerificationInput
    >("/resend-email-verification-token", "PATCH");

    return response;
  }

  public async logout() {
    const response = await this.authFetchData<TLogoutResoponse, TLogoutInput>(
      "/logout",
      "DELETE",
    );

    return response;
  }
  public async changeCurrentPassword({
    currentPassword,
    newPassword,
    confirmNewPassword,
  }: TChangeCurrentPasswordInput) {
    const response = await this.authFetchData<
      TChangeCurrentPasswordResponse,
      TChangeCurrentPasswordInput
    >("/change-current-password", "PATCH", {
      currentPassword,
      newPassword,
      confirmNewPassword,
    });

    return response;
  }

  public async getUser() {
    const response = await this.authFetchData<
      TLoginOrSignupOrGetUserResponse,
      TGetUserInput
    >("/me");
    return response;
  }
}

const authServices = new AuthServices();

export { authServices };
