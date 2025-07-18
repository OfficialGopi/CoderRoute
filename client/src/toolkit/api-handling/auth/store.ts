import { create } from "zustand";
import { authServices } from "../../../services/auth/services";
import { toast } from "sonner";
import { removeTokens, setTokens } from "../../../utils/HandleTokens";
import type { TAuthState } from "./types";

const useAuthStore = create<TAuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isUserSigningUp: false,
  isUserLoggingIn: false,
  isUserSendingForgotPasswordRequest: false,
  isUserResettingPassword: false,
  isUserVerifyingEmail: false,
  isUserResendingEmailVerification: false,
  isUserLoggingOut: false,
  isUserChangingCurrentPassword: false,

  login: async ({ credential, password }) => {
    set({ isUserLoggingIn: true });

    try {
      const response = await authServices.login({
        credential,
        password,
      });

      if (!response.success) {
        toast.error(response.message ?? "Something went wrong");
        return;
      }

      if (response.data?.tokens) {
        setTokens(response.data.tokens!);
      } else {
        removeTokens();
        return;
      }

      delete response.data.tokens;

      set({
        user: response.data,
        isAuthenticated: true,
      });

      setTokens(response.data.tokens!);
      toast.success("Login successful");
    } finally {
      set({ isUserLoggingIn: false });
    }
  },

  signup: async ({ name, email, username, password, confirmPassword }) => {
    set({ isUserSigningUp: true });

    try {
      const response = await authServices.signup({
        name,
        email,
        username,
        password,
        confirmPassword,
      });

      if (!response.success) {
        toast.error(response.message ?? "Something went wrong");
        return;
      }

      delete response.data.tokens;

      set({
        user: response.data,
        isAuthenticated: true,
      });
      setTokens(response.data.tokens!);
      toast.success("Signup successful");
    } finally {
      set({ isUserSigningUp: false });
    }
  },

  getUser: async () => {
    set({ isUserLoggingIn: true });
    try {
      const response = await authServices.getUser();
      if (!response.success) {
        const response1 = await authServices.refreshAccessToken();

        if (!response1.success) {
          set({
            user: null,
            isAuthenticated: false,
          });
          removeTokens();
          return;
        }

        const response2 = await authServices.getUser();

        if (!response2.success) {
          removeTokens();
          return;
        }

        if (response2.data?.tokens) {
          setTokens(response2.data?.tokens!);
        } else {
          removeTokens();
          return;
        }

        delete response2.data.tokens;

        set({
          user: response2.data,
          isAuthenticated: true,
        });

        return;
      }

      if (response.data?.tokens) {
        setTokens(response.data.tokens!);
      } else {
        removeTokens();
        return;
      }

      delete response.data.tokens;

      set({
        user: response.data,
        isAuthenticated: true,
      });
    } finally {
      set({ isUserLoggingIn: false });
    }
  },

  logout: async () => {
    set({
      isUserLoggingOut: true,
    });
    try {
      await authServices.logout();
      removeTokens();
      set({
        user: null,
        isAuthenticated: false,
        isUserLoggingOut: false,
      });
    } finally {
      set({
        isUserLoggingOut: false,
      });
    }
  },

  changeCurrentPassword: async ({
    currentPassword,
    newPassword,
    confirmNewPassword,
  }) => {
    set({ isUserChangingCurrentPassword: true });

    try {
      const response = await authServices.changeCurrentPassword({
        currentPassword,
        newPassword,
        confirmNewPassword,
      });
      if (!response.success) {
        toast.error(response.message ?? "Something went wrong");
        return;
      }
      toast.success("Password changed successfully");
    } finally {
      set({ isUserChangingCurrentPassword: false });
    }
  },

  forgotPasswordRequest: async ({ email }) => {
    set({ isUserSendingForgotPasswordRequest: true });
    try {
      const response = await authServices.forgotPasswordRequest({ email });
      if (!response.success) {
        toast.error(response.message ?? "Something went wrong");
        return;
      }
      toast.success("Password reset email sent successfully");
    } finally {
      set({ isUserSendingForgotPasswordRequest: false });
    }
  },

  resetForgottenPassword: async ({
    token,
    newPassword,
    confirmNewPassword,
  }) => {
    set({ isUserResettingPassword: true });
    try {
      const response = await authServices.resetForgottenPassword({
        token,
        newPassword,
        confirmNewPassword,
      });
      if (!response.success) {
        toast.error(response.message ?? "Something went wrong");
        return;
      }
      toast.success("Password reset successfully");
    } finally {
      set({
        isUserResettingPassword: false,
      });
    }
  },

  verifyEmail: async ({ token }) => {
    set({
      isUserVerifyingEmail: true,
    });
    try {
      const response = await authServices.verifyEmail({ token });
      if (!response.success) {
        toast.error(response.message ?? "Something went wrong");
        return;
      }
      toast.success("Email verified successfully");
    } finally {
      set({ isUserVerifyingEmail: false });
    }
  },

  resendEmailVerification: async () => {
    set({ isUserResendingEmailVerification: true });
    try {
      const response = await authServices.resendEmailVerification();
      if (!response.success) {
        toast.error(response.message ?? "Something went wrong");
        return;
      }
      toast.success("Email verification email sent successfully");
    } finally {
      set({ isUserResendingEmailVerification: false });
    }
  },
}));

export { useAuthStore };
