import express from "express";
import type { Router } from "express";
import { ProblemController } from "./controllers";

import {
  verifyAccessToken,
  isEmailVerified,
} from "../../middlewares/auth.middleware";
import { checkRole } from "../../middlewares/role-based-access.middleware";
import { USER_ROLE } from "../../prisma/enums";

function register(): Router {
  const router = express.Router();
  const controller = new ProblemController();

  // AUTHENTICATED ROUTES

  //USER AUTHENTICATION MIDDLEWARE//
  router.use(verifyAccessToken); //CHECK USER AUTHENTICATION
  //USER AUTHENTICATION MIDDLEWARE END//

  //EMAIL VERIFICATION MIDDLEWARE//
  router.use(isEmailVerified); //CHECK EMAIL VERIFICATION
  //EMAIL VERIFICATION MIDDLEWARE END//

  // PUBLIC ROUTES (Authenticated)
  router.route("/").get(controller.getAllProblems.bind(controller)); //GET ALL PROBLEMS

  router.route("/:problemId").get(controller.getProblemById.bind(controller)); //GET PROBLEM BY ID

  router
    .route("/solved-problems")
    .get(controller.getAllProblemsSolvedByUser.bind(controller)); //GET ALL PROBLEMS SOLVED BY USER

  // ADMIN-ONLY ROUTES
  router.use(checkRole([USER_ROLE.ADMIN])); //CHECK ADMIN

  router.route("/").post(controller.createProblem.bind(controller)); //CREATE PROBLEM

  router
    .route("/:problemId")
    .patch(controller.updateProblemDetails.bind(controller)); //UPDATE PROBLEM DETAILS

  router.route("/:problemId").delete(controller.deleteProblem.bind(controller)); //DELETE PROBLEM

  router
    .route("/:problemId/code-snippets/:codeSnippetId")
    .patch(controller.updateProblemCodeSnippet.bind(controller)); //UPDATE PROBLEM CODE SNIPPET

  router
    .route("/:problemId/reference-solutions/:referenceSolutionId")
    .patch(controller.updateProblemReferenceSolution.bind(controller)); //UPDATE PROBLEM REFERENCE SOLUTION

  router
    .route("/:problemId/background-codes/:backgroundCodeId")
    .patch(controller.updateProblemBackgroundCode.bind(controller)); //UPDATE PROBLEM BACKGROUND CODE

  router
    .route("/:problemId/testcases")
    .post(controller.addProblemTestCase.bind(controller)); //ADD PROBLEM TEST CASE

  router
    .route("/:problemId/testcases/:testcaseId")
    .patch(controller.updateProblemTestCases.bind(controller)); //UPDATE PROBLEM TEST CASE

  router
    .route("/:problemId/testcases/:testcaseId")
    .delete(controller.deleteTestCase.bind(controller)); //DELETE PROBLEM TEST CASE

  return router;
}

export { register };
