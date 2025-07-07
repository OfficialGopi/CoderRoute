import { STATUS_CODE } from "../../constants/statusCodes.constants";
import { db } from "../../db";
import {
  createSubmissionBatch,
  getJudge0LanguageId,
  poolBatchResults,
} from "../../libs/judge0.libs";
import { ApiError } from "../../utils/api-error";
import { ApiResponse } from "../../utils/api-response";
import { AsyncHandler } from "../../utils/async-handler";

//TO BE DONE
class ExecuteCodeController {
  public executeCode = AsyncHandler(async (req, res) => {
    if (!req.user || !req.user.id) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

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

    let isSubmit = false;

    let {
      contestId,
      sourceCode,
      language,
      stdin,
      expected_outputs,
    }: {
      contestId: string | undefined;
      sourceCode: string;
      language: string;
      stdin: string[] | undefined;
      expected_outputs: string[] | undefined;
    } = req.body;

    if (!stdin || !expected_outputs) {
      isSubmit = true;
      expected_outputs = (problem.testcases as Array<{ output: string }>).map(
        ({ output }) => output,
      );
      stdin = (problem.testcases as Array<{ input: string }>).map(
        ({ input }) => input,
      );
    }

    if (contestId) {
      const contest = await db.contest.findUnique({
        where: {
          id: contestId,
        },
      });

      if (!contest) {
        throw new ApiError(STATUS_CODE.NOT_FOUND, "Contest not found");
      }

      if (
        Date.now() < Date.parse(new Date(contest.startTime).toISOString()) ||
        Date.now() > Date.parse(new Date(contest.endTime).toISOString())
      ) {
        throw new ApiError(STATUS_CODE.FORBIDDEN, "Contest is not active");
      }
      const contestParticipant = await db.contestParticipation.findFirst({
        where: {
          userId: req.user.id,
          contestId,
        },
      });

      if (!contestParticipant) {
        throw new ApiError(
          STATUS_CODE.FORBIDDEN,
          "You are not participating in this contest",
        );
      }
    }

    if (
      !sourceCode ||
      !language ||
      !stdin ||
      !problemId ||
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expected_outputs) ||
      expected_outputs.length !== stdin.length
    ) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Invalid Request Body");
    }

    if (!problem.backgroundCode) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Missing backgroundCode in problem",
      );
    }

    const bgCode = (
      problem.backgroundCode as Record<
        string,
        { code: string; whereToWriteCode: string }
      >
    )[language];

    if (!bgCode) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        `Background code not available for selected language: ${language}`,
      );
    }

    const submissions = stdin.map((input) => ({
      source_code: (bgCode!.code as string).replace(
        bgCode!.whereToWriteCode,
        sourceCode,
      ),
      language_id: getJudge0LanguageId(language),
      stdin: input,
    }));

    const submitResponse = await createSubmissionBatch(submissions);

    if (!submitResponse.success) {
      throw new ApiError(
        STATUS_CODE.INTERNAL_SERVER_ERROR,
        submitResponse.error?.message || "Something went wrong",
      );
    }

    const tokens = submitResponse.data?.map((token) => token.token) || [];
    const results = await poolBatchResults(tokens);

    if (!results.success || !results.data) {
      throw new ApiError(
        STATUS_CODE.INTERNAL_SERVER_ERROR,
        results.error?.message || "Something went wrong",
      );
    }

    //  Analyze test case results
    let allPassed = true;
    const detailedResults = results.data?.map((result, i) => {
      const stdout = result.stdout?.trim();
      const expected_output = expected_outputs[i]?.trim();
      const passed = stdout === expected_output;

      if (!passed) allPassed = false;

      return {
        testCase: i + 1,
        passed,
        stdout,
        expected: expected_output,
        stderr: result.stderr || null,
        compile_output: result.compile_output || null,
        status: result.status.description,
        memory: result.memory ? `${result.memory} KB` : undefined,
        time: result.time ? `${result.time} s` : undefined,
      };
    });

    if (!isSubmit) {
      return res.status(STATUS_CODE.OK).json(
        new ApiResponse(
          STATUS_CODE.OK,
          {
            stdin: stdin.join("\n"),
            stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
            stderr: detailedResults.some((r) => r.stderr)
              ? JSON.stringify(detailedResults.map((r) => r.stderr))
              : null,
            compileOutput: detailedResults.some((r) => r.compile_output)
              ? JSON.stringify(detailedResults.map((r) => r.compile_output))
              : null,
            status: allPassed ? "Accepted" : "Wrong Answer",
          },
          "Code Executed Successfully",
        ),
      );
    }

    // store submission summary
    const submission = await db.submission.create({
      data: {
        userId: req.user.id,
        problemId,
        sourceCode: sourceCode,
        language: language,
        stdin: stdin.join("\n"),
        stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
        stderr: detailedResults.some((r) => r.stderr)
          ? JSON.stringify(detailedResults.map((r) => r.stderr))
          : null,
        compileOutput: detailedResults.some((r) => r.compile_output)
          ? JSON.stringify(detailedResults.map((r) => r.compile_output))
          : null,
        status: allPassed ? "Accepted" : "Wrong Answer",
        memory: detailedResults.some((r) => r.memory)
          ? JSON.stringify(detailedResults.map((r) => r.memory))
          : null,
        time: detailedResults.some((r) => r.time)
          ? JSON.stringify(detailedResults.map((r) => r.time))
          : null,
        contestId: contestId ?? null,
      },
    });

    // If All passed = true mark problem as solved for the current user
    if (allPassed) {
      await db.problemSolved.upsert({
        where: {
          userId_problemId: {
            userId: req.user.id,
            problemId,
          },
        },
        update: {},
        create: {
          userId: req.user.id,
          problemId,
        },
      });
    }
    // 8. Save individual test case results  using detailedResult

    const testCaseResults = detailedResults.map((result) => ({
      submissionId: submission.id,
      testCase: result.testCase,
      passed: result.passed,
      stdout: result.stdout,
      expected: result.expected,
      stderr: result.stderr,
      compileOutput: result.compile_output,
      status: result.status,
      memory: result.memory,
      time: result.time,
    }));

    await db.testCaseResult.createMany({
      data: testCaseResults,
    });

    const submissionWithTestCase = await db.submission.findUnique({
      where: {
        id: submission.id,
      },
      include: {
        testCases: true,
      },
    });
    //
    return res.status(STATUS_CODE.OK).json(
      new ApiResponse(
        STATUS_CODE.OK,
        {
          submissions: submissionWithTestCase,
        },
        "Code Executed! Successfully!",
      ),
    );
  });
}

export { ExecuteCodeController };
