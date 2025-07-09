import express from "express";
import type { Router } from "express";
import { ProblemController } from "./controllers";

import {
  verifyAccessToken,
  isEmailVerified,
} from "../../middlewares/auth.middleware";

function register(): Router {
  const router = express.Router();
  const controller = new ProblemController();

  // ✅ PUBLIC ROUTES (Authenticated)
  router.route("/").get(controller.getAllProblems.bind(controller));

  router
    .route("/id/:problemId")
    .get(controller.getProblemById.bind(controller));

  router
    .route("/solved")
    .get(
      verifyAccessToken,
      isEmailVerified,
      controller.getAllProblemsSolvedByUser.bind(controller),
    );

  // 🔒 ADMIN-ONLY ROUTES
  router
    .route("/")
    .post(
      verifyAccessToken,
      isEmailVerified,
      controller.createProblem.bind(controller),
    );

  router
    .route("/id/:problemId")
    .patch(
      verifyAccessToken,
      isEmailVerified,
      controller.updateProblemDetails.bind(controller),
    );

  router
    .route("/id/:problemId")
    .delete(
      verifyAccessToken,
      isEmailVerified,
      controller.deleteProblem.bind(controller),
    );

  // 🧠 CODE SNIPPETS
  router
    .route("/id/:problemId/code-snippets/:codeSnippetId")
    .patch(
      verifyAccessToken,
      isEmailVerified,
      controller.updateProblemCodeSnippet,
    );

  // 🧠 REFERENCE SOLUTIONS
  router
    .route("/id/:problemId/reference-solutions/:referenceSolutionId")
    .patch(
      verifyAccessToken,
      isEmailVerified,
      controller.updateProblemReferenceSolution,
    );

  // 🧠 BACKGROUND CODE
  router
    .route("/id/:problemId/background-codes/:backgroundCodeId")
    .patch(
      verifyAccessToken,
      isEmailVerified,
      controller.updateProblemBackgroundCode,
    );

  // 🧪 TEST CASES
  router
    .route("/id/:problemId/testcases/:testcaseId")
    .patch(
      verifyAccessToken,
      isEmailVerified,
      controller.updateProblemTestCases,
    );

  router
    .route("/id/:problemId/testcases")
    .post(verifyAccessToken, isEmailVerified, controller.addProblemTestCase);

  router
    .route("/id/:problemId/testcases/:testcaseId")
    .delete(verifyAccessToken, isEmailVerified, controller.deleteTestCase);

  return router;
}

export { register };
