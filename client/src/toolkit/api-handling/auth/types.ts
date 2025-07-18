import type {
  TLoginInput,
  TChangeCurrentPasswordInput,
  TForgotPasswordRequestInput,
  TResetForgottenPasswordInput,
  TSignupInput,
  TVerifyEmailInput,
} from "../../../services/auth/types";

interface TAuthState {
  user: null | {
    id: string;
    username: string;
    email: string;
    name: string;
    avatar: string;
    isEmailVerified: boolean;
    role: "ADMIN" | "USER";
  };
  isAuthenticated: boolean;
  isUserLoggingIn: boolean;
  isUserSigningUp: boolean;
  isUserLoggingOut: boolean;
  isUserChangingCurrentPassword: boolean;
  isUserSendingForgotPasswordRequest: boolean;
  isUserResettingPassword: boolean;
  isUserVerifyingEmail: boolean;
  isUserResendingEmailVerification: boolean;

  login: ({ credential, password }: TLoginInput) => Promise<void>;

  signup: ({
    name,
    email,
    username,
    password,
    confirmPassword,
  }: TSignupInput) => Promise<void>;

  getUser: () => Promise<void>;

  logout: () => Promise<void>;

  changeCurrentPassword: ({
    currentPassword,
    newPassword,
    confirmNewPassword,
  }: TChangeCurrentPasswordInput) => Promise<void>;

  forgotPasswordRequest: ({
    email,
  }: TForgotPasswordRequestInput) => Promise<void>;

  resetForgottenPassword: ({
    token,
    newPassword,
    confirmNewPassword,
  }: {
    token: string;
  } & TResetForgottenPasswordInput) => Promise<void>;

  verifyEmail: ({
    token,
  }: { token: string } & TVerifyEmailInput) => Promise<void>;

  resendEmailVerification: () => Promise<void>;
}

export type { TAuthState };
