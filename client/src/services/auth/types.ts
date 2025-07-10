interface TLoginInput {
  credential: string;
  password: string;
}

interface TSignupInput {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface TRefreshAccessTokenInput {}

interface TForgotPasswordRequestInput {
  email: string;
}

interface TResetForgottenPasswordInput {
  newPassword: string;
  confirmNewPassword: string;
}

interface TVerifyEmailInput {}

interface TResendEmailVerificationInput {}

interface TLogoutInput {}

interface TChangeCurrentPasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
interface TGetUserInput {}

export type {
  TLoginInput,
  TSignupInput,
  TGetUserInput,
  TRefreshAccessTokenInput,
  TForgotPasswordRequestInput,
  TResetForgottenPasswordInput,
  TVerifyEmailInput,
  TResendEmailVerificationInput,
  TLogoutInput,
  TChangeCurrentPasswordInput,
};

interface TLoginOrSignupOrGetUserResponse {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar: string;
  isEmailVerified: boolean;
  role: "ADMIN" | "USER";
  tokens?: {
    "access-token": string;
    "refresh-token": string;
  };
}

interface TVerifyEmailResponse {}

interface TResendEmailVerificationResponse {}

interface TRefreshAccessTokenResponse {
  tokens: {
    "access-token": string;
    "refresh-token": string;
  };
}

interface TLogoutResoponse {}

interface TChangeCurrentPasswordResponse {}

interface TForgotPasswordRequestResponse {}

interface TResetForgottenPasswordResponse {}

export type {
  TLoginOrSignupOrGetUserResponse,
  TRefreshAccessTokenResponse,
  TForgotPasswordRequestResponse,
  TResetForgottenPasswordResponse,
  TLogoutResoponse,
  TChangeCurrentPasswordResponse,
  TVerifyEmailResponse,
  TResendEmailVerificationResponse,
};
