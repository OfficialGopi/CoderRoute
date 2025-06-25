import express from "express";
import { verifyAccessToken } from "../../middlewares/auth.middleware";
import { AuthControllers } from "./controllers";

import type { Router } from "express";

function register(): Router {
  const router = express.Router();

  const controllers = new AuthControllers();

  // SIGNUP : { name, email, username, password, confirmPassword } = req.body
  router.route("/signup").post(controllers.signup.bind(controllers));

  // LOGIN : { credentials, password } = req.body
  router.route("/login").post(controllers.login.bind(controllers));

  // VERIFY EMAIL : access-token and refresh-token and  { token } = req.params;
  router
    .route("/verify-email/:token")
    .get(verifyAccessToken, controllers.verifyEmail.bind(controllers));

  // RESEND EMAIL VERIFICATION TOKEN : access-token and refresh-token
  router
    .route("/resend-email-verification-token")
    .patch(
      verifyAccessToken,
      controllers.resendEmailVerification.bind(controllers),
    );

  // REFRESH ACCESS TOKEN : access-token and refresh-token and { refreshToken } = req.body
  router
    .route("/refresh-access-token")
    .patch(controllers.refreshAccessToken.bind(controllers));

  // LOGOUT : access-token and refresh-token and { refreshToken } = req.body
  router
    .route("/logout")
    .delete(verifyAccessToken, controllers.logout.bind(controllers));

  // CHANGE CURRENT PASSWORD : access-token and refresh-token and { currentPassword, newPassword, confirmNewPassword } = req.body
  router
    .route("/change-current-password")
    .put(
      verifyAccessToken,
      controllers.changeCurrentPassword.bind(controllers),
    );

  // ME : access-token and refresh-token
  router.get("/me", verifyAccessToken, controllers.me.bind(controllers));

  // NOT FINISHED YET
  router
    .route("/forgot-password-request")
    .post(controllers.forgotPasswordRequest.bind(controllers));

  router
    .route("/reset-forgotten-password")
    .post(controllers.resetForgottenPassword.bind(controllers));

  return router;
}

export { register };
