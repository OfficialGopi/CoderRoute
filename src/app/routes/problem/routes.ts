import express from "express";
import type { Router } from "express";
import { ProblemController } from "./controllers";
import { verifyAccessToken } from "../../middlewares/auth.middleware";
import { checkRole } from "../../middlewares/role-based-access.middleware";
import { USER_ROLE } from "../../prisma/client";
function register(): Router {
  const router = express.Router();

  const controllers = new ProblemController();

  //PROBLEM ROUTES
  router
    .route("/get-all-problems")
    .get(controllers.getAllProblems.bind(controllers));

  router
    .route("/create-problem")
    .post(
      verifyAccessToken,
      checkRole([USER_ROLE.ADMIN]),
      controllers.createProblem.bind(controllers),
    );

  router
    .route("/id/:problemId")
    .get(controllers.getProblemById.bind(controllers))
    .put(
      verifyAccessToken,
      checkRole([USER_ROLE.ADMIN]),
      controllers.updateProblem.bind(controllers),
    )
    .delete(
      verifyAccessToken,
      checkRole([USER_ROLE.ADMIN]),
      controllers.deleteProblem.bind(controllers),
    );

  router
    .route("/get-all-problems-solved-by-user")
    .get(
      verifyAccessToken,
      controllers.getAllProblemsSolvedByUser.bind(controllers),
    );

  return router;
}

export { register };
