import express from "express";
import { register as registerAuthRoutes } from "../routes/auth/routes";
import { register as registerProblemRoutes } from "../routes/problem/routes";
import { register as registerExecuteCodeRoutes } from "../routes/execute-code/routes";
// import { register as registerPlaylistRoutes } from "../routes/playlist/routes";
// import { register as registerSubmissionRoutes } from "../routes/submission/routes";

function v1(): express.Router {
  const router = express.Router();

  // ================= VERSION 1 ROUTES ===================
  router.use("/auth", registerAuthRoutes());
  router.use("/problem", registerProblemRoutes());
  router.use("/execute-code", registerExecuteCodeRoutes());
  // router.use("/submission", registerSubmissionRoutes());
  // router.use("/playlist", registerPlaylistRoutes());

  return router;
}

export { v1 };
