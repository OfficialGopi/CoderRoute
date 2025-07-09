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

  //USER AUTHENTICATION MIDDLEWARE//
  router.use(verifyAccessToken); //CHECK USER AUTHENTICATION
  //USER AUTHENTICATION MIDDLEWARE END//

  //EMAIL VERIFICATION MIDDLEWARE//
  router.use(isEmailVerified); //CHECK EMAIL VERIFICATION
  //EMAIL VERIFICATION MIDDLEWARE END//

  //SUBMISSION ROUTES
  router
    .route("/get-all-submissions")
    .get(controllers.getAllSubmissions.bind(controllers)); //GET ALL SUBMISSIONS

  router
    .route("/get-submissions-for-problem/:problemId")
    .get(controllers.getAllSubmissionsForProblem.bind(controllers)); //GET ALL SUBMISSIONS FOR A PROBLEM

  router
    .route("/get-submissions-for-problem-count/:problemId")
    .get(controllers.getAllSubmissionsCountForProblem.bind(controllers)); //GET ALL SUBMISSIONS FOR A PROBLEM

  return router;
}

export { register };
