// routes/contest.routes.ts

import express from "express";
import type { Router } from "express";
import { ContestController } from "./controllers";
import {
  verifyAccessToken,
  isEmailVerified,
} from "../../middlewares/auth.middleware";
import { USER_ROLE } from "../../prisma/enums";
import { checkRole } from "../../middlewares/role-based-access.middleware";

function register(): Router {
  const router = express.Router();
  const controller = new ContestController();

  //USER AUTHENTICATION MIDDLEWARE//
  router.use(verifyAccessToken); //CHECK USER AUTHENTICATION
  //USER AUTHENTICATION MIDDLEWARE END//

  //EMAIL VERIFICATION MIDDLEWARE//
  router.use(isEmailVerified); //CHECK EMAIL VERIFICATION
  //EMAIL VERIFICATION MIDDLEWARE END//

  router.route("/").get(controller.getAllContests.bind(controller)); //GET ALL CONTEST

  router.route("/:contestId").get(controller.getContestById.bind(controller)); //GET CONTEST BY ID

  router
    .route("/participate")
    .post(controller.participateInContest.bind(controller)); //PARTICIPATE IN CONTEST

  router
    .route("/:contestId/participants")
    .get(controller.getContestParticipants.bind(controller)); //GET CONTEST PARTICIPANTS

  router
    .route("/:contestId/submissions/user")
    .get(controller.getUserSubmissionsInContest.bind(controller)); //GET USER SUBMISSIONS IN CONTEST

  router
    .route("/:contestId/score")
    .patch(controller.updateContestScore.bind(controller)); //UPDATE CONTEST SCORE

  // ADMIN-ONLY ROUTES

  //EMAIL VERIFICATION MIDDLEWARE//
  router.use(checkRole([USER_ROLE.ADMIN])); //CHECK ADMIN
  //EMAIL VERIFICATION MIDDLEWARE END//

  router
    .route("/:contestId/submissions/all")
    .get(controller.getAllSubmissionsInContest.bind(controller)); //GET ALL SUBMISSIONS IN CONTEST

  router.route("/").post(controller.createContest.bind(controller)); //CREATE CONTEST

  router.route("/:contestId").delete(controller.deleteContest.bind(controller)); //DELETE CONTEST

  return router;
}

export { register };
