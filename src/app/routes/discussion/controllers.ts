import { STATUS_CODE } from "../../constants/statusCodes.constants";
import { db } from "../../db";
import { USER_ROLE } from "../../prisma/client";
import { ApiError } from "../../utils/api-error";
import { ApiResponse } from "../../utils/api-response";
import { AsyncHandler } from "../../utils/async-handler";

class DiscussionController {
  public getAllDiscussions = AsyncHandler(async (req, res) => {
    const { problemId, parentId = null } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const whereClause: any = {
      deleted: false,
      parentId: parentId === null ? null : (parentId as string),
    };
    if (problemId) whereClause.problemId = problemId as string;

    const discussions = await db.discussion.findMany({
      where: whereClause,
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            replies: true,
          },
        },
      },
    });

    const totalCount = await db.discussion.count({ where: whereClause });

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          { discussions, totalCount },
          "Discussions fetched successfully",
        ),
      );
  });

  public getDiscussionById = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const discussion = await db.discussion.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        replies: {
          where: { deleted: false },
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!discussion || discussion.deleted) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Discussion not found");
    }

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          discussion,
          "Discussion fetched successfully",
        ),
      );
  });

  public createDiscussion = AsyncHandler(async (req, res) => {
    if (!req.user || !req.user.id) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const { content, problemId, parentId } = req.body;

    if (!content) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Content is required");
    }

    const newDiscussion = await db.discussion.create({
      data: {
        content,
        problemId: problemId ?? null,
        parentId: parentId ?? null,
        userId: req.user.id,
      },
    });

    return res
      .status(STATUS_CODE.RESOURCE_CREATED)
      .json(
        new ApiResponse(
          STATUS_CODE.RESOURCE_CREATED,
          newDiscussion,
          "Discussion created successfully",
        ),
      );
  });

  public deleteDiscussion = AsyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!req.user || !req.user.id) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const existing = await db.discussion.findUnique({
      where: {
        id,
      },
    });
    if (!existing) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Discussion not found");
    }
    if (req.user.role === USER_ROLE.USER && existing.userId !== req.user.id) {
      throw new ApiError(
        STATUS_CODE.FORBIDDEN,
        "You cannot delete this discussion",
      );
    }

    if (!existing) {
      throw new ApiError(
        STATUS_CODE.FORBIDDEN,
        "You cannot delete this discussion",
      );
    }

    await db.discussion.update({
      where: { id },
      data: { deleted: true },
    });

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(STATUS_CODE.OK, {}, "Discussion deleted successfully"),
      );
  });
}

export { DiscussionController };
