import { STATUS_CODE } from "../../constants/statusCodes.constants";
import { db } from "../../db";
import { ApiError } from "../../utils/api-error";
import { ApiResponse } from "../../utils/api-response";
import { AsyncHandler } from "../../utils/async-handler";

class SubmissionController {
  public getAllSubmissions = AsyncHandler(async (req, res) => {
    if (!req.user || !req.user.id) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    const userId = req.user.id;
    const page = parseInt(req.query.page as string) || 1;

    if (page < 1) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Invalid page number");
    }

    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        problem: {
          select: {
            id: true,
            title: true,
            difficulty: true,
          },
        },
      },
      skip: (page - 1) * 50,
      take: 50,
    });

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          submissions,
          "Submissions fetched successfully",
        ),
      );
  });

  public getAllSubmissionsForProblem = AsyncHandler(async (req, res) => {
    if (!req.user || !req.user.id) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    const userId = req.user.id;
    const { problemId } = req.params;

    if (!problemId) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Problem ID is required");
    }

    const page = parseInt(req.query.page as string) || 1;
    if (page < 1) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Invalid page number");
    }

    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
        problemId: problemId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        problem: {
          select: {
            id: true,
            title: true,
            difficulty: true,
          },
        },
      },
      skip: (page - 1) * 50,
      take: 50,
    });

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          submissions,
          "Submissions fetched successfully",
        ),
      );
  });

  public getAllSubmissionsCountForProblem = AsyncHandler(async (req, res) => {
    const { problemId } = req.params;
    const totalSubmissions = await db.submission.count({
      where: {
        problemId: problemId,
      },
    });

    return res.status(STATUS_CODE.OK).json(
      new ApiResponse(
        STATUS_CODE.OK,
        {
          count: totalSubmissions,
        },
        "Submissions Fetched successfully",
      ),
    );
  });
}

export { SubmissionController };
