import express from "express";

import type { Router } from "express";
import { ExecuteCodeController } from "./controllers";

import {
  isEmailVerified,
  verifyAccessToken,
} from "../../middlewares/auth.middleware";

function register(): Router {
  const router = express.Router();

  const controllers = new ExecuteCodeController();

  //EXECUTE CODE CHECK ROUTES
  router
    .route("/id/:problemId")
    .post(
      verifyAccessToken,
      isEmailVerified,
      controllers.executeCode.bind(controllers),
    );

  return router;
}

export { register };
