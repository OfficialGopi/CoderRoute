import express from "express";
import type { Router } from "express";
import { DiscussionController } from "./controllers";
import {
  verifyAccessToken,
  isEmailVerified,
} from "../../middlewares/auth.middleware";

function register(): Router {
  const router = express.Router();
  const controllers = new DiscussionController();

  // Get all discussions (supports filters: problemId, parentId, page, limit)
  router.get(
    "/",
    verifyAccessToken,
    isEmailVerified,
    controllers.getAllDiscussions.bind(controllers),
  );

  // Get a single discussion by ID
  router.get(
    "/:id",
    verifyAccessToken,
    isEmailVerified,
    controllers.getDiscussionById.bind(controllers),
  );

  // Create a new discussion or reply
  router.post(
    "/",
    verifyAccessToken,
    isEmailVerified,
    controllers.createDiscussion.bind(controllers),
  );

  // Soft delete a discussion
  router.delete(
    "/:id",
    verifyAccessToken,
    isEmailVerified,
    controllers.deleteDiscussion.bind(controllers),
  );

  return router;
}

export { register };
