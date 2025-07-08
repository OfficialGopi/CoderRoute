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
import { LANGUAGE } from "../../prisma/enums";
import { any } from "zod";

class ProblemServices {
  public async checkTestCasesWithRespectToReferenceSolutions(
    backgroundCodes: {
      language: LANGUAGE;
      code: string;
      whereToWriteCode: string;
    }[],
    referenceSolutions: {
      language: LANGUAGE;
      code: string;
    }[],
    testcases: {
      input: string;
      output: string;
    }[],
  ) {
    if (
      !referenceSolutions ||
      !testcases ||
      testcases.length === 0 ||
      !backgroundCodes
    ) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Background Code , Reference solutions and test cases are required",
      );
    }
    if (
      Object.keys(referenceSolutions).length === 0 ||
      backgroundCodes.length !== Object.values(LANGUAGE).length ||
      referenceSolutions.length !== Object.values(LANGUAGE).length
    ) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        " All Reference solutions and background codes are required",
      );
    }

    if (!testcases || testcases.length === 0) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Test cases are required");
    }

    for (const bgCodesObj of backgroundCodes) {
      const { language, code, whereToWriteCode } = bgCodesObj;

      if (!language) {
        throw new ApiError(
          STATUS_CODE.BAD_REQUEST,
          `Language for background code is required`,
        );
      }

      if (!code) {
        throw new ApiError(
          STATUS_CODE.BAD_REQUEST,
          `Code for background code is required`,
        );
      }

      if (!whereToWriteCode) {
        throw new ApiError(
          STATUS_CODE.BAD_REQUEST,
          `Where to write code for background code is required`,
        );
      }

      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        throw new ApiError(
          STATUS_CODE.BAD_REQUEST,
          `Language ${language} is not supported`,
        );
      }

      if (!languageId) {
        throw new ApiError(
          STATUS_CODE.BAD_REQUEST,
          `Language ${language} is not supported`,
        );
      }

      const referenceSolution = referenceSolutions.find(
        (e) => e.language === language,
      );

      if (!referenceSolution) {
        throw new ApiError(
          STATUS_CODE.BAD_REQUEST,
          `Reference solution for ${language} is required`,
        );
      }

      const solutionCode = code.replace(
        whereToWriteCode,
        referenceSolution.code,
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
}

class ProblemController {
  // UTILITY FUNCTION TO CHECK TEST CASES WITH RESPECT TO REFERENCE SOLUTIONS
  // THIS FUNCTION WILL CHECK IF THE TEST CASES ARE VALID OR NOT
  private checkTestCasesWithRespectToReferenceSolutions;
  constructor() {
    const services = new ProblemServices();
    this.checkTestCasesWithRespectToReferenceSolutions =
      services.checkTestCasesWithRespectToReferenceSolutions.bind(services);
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
      constraints,
      hints,
      testcases,
      codeSnippets,
      referenceSolutions,
      editorial,
      backgroundCodes,
    }: {
      title: string;
      description: string;
      difficulty: DIFFICULTY;
      tags: string[];
      constraints: string[];
      hints: string[];
      codeSnippets: {
        language: LANGUAGE;
        code: string;
      }[];
      editorial: string;
      backgroundCodes: {
        language: LANGUAGE;
        code: string;
        whereToWriteCode: string;
      }[];
      referenceSolutions: {
        language: LANGUAGE;
        code: string;
      }[];
      testcases: {
        input: string;
        output: string;
      }[];
    } = req.body;

    if (
      !title ||
      !description ||
      !difficulty ||
      !testcases ||
      !referenceSolutions ||
      !codeSnippets ||
      !backgroundCodes
    ) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Title, description, difficulty, testcases, code snippets, and reference solutions are required",
      );
    }

    await this.checkTestCasesWithRespectToReferenceSolutions(
      backgroundCodes,
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
        constraints,
        hints,
        editorial,
        testcases: {
          create: testcases,
        },
        codeSnippets: {
          create: codeSnippets,
        },
        referenceSolutions: {
          create: referenceSolutions,
        },
        backgroundCodes: {
          create: backgroundCodes,
        },
        userId: user.id,
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
      include: {
        testcases: true,
        codeSnippets: true,
        referenceSolutions: true,
        backgroundCodes: true,
        submissions: true,
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

  public updateProblemDetails = AsyncHandler(async (req, res) => {
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
      constraints,
      hints,
      editorial,
    }: {
      title: string;
      description: string;
      difficulty: DIFFICULTY;
      tags: string[];
      constraints: string[];
      hints: string[];
      editorial: string;
    } = req.body;

    const updatedProblem = await db.problem.update({
      where: { id: problemId },
      data: {
        title,
        description,
        difficulty,
        tags,
        constraints,
        hints,
        editorial,
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

  public updateProblemCodeSnippet = AsyncHandler(async (req, res) => {
    const { problemId, codeSnippetId } = req.params;

    if (req.user?.role !== USER_ROLE.ADMIN) {
      throw new ApiError(
        STATUS_CODE.FORBIDDEN,
        "Forbidden: Only admins can delete problems",
      );
    }

    if (!problemId) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Problem ID is required");
    }

    if (!codeSnippetId) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Code Snippet ID is required",
      );
    }

    if (isNaN(parseInt(codeSnippetId))) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Code Snippet ID is not a number",
      );
    }

    const {
      language,
      code,
    }: {
      language: LANGUAGE;
      code: string;
    } = req.body;

    if (!language || !code) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Language and code are required",
      );
    }

    const codeSnippets = await db.problemCodeSnippets.findUnique({
      where: {
        id: parseInt(codeSnippetId),
      },
    });

    if (!codeSnippets) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Problem not found");
    }

    const updatedCodeSnippets = await db.problemCodeSnippets.update({
      where: { id: codeSnippets.id },
      data: {
        code,
      },
    });

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          updatedCodeSnippets,
          "Code Snippet updated successfully",
        ),
      );
  });

  public updateProblemReferenceSolution = AsyncHandler(async (req, res) => {
    const { problemId, referenceSolutionId } = req.params;

    if (req.user?.role !== USER_ROLE.ADMIN) {
      throw new ApiError(
        STATUS_CODE.FORBIDDEN,
        "Forbidden: Only admins can delete problems",
      );
    }

    if (!problemId) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Problem ID is required");
    }

    if (!referenceSolutionId) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Reference Solution ID is required",
      );
    }

    if (isNaN(parseInt(referenceSolutionId))) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Code Snippet ID is not a number",
      );
    }

    const {
      language,
      code,
    }: {
      language: LANGUAGE;
      code: string;
    } = req.body;

    if (!language || !code) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Language and code are required",
      );
    }

    const problemReferenceSolution =
      await db.problemReferenceSolutions.findUnique({
        where: {
          id: parseInt(referenceSolutionId),
        },
      });

    if (!problemReferenceSolution) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Problem not found");
    }

    const backgroundCode = await db.problemBackgroundCode.findUnique({
      where: {
        problemId_language: {
          problemId: problemId,
          language,
        },
      },
    });

    if (!backgroundCode) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Problem not found");
    }

    const testcases = await db.testCases.findMany({
      where: {
        problemId: problemId,
      },
    });

    await this.checkTestCasesWithRespectToReferenceSolutions(
      [backgroundCode],
      [
        {
          language,
          code,
        },
      ],
      testcases,
    );

    const updatedProblemReferenceSoln =
      await db.problemReferenceSolutions.update({
        where: { id: problemReferenceSolution.id },
        data: {
          code,
        },
      });

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          updatedProblemReferenceSoln,
          "Problem Reference Solution updated successfully",
        ),
      );
  });

  public updateProblemBackgroundCode = AsyncHandler(async (req, res) => {
    const { problemId, backgroundCodeId } = req.params;

    if (req.user?.role !== USER_ROLE.ADMIN) {
      throw new ApiError(
        STATUS_CODE.FORBIDDEN,
        "Forbidden: Only admins can delete problems",
      );
    }

    if (!problemId) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Problem ID is required");
    }

    if (!backgroundCodeId) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Code Snippet ID is required",
      );
    }

    if (isNaN(parseInt(backgroundCodeId))) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Code Snippet ID is not a number",
      );
    }

    const {
      language,
      code,
      whereToWriteCode,
    }: {
      language: LANGUAGE;
      code: string;
      whereToWriteCode: string;
    } = req.body;

    if (!language || !code || !whereToWriteCode) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Language, code and where to write code are required",
      );
    }

    const problemReferenceSolution =
      await db.problemReferenceSolutions.findUnique({
        where: {
          problemId_language: {
            problemId,
            language,
          },
        },
      });

    if (!problemReferenceSolution) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Problem not found");
    }

    const backgroundCode = await db.problemBackgroundCode.findUnique({
      where: {
        id: parseInt(backgroundCodeId),
      },
    });

    if (!backgroundCode) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Problem not found");
    }

    const testcases = await db.testCases.findMany({
      where: {
        problemId: problemId,
      },
    });

    await this.checkTestCasesWithRespectToReferenceSolutions(
      [
        {
          language,
          code,
          whereToWriteCode,
        },
      ],
      [problemReferenceSolution],
      testcases,
    );

    const updatedProblemReferenceSoln = await db.problemBackgroundCode.update({
      where: { id: backgroundCode.id },
      data: {
        code,
        whereToWriteCode,
      },
    });

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          updatedProblemReferenceSoln,
          "Problem Background Code updated successfully",
        ),
      );
  });

  public updateProblemTestCases = AsyncHandler(async (req, res) => {
    const { problemId, testcaseId } = req.params;

    if (req.user?.role !== USER_ROLE.ADMIN) {
      throw new ApiError(
        STATUS_CODE.FORBIDDEN,
        "Forbidden: Only admins can delete problems",
      );
    }

    if (!problemId) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Problem ID is required");
    }

    if (!testcaseId) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Testcase ID is required");
    }
    if (isNaN(parseInt(testcaseId))) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Testcase ID is not a number",
      );
    }

    const testcase = await db.testCases.findUnique({
      where: {
        id: parseInt(testcaseId),
      },
    });

    if (!testcase) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Testcase not found");
    }

    const {
      input,
      output,
    }: {
      input: string;
      output: string;
    } = req.body;

    if (!problemId) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Problem not found");
    }

    const referenceSolutions = await db.problemReferenceSolutions.findMany({
      where: {
        problemId: problemId,
      },
    });

    const backgroundCodes = await db.problemBackgroundCode.findMany({
      where: {
        problemId: problemId,
      },
    });

    await this.checkTestCasesWithRespectToReferenceSolutions(
      backgroundCodes,
      referenceSolutions,
      [
        {
          input,
          output,
        },
      ],
    );

    const updatedProblem = await db.testCases.update({
      where: { id: testcase.id },
      data: {
        input,
        output,
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

  public addProblemTestCase = AsyncHandler(async (req, res) => {
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

    const {
      input,
      output,
    }: {
      input: string;
      output: string;
    } = req.body;

    if (!problemId) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Problem not found");
    }

    const referenceSolutions = await db.problemReferenceSolutions.findMany({
      where: {
        problemId: problemId,
      },
    });

    const backgroundCodes = await db.problemBackgroundCode.findMany({
      where: {
        problemId: problemId,
      },
    });

    await this.checkTestCasesWithRespectToReferenceSolutions(
      backgroundCodes,
      referenceSolutions,
      [
        {
          input,
          output,
        },
      ],
    );

    const newTestCase = await db.testCases.create({
      data: {
        problemId: problemId,
        input,
        output,
      },
    });

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          newTestCase,
          "Problem updated successfully",
        ),
      );
  });

  public deleteTestCase = AsyncHandler(async (req, res) => {
    const { problemId, testcaseId } = req.params;

    if (req.user?.role !== USER_ROLE.ADMIN) {
      throw new ApiError(
        STATUS_CODE.FORBIDDEN,
        "Forbidden: Only admins can delete problems",
      );
    }

    if (!problemId) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Problem ID is required");
    }

    if (!testcaseId) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Testcase ID is required");
    }
    if (isNaN(parseInt(testcaseId))) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Testcase ID is not a number",
      );
    }

    const testcase = await db.testCases.findUnique({
      where: {
        id: parseInt(testcaseId),
      },
    });

    if (!testcase) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Testcase not found");
    }

    await db.testCases.delete({
      where: {
        id: testcase.id,
      },
    });

    return res
      .status(STATUS_CODE.NO_CONTENT)
      .json(
        new ApiResponse(
          STATUS_CODE.NO_CONTENT,
          {},
          `Testcase deleted successfully`,
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
    const { id } = req.user;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;

    if (page < 1) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Invalid page number");
    }

    if (!id) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "User ID is required");
    }

    const solvedProblems = await db.problem.findMany({
      where: {
        solvedBy: {
          some: {
            userId: id as string,
          },
        },
      },
      include: {
        submissions: true,
      },
      skip: (page - 1) * 20,
      take: 20,
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
