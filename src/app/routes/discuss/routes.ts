import express from "express";

import type { Router } from "express";
import { DiscussController } from "./controllers";
function register(): Router {
  const router = express.Router();

  const controllers = new DiscussController();

  //DISCUSS CHECK ROUTES

  return router;
}

export { register };
