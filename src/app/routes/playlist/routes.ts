import express from "express";

import type { Router } from "express";
import { PlaylistController } from "./controllers";
import {
  isEmailVerified,
  verifyAccessToken,
} from "../../middlewares/auth.middleware";
function register(): Router {
  const router = express.Router();

  const controllers = new PlaylistController();

  //USER AUTHENTICATION MIDDLEWARE//
  router.use(verifyAccessToken); //CHECK USER AUTHENTICATION
  //USER AUTHENTICATION MIDDLEWARE END//

  //EMAIL VERIFICATION MIDDLEWARE//
  router.use(isEmailVerified); //CHECK EMAIL VERIFICATION
  //EMAIL VERIFICATION MIDDLEWARE END//

  router
    .route("/create-playlist")
    .post(controllers.createPlaylist.bind(controllers)); //CREATE PLAYLIST

  router
    .route("/get-all-playlist-details")
    .post(controllers.getAllPlaylistDetails.bind(controllers)); //GET ALL PLAYLIST DETAILS

  router
    .route("/get-playlist-details/:playlistId")
    .get(controllers.getPlayListDetailsById.bind(controllers)); //GET PLAYLIST DETAILS BY ID

  router
    .route("/add-problem-to-playlist/:playlistId")
    .post(controllers.addProblemToPlaylist.bind(controllers)); //ADD PROBLEM TO PLAYLIST

  router
    .route("/delete-playlist/:playlistId")
    .delete(controllers.deletePlaylist.bind(controllers)); //DELETE PLAYLIST

  router
    .route("/remove-problem-from-playlist/:playlistId")
    .delete(controllers.removeProblemFromPlaylist.bind(controllers)); //REMOVE PROBLEM FROM PLAYLIST

  return router;
}

export { register };
