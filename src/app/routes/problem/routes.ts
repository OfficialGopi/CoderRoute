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
  router.get(
    "/",
    verifyAccessToken,
    isEmailVerified,
    controller.getAllProblems,
  );
  router.get(
    "/solved",
    verifyAccessToken,
    isEmailVerified,
    controller.getAllProblemsSolvedByUser,
  );
  router.get(
    "/:problemId",
    verifyAccessToken,
    isEmailVerified,
    controller.getProblemById,
  );

  // 🔒 ADMIN-ONLY ROUTES
  router.post(
    "/",
    verifyAccessToken,
    isEmailVerified,
    controller.createProblem,
  );
  router.patch(
    "/:problemId",
    verifyAccessToken,
    isEmailVerified,
    controller.updateProblemDetails,
  );
  router.delete(
    "/:problemId",
    verifyAccessToken,
    isEmailVerified,
    controller.deleteProblem,
  );

  // 🧠 CODE SNIPPETS
  router.patch(
    "/:problemId/code-snippets/:codeSnippetId",
    verifyAccessToken,
    isEmailVerified,
    controller.updateProblemCodeSnippet,
  );

  // 🧠 REFERENCE SOLUTIONS
  router.patch(
    "/:problemId/reference-solutions/:referenceSolutionId",
    verifyAccessToken,
    isEmailVerified,
    controller.updateProblemReferenceSolution,
  );

  // 🧠 BACKGROUND CODE
  router.patch(
    "/:problemId/background-codes/:backgroundCodeId",
    verifyAccessToken,
    isEmailVerified,
    controller.updateProblemBackgroundCode,
  );

  // 🧪 TEST CASES
  router.patch(
    "/:problemId/testcases/:testcaseId",
    verifyAccessToken,
    isEmailVerified,
    controller.updateProblemTestCases,
  );

  router.post(
    "/:problemId/testcases",
    verifyAccessToken,
    isEmailVerified,
    controller.addProblemTestCase,
  );

  router.delete(
    "/:problemId/testcases/:testcaseId",
    verifyAccessToken,
    isEmailVerified,
    controller.deleteTestCase,
  );

  return router;
}

export { register };
