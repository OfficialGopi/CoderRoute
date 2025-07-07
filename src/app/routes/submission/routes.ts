import express from "express";

import type { Router } from "express";
import { SubmissionController } from "./controllers";
import {
  isEmailVerified,
  verifyAccessToken,
} from "../../middlewares/auth.middleware";

function register(): Router {
  const router = express.Router();

  const controllers = new SubmissionController();

  //HEALTH CHECK ROUTES
  router
    .route("/get-all-submissions")
    .get(
      verifyAccessToken,
      isEmailVerified,
      controllers.getAllSubmissions.bind(controllers),
    );
  router
    .route("/get-submissions-for-problem/id/:projectId")
    .get(
      verifyAccessToken,
      isEmailVerified,
      controllers.getAllSubmissionsForProblem.bind(controllers),
    );
  router
    .route("/get-submissions-for-problem-count/id/:projectId")
    .get(
      verifyAccessToken,
      isEmailVerified,
      controllers.getAllSubmissionsCountForProblem.bind(controllers),
    );

  return router;
}

export { register };
