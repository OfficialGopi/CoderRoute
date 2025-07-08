import { STATUS_CODE } from "../../constants/statusCodes.constants";
import { db } from "../../db";
import { ApiError } from "../../utils/api-error";
import { ApiResponse } from "../../utils/api-response";
import { AsyncHandler } from "../../utils/async-handler";

class PlaylistController {
  public createPlaylist = AsyncHandler(async (req, res) => {
    if (!req.user || !req.user.id) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const { name, description } = req.body;

    if (!name || !description) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Name and description are required",
      );
    }

    const userId = req.user.id;

    const playList = await db.playlist.create({
      data: {
        name,
        description,
        userId,
      },
    });

    return res
      .status(STATUS_CODE.RESOURCE_CREATED)
      .json(
        new ApiResponse(
          STATUS_CODE.RESOURCE_CREATED,
          playList,
          "Playlist created successfully",
        ),
      );
  });

  public getAllPlaylistDetails = AsyncHandler(async (req, res) => {
    if (!req.user || !req.user.id) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    const playlists = await db.playlist.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          playlists,
          "Playlists fetched successfully",
        ),
      );
  });

  public getPlayListDetailsById = AsyncHandler(async (req, res) => {
    if (!req.user || !req.user.id) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    const { playlistId } = req.params;

    if (!playlistId) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Playlist ID is required");
    }

    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    if (!playlist) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Playlist not found");
    }
    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          playlist,
          "Playlist fetched successfully",
        ),
      );
  });

  public addProblemToPlaylist = AsyncHandler(async (req, res) => {
    if (!req.user || !req.user.id) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const { playlistId } = req.params;
    const { problemIds } = req.body;

    if (!playlistId) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Playlist ID is required");
    }

    if (!problemIds) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Problem IDs are required");
    }

    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Problem IDs should be an array of problem IDs",
      );
    }

    const isPlaylistExists = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId: req.user.id,
      },
    });

    if (!isPlaylistExists) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Playlist not found");
    }

    const problems = await db.problem.findMany({
      where: {
        id: {
          in: problemIds,
        },
      },
    });

    if (problemIds.length !== problems.length) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "All problems are already added to playlist",
      );
    }
    const existing = await db.problemInPlaylist.findMany({
      where: {
        playlistId,
        problemId: { in: problemIds },
      },
      select: { problemId: true },
    });

    const existingIds = new Set(existing.map((e) => e.problemId));
    const toAdd = problemIds.filter((id) => !existingIds.has(id));

    if (toAdd.length === 0) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "All problems are already added to playlist",
      );
    }

    // Create records fro each problems in the playlist
    const problemsInPlaylist = await db.problemInPlaylist.createMany({
      data: toAdd.map((id) => ({ playlistId, problemId: id })),
    });

    return res
      .status(STATUS_CODE.RESOURCE_CREATED)
      .json(
        new ApiResponse(
          STATUS_CODE.RESOURCE_CREATED,
          problemsInPlaylist,
          "Problems added successfully",
        ),
      );
  });

  public deletePlaylist = AsyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const deletedPlaylist = await db.playlist.delete({
      where: {
        id: playlistId,
      },
    });

    return res
      .status(STATUS_CODE.NO_CONTENT)
      .json(
        new ApiResponse(
          STATUS_CODE.NO_CONTENT,
          deletedPlaylist,
          "Playlist deleted successfully",
        ),
      );
  });

  public removeProblemFromPlaylist = AsyncHandler(async (req, res) => {
    if (!req.user || !req.user.id) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const { playlistId } = req.params;
    const { problemIds } = req.body;

    if (!playlistId) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Playlist ID is required");
    }

    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({ error: "Invalid or missing problemsId" });
    }

    const deletedProblem = await db.problemInPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
        },
      },
    });

    return res
      .status(STATUS_CODE.NO_CONTENT)
      .json(
        new ApiResponse(
          STATUS_CODE.NO_CONTENT,
          deletedProblem,
          "Problems deleted successfully",
        ),
      );
  });
}

export { PlaylistController };
