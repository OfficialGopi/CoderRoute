import { STATUS_CODE } from "../../constants/statusCodes.constants";
import { db } from "../../db";
import { DIFFICULTY, USER_ROLE } from "../../prisma/client";
import {
  createSubmissionBatch,
  getJudge0LanguageId,
  poolBatchResults,
} from "../../libs/judge0.libs";
import { ApiError } from "../../utils/api-error";
import { ApiResponse } from "../../utils/api-response";
import { AsyncHandler } from "../../utils/async-handler";

class ProblemController {
  // UTILITY FUNCTION TO CHECK TEST CASES WITH RESPECT TO REFERENCE SOLUTIONS
  // THIS FUNCTION WILL CHECK IF THE TEST CASES ARE VALID OR NOT
  private async checkTestCasesWithRespectToReferenceSolutions(
    backgroundCode: {
      [language: string]: {
        code: string;
        whereToWriteCode: string;
      };
    },
    referenceSolutions: {
      [key: string]: string;
    },
    testcases: {
      input: string;
      output: string;
    }[],
  ) {
    if (
      !referenceSolutions ||
      !testcases ||
      testcases.length === 0 ||
      !backgroundCode
    ) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Background Code , Reference solutions and test cases are required",
      );
    }
    if (
      Object.keys(referenceSolutions).length === 0 ||
      Object.keys(backgroundCode).length === 0 ||
      Object.keys(backgroundCode).length !==
        Object.keys(referenceSolutions).length
    ) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        " All Reference solutions and background codes are required",
      );
    }
    if (!testcases || testcases.length === 0) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Test cases are required");
    }

    for (const [language, code] of Object.entries(backgroundCode)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        throw new ApiError(
          STATUS_CODE.BAD_REQUEST,
          `Language ${language} is not supported`,
        );
      }

      if (!code.code) {
        throw new ApiError(
          STATUS_CODE.BAD_REQUEST,
          `Code for ${language} is required`,
        );
      }

      if (!code.whereToWriteCode) {
        throw new ApiError(
          STATUS_CODE.BAD_REQUEST,
          `Where to write code for ${language} is required`,
        );
      }

      if (referenceSolutions[language] === undefined) {
        throw new ApiError(
          STATUS_CODE.BAD_REQUEST,
          `Reference solution for ${language} is required`,
        );
      }

      const solutionCode = code.code.replace(
        code.whereToWriteCode,
        referenceSolutions[language],
      );

      if (!solutionCode) {
        throw new ApiError(
          STATUS_CODE.BAD_REQUEST,
          `Solution code for ${language} is required`,
        );
      }

      // CREATE SUBMISSION FORMAT DATA
      const submissions: {
        language_id: number;
        source_code: string;
        stdin: string;
        expected_output: string;
      }[] = testcases.map(
        ({ input, output }: { input: string; output: string }) => {
          if (!input || !output) {
            throw new ApiError(
              STATUS_CODE.BAD_REQUEST,
              "Input and output are required",
            );
          }

          return {
            source_code: solutionCode,
            language_id: languageId,
            stdin: input,
            expected_output: output,
          };
        },
      );

      //CREATE SUBMISSION BATCH
      const submissionResults = await createSubmissionBatch(submissions);

      if (!submissionResults.success) {
        throw new ApiError(
          STATUS_CODE.INTERNAL_SERVER_ERROR,
          "Failed to create submissions",
        );
      }

      if (!submissionResults.data) {
        throw new ApiError(
          STATUS_CODE.INTERNAL_SERVER_ERROR,
          "No submission results found",
        );
      }

      const tokens = submissionResults.data.map(({ token }) => {
        if (!token) {
          throw new ApiError(
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            "No token found in submission result",
          );
        }

        return token;
      });

      const results = await poolBatchResults(tokens);

      if (!results.success) {
        throw new ApiError(
          STATUS_CODE.INTERNAL_SERVER_ERROR,
          "Failed to pool batch results",
        );
      }
      console.dir(results, { depth: null });
      if (!results.data) {
        throw new ApiError(
          STATUS_CODE.INTERNAL_SERVER_ERROR,
          "No results found",
        );
      }
      for (let i = 0; i < results.data.length; i++) {
        const result = results.data[i];

        if (result.status.id > 3) {
          throw new ApiError(
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            "JUDGE0 : " + result.status.description ||
              `${result.status.description}: ${result.stderr || "Unknown error"}`,
          );
        }
      }
    }
  }
  // CONTROLLERS
  public getAllProblems = AsyncHandler(async (req, res) => {
    // PAGINATION
    const { page } = req.query;
    const pageNumber = parseInt(page as string) || 1;

    if (isNaN(pageNumber) || pageNumber < 1) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Invalid page number");
    }

    //SKIP AND TAKE 50 PROBLEMS AT A TIME
    const problems = await db.problem.findMany({
      skip: (pageNumber - 1) * 50,
      take: 50,
    });

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          problems,
          `Problems fetched successfully`,
        ),
      );
  });

  public createProblem = AsyncHandler(async (req, res) => {
    // GETTING ALL THE REQUEST BODY
    // LOOP THROUGH EACH AND EVERY SOLUTION FOR DIFFERENT LANGUAGE
    const user = req.user;

    if (!user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    if (user.role !== USER_ROLE.ADMIN) {
      throw new ApiError(
        STATUS_CODE.FORBIDDEN,
        "Forbidden: Only admins can create problems",
      );
    }

    if (!req.body) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Invalid Request Body");
    }

    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      hints,
      testcases,
      codeSnippets,
      referenceSolutions,
      editorial,
      backgroundCode,
    }: {
      title: string;
      description: string;
      difficulty: DIFFICULTY;
      tags: string[];
      examples: any[];
      constraints: string[];
      hints: string[];
      testcases: {
        input: string;
        output: string;
      }[];
      codeSnippets: { [language: string]: string };
      referenceSolutions: { [language: string]: string };
      editorial: string;
      backgroundCode: {
        [lanuguage: string]: {
          code: string;
          whereToWriteCode: string;
        };
      };
    } = req.body;

    if (
      !title ||
      !description ||
      !difficulty ||
      !testcases ||
      !referenceSolutions ||
      !codeSnippets ||
      !backgroundCode
    ) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Title, description, difficulty, testcases, code snippets, and reference solutions are required",
      );
    }

    await this.checkTestCasesWithRespectToReferenceSolutions(
      backgroundCode,
      referenceSolutions,
      testcases,
    );

    // SAVE THE PROBLEM
    const problem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        hints,
        testcases,
        codeSnippets,
        referenceSolutions,
        editorial,
        backgroundCode,
        userId: user.id as string,
      },
    });

    return res
      .status(STATUS_CODE.RESOURCE_CREATED)
      .json(
        new ApiResponse(
          STATUS_CODE.RESOURCE_CREATED,
          problem,
          `Problem created successfully`,
        ),
      );
  });

  public getProblemById = AsyncHandler(async (req, res) => {
    const { problemId } = req.params;

    if (!problemId) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Problem ID is required");
    }

    const problem = await db.problem.findUnique({
      where: {
        id: problemId,
      },
    });

    if (!problem) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Problem not found");
    }

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          problem,
          `Problem fetched successfully`,
        ),
      );
  });

  public updateProblem = AsyncHandler(async (req, res) => {
    const { problemId } = req.params;

    if (req.user?.role !== USER_ROLE.ADMIN) {
      throw new ApiError(
        STATUS_CODE.FORBIDDEN,
        "Forbidden: Only admins can delete problems",
      );
    }

    if (!problemId) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Problem ID is required");
    }

    const problem = await db.problem.findUnique({
      where: {
        id: problemId,
      },
    });

    if (!problem) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Problem not found");
    }

    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      hints,
      testcases,
      codeSnippets,
      referenceSolutions,
      isTestCasesChanged,
      isReferenceSolutionsChanged,
      editorial,
      isBackgroundCodeChanged,
      backgroundCode,
    }: {
      title: string;
      description: string;
      difficulty: DIFFICULTY;
      tags: string[];
      examples: any[];
      constraints: string[];
      hints: string[];
      testcases: { input: string; output: string }[];
      codeSnippets: { language: string; code: string }[];
      referenceSolutions: { [key: string]: string };
      editorial: string;
      isTestCasesChanged: boolean;
      isReferenceSolutionsChanged: boolean;
      isBackgroundCodeChanged: boolean;
      backgroundCode: {
        [lanuguage: string]: {
          code: string;
          whereToWriteCode: string;
        };
      };
    } = req.body;

    if (
      isTestCasesChanged ||
      isBackgroundCodeChanged ||
      isReferenceSolutionsChanged
    ) {
      await this.checkTestCasesWithRespectToReferenceSolutions(
        backgroundCode,
        referenceSolutions,
        testcases,
      );
    }

    const updatedProblem = await db.problem.update({
      where: { id: problemId },
      data: {
        title,
        description,
        difficulty,
        tags,
        examples: examples ?? undefined,
        constraints,
        hints,
        testcases: isTestCasesChanged ? testcases : undefined,
        codeSnippets,
        referenceSolutions: isReferenceSolutionsChanged
          ? referenceSolutions
          : undefined,
        editorial,
        backgroundCode,
      },
    });

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          updatedProblem,
          "Problem updated successfully",
        ),
      );
  });

  public deleteProblem = AsyncHandler(async (req, res) => {
    const { problemId } = req.params;

    if (req.user?.role !== USER_ROLE.ADMIN) {
      throw new ApiError(
        STATUS_CODE.FORBIDDEN,
        "Forbidden: Only admins can delete problems",
      );
    }

    if (!problemId) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Problem ID is required");
    }

    const problem = await db.problem.findUnique({
      where: {
        id: problemId,
      },
    });

    if (!problem) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Problem not found");
    }

    await db.problem.delete({
      where: {
        id: problemId,
      },
    });

    return res
      .status(STATUS_CODE.NO_CONTENT)
      .json(
        new ApiResponse(
          STATUS_CODE.NO_CONTENT,
          {},
          `Problem deleted successfully`,
        ),
      );
  });

  public getAllProblemsSolvedByUser = AsyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Problem ID is required");
    }

    const solvedProblems = await db.problem.findMany({
      where: {
        solvedBy: {
          some: {
            id: id as string,
          },
        },
      },
      include: {
        submission: true,
      },
    });

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          solvedProblems,
          `Problems fetched successfully`,
        ),
      );
  });
}

export { ProblemController };
