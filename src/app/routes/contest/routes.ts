// routes/contest.routes.ts

import express from "express";
import type { Router } from "express";
import { ContestController } from "./controllers";
import {
  verifyAccessToken,
  isEmailVerified,
} from "../../middlewares/auth.middleware";

function register(): Router {
  const router = express.Router();
  const controller = new ContestController();

  // ✅ Get all contests with pagination, soft-deletion support
  router.get("/", controller.getAllContests);

  // ✅ Get a contest by ID with problems and participations
  router.get("/:id", controller.getContestById);

  // ✅ Create a contest (requires auth)
  router.post(
    "/",
    verifyAccessToken,
    isEmailVerified,
    controller.createContest.bind(controller),
  );

  // ✅ Soft delete a contest (requires auth)
  router.delete(
    "/:id",
    verifyAccessToken,
    isEmailVerified,
    controller.deleteContest.bind(controller),
  );

  // ✅ Participate in a contest (requires auth)
  router.post(
    "/participate",
    verifyAccessToken,
    isEmailVerified,
    controller.participateInContest.bind(controller),
  );

  // ✅ Get all participants in a contest
  router.get(
    "/:contestId/participants",
    verifyAccessToken,
    isEmailVerified,
    controller.getContestParticipants.bind(controller),
  );

  return router;
}

export { register };
