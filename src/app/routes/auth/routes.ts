import express from "express";
import { verifyAccessToken } from "../../middlewares/auth.middleware";
import { AuthControllers } from "./controllers";

import type { Router } from "express";

function register(): Router {
  const router = express.Router();

  const controllers = new AuthControllers();

  router.route("/signup").post(controllers.signup.bind(controllers)); //SIGNUP

  router.route("/login").post(controllers.login.bind(controllers)); //LOGIN

  router
    .route("/refresh-access-token")
    .patch(controllers.refreshAccessToken.bind(controllers)); //REFRESH ACCESS TOKEN

  router
    .route("/forgot-password-request")
    .post(controllers.forgotPasswordRequest.bind(controllers));

  router
    .route("/reset-forgotten-password")
    .post(controllers.resetForgottenPassword.bind(controllers));

  //USER AUTHETICAION MIDDLEWARE//
  router.use(verifyAccessToken); //CHECK USER AUTHENTICATION
  //USER AUTHETICAION MIDDLEWARE END//

  router
    .route("/verify-email/:token")
    .get(controllers.verifyEmail.bind(controllers)); //VERIFY ACCESS TOKEN

  router
    .route("/resend-email-verification-token")
    .patch(controllers.resendEmailVerification.bind(controllers)); //RESEND EMAIL VERIFICATION

  router.route("/logout").delete(controllers.logout.bind(controllers)); //LOGOUT

  router
    .route("/change-current-password")
    .put(
      verifyAccessToken,
      controllers.changeCurrentPassword.bind(controllers),
    ); //CHANGE CURRENT PASSWORD

  router.get("/me", controllers.me.bind(controllers)); //GET LOGGED IN USER

  return router;
}

export { register };
