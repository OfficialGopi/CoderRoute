import express from "express";

import type { Router } from "express";
import { ExecuteCodeController } from "./controllers";

import {
  isEmailVerified,
  verifyAccessToken,
} from "../../middlewares/auth.middleware";

function register(): Router {
  const router = express.Router();

  const controllers = new ExecuteCodeController();

  //USER AUTHENTICATION MIDDLEWARE//
  router.use(verifyAccessToken); //CHECK USER AUTHENTICATION
  //USER AUTHENTICATION MIDDLEWARE END//

  //EMAIL VERIFICATION MIDDLEWARE//
  router.use(isEmailVerified); //CHECK EMAIL VERIFICATION
  //EMAIL VERIFICATION MIDDLEWARE END//

  //EXECUTE CODE CHECK ROUTES
  router.route("/:problemId").post(controllers.executeCode.bind(controllers));

  return router;
}

export { register };
