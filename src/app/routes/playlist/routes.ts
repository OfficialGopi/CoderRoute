import express from "express";

import type { Router } from "express";
import { PlaylistController } from "./controllers";
import { verifyAccessToken } from "../../middlewares/auth.middleware";
function register(): Router {
  const router = express.Router();

  const controllers = new PlaylistController();

  //HEALTH CHECK ROUTES
  router
    .route("/create-playlist")
    .post(verifyAccessToken, controllers.createPlaylist.bind(controllers));

  router
    .route("/get-all-playlist-details")
    .post(
      verifyAccessToken,
      controllers.getAllPlaylistDetails.bind(controllers),
    );

  router
    .route("/get-playlist-details/id/:playlistId")
    .get(
      verifyAccessToken,
      controllers.getPlayListDetailsById.bind(controllers),
    );

  router
    .route("/add-problem-to-playlist/id/:playlistId")
    .post(
      verifyAccessToken,
      controllers.addProblemToPlaylist.bind(controllers),
    );

  router
    .route("/delete-playlist/id/:playlistId")
    .delete(verifyAccessToken, controllers.deletePlaylist.bind(controllers));

  router
    .route("/remove-problem-from-playlist/id/:playlistId")
    .delete(
      verifyAccessToken,
      controllers.removeProblemFromPlaylist.bind(controllers),
    );

  return router;
}

export { register };
