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

  //USER AUTHENTICATION MIDDLEWARE//
  router.use(verifyAccessToken); //CHECK USER AUTHENTICATION
  //USER AUTHENTICATION MIDDLEWARE END//

  //EMAIL VERIFICATION MIDDLEWARE//
  router.use(isEmailVerified); //CHECK EMAIL VERIFICATION
  //EMAIL VERIFICATION MIDDLEWARE END//

  router.route("/").get(controllers.getAllDiscussions.bind(controllers)); //GET ALL DISCUSSIONS

  router.get("/:id", controllers.getDiscussionById.bind(controllers)); //GET DISCUSSION BY ID

  router.route("/").post(controllers.createDiscussion.bind(controllers)); //CREATE DISCUSSION

  router.route("/:id").delete(controllers.deleteDiscussion.bind(controllers));

  return router;
}

export { register };
