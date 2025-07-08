import { STATUS_CODE } from "../../constants/statusCodes.constants";
import { db } from "../../db";
import { USER_ROLE } from "../../prisma/client";
import { ApiError } from "../../utils/api-error";
import { ApiResponse } from "../../utils/api-response";
import { AsyncHandler } from "../../utils/async-handler";

class ContestController {
  public getAllContests = AsyncHandler(async (req, res) => {
    const { page = 1, limit = 20, showDeleted = false } = req.query;

    const contests = await db.contest.findMany({
      where: {
        deleted: showDeleted === "true" ? undefined : false,
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { startTime: "desc" },
    });

    const total = await db.contest.count({
      where: {
        deleted: showDeleted === "true" ? undefined : false,
      },
    });

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          { contests, total },
          "Contests fetched successfully",
        ),
      );
  });

  public getContestById = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const contest = await db.contest.findUnique({
      where: { id },
      include: {
        problems: true,
        participations: true,
      },
    });

    if (!contest || contest.deleted) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Contest not found");
    }

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          contest,
          "Contest fetched successfully",
        ),
      );
  });

  public createContest = AsyncHandler(async (req, res) => {
    const {
      name,
      description,
      startTime,
      endTime,
      visibility,
      isRated,
      durationMinutes,
      rules,
      problems,
    } = req.body;

    if (!req.user || !req.user.id) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const contest = await db.contest.create({
      data: {
        name,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        visibility,
        isRated,
        durationMinutes,
        rules,
        creatorId: req.user.id,
        problems: {
          create:
            problems?.map((p: any, index: number) => ({
              problemId: p.problemId,
              points: p.points || 100,
              order: p.order || index + 1,
            })) || [],
        },
      },
    });

    return res
      .status(STATUS_CODE.RESOURCE_CREATED)
      .json(
        new ApiResponse(
          STATUS_CODE.RESOURCE_CREATED,
          contest,
          "Contest created successfully",
        ),
      );
  });

  public deleteContest = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const contest = await db.contest.findUnique({ where: { id } });

    if (!contest) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Contest not found");
    }

    if (req.user.role === USER_ROLE.USER && req.user.id !== contest.creatorId) {
      throw new ApiError(STATUS_CODE.FORBIDDEN, "Forbidden");
    }

    await db.contest.update({
      where: { id },
      data: { deleted: true },
    });

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(STATUS_CODE.OK, {}, "Contest deleted successfully"),
      );
  });

  public participateInContest = AsyncHandler(async (req, res) => {
    const { contestId } = req.body;

    if (!req.user || !req.user.id) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const existing = await db.contestParticipation.findUnique({
      where: {
        userId_contestId: {
          userId: req.user.id,
          contestId,
        },
      },
    });

    if (existing) {
      return res
        .status(STATUS_CODE.OK)
        .json(
          new ApiResponse(STATUS_CODE.OK, existing, "Already participating"),
        );
    }

    const participation = await db.contestParticipation.create({
      data: {
        userId: req.user.id,
        contestId,
        startedAt: new Date(),
      },
    });

    return res
      .status(STATUS_CODE.RESOURCE_CREATED)
      .json(
        new ApiResponse(
          STATUS_CODE.RESOURCE_CREATED,
          participation,
          "Participation started",
        ),
      );
  });

  public getContestParticipants = AsyncHandler(async (req, res) => {
    const { contestId } = req.params;

    const participants = await db.contestParticipation.findMany({
      where: { contestId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          participants,
          "Participants fetched successfully",
        ),
      );
  });

  public getUserSubmissionsInContest = AsyncHandler(async (req, res) => {
    const { contestId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    if (!contestId) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Contest ID is required");
    }

    if (!req.user || !req.user.id) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const contest = await db.contest.findUnique({
      where: {
        id: contestId,
      },
    });

    if (!contest || contest.deleted) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Contest not found");
    }

    const submissions = await db.submission.findMany({
      where: {
        contestId,
        userId: req.user.id,
      },
      include: {
        problem: true,
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: "desc" },
    });

    const total = await db.submission.count({
      where: {
        contestId,
        userId: req.user.id,
      },
    });

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          { submissions, total },
          "User submissions fetched successfully",
        ),
      );
  });

  public getAllSubmissionsInContest = AsyncHandler(async (req, res) => {
    const { contestId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const submissions = await db.submission.findMany({
      where: {
        contestId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        problem: true,
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: "desc" },
    });

    const contest = await db.contest.findUnique({
      where: {
        id: contestId,
      },
    });

    if (!contest || contest.deleted) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Contest not found");
    }

    const total = await db.submission.count({
      where: {
        contestId,
      },
    });

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          { submissions, total },
          "Contest submissions fetched successfully",
        ),
      );
  });

  public updateContestScore = AsyncHandler(async (req, res) => {
    const { contestId, problemId, userId } = req.body;
    const contestProblem = await db.contestProblem.findFirst({
      where: {
        contestId,
        problemId,
      },
    });

    if (!contestProblem) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Contest Problem not found");
    }

    await db.contestParticipation.update({
      where: {
        userId_contestId: {
          userId,
          contestId,
        },
      },
      data: {
        score: {
          increment: contestProblem.points,
        },
      },
    });

    return res
      .status(STATUS_CODE.OK)
      .json(new ApiResponse(STATUS_CODE.OK, {}, "Score updated successfully"));
  });
}

export { ContestController };
