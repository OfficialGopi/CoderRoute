import { fetchApi } from "../../utils/FetchApi";

class ProblemServices {
  private problemFetch;

  constructor() {
    this.problemFetch = fetchApi.init("/problem");
  }

  // ✅ Get all problems (paginated)
  public async getAllProblems(page: number = 1) {
    return await this.problemFetch(`/?page=${page}`, "GET");
  }

  // ✅ Get a single problem by ID
  public async getProblemById(problemId: string) {
    return await this.problemFetch(`/${problemId}`, "GET");
  }

  // ✅ Get all problems solved by the current user (paginated)
  public async getAllProblemsSolvedByUser(page: number = 1) {
    return await this.problemFetch(`/solved-problems?page=${page}`, "GET");
  }

  // ✅ Create a new problem (Admin only)
  public async createProblem(data: any) {
    return await this.problemFetch("/", "POST", data);
  }

  // ✅ Update problem details (Admin only)
  public async updateProblemDetails(problemId: string, data: any) {
    return await this.problemFetch(`/${problemId}`, "PATCH", data);
  }

  // ✅ Delete a problem (Admin only)
  public async deleteProblem(problemId: string) {
    return await this.problemFetch(`/${problemId}`, "DELETE");
  }

  // ✅ Update a code snippet of a problem (Admin only)
  public async updateProblemCodeSnippet(
    problemId: string,
    codeSnippetId: string,
    data: { language: string; code: string },
  ) {
    return await this.problemFetch(
      `/${problemId}/code-snippets/${codeSnippetId}`,
      "PATCH",
      data,
    );
  }

  // ✅ Update reference solution for a problem (Admin only)
  public async updateProblemReferenceSolution(
    problemId: string,
    referenceSolutionId: string,
    data: { language: string; code: string },
  ) {
    return await this.problemFetch(
      `/${problemId}/reference-solutions/${referenceSolutionId}`,
      "PATCH",
      data,
    );
  }

  // ✅ Update background code for a problem (Admin only)
  public async updateProblemBackgroundCode(
    problemId: string,
    backgroundCodeId: string,
    data: { language: string; code: string; whereToWriteCode: string },
  ) {
    return await this.problemFetch(
      `/${problemId}/background-codes/${backgroundCodeId}`,
      "PATCH",
      data,
    );
  }

  // ✅ Add a test case to a problem (Admin only)
  public async addProblemTestCase(
    problemId: string,
    data: { input: string; output: string },
  ) {
    return await this.problemFetch(`/${problemId}/testcases`, "POST", data);
  }

  // ✅ Update a specific test case (Admin only)
  public async updateProblemTestCase(
    problemId: string,
    testcaseId: string,
    data: { input: string; output: string },
  ) {
    return await this.problemFetch(
      `/${problemId}/testcases/${testcaseId}`,
      "PATCH",
      data,
    );
  }

  // ✅ Delete a specific test case (Admin only)
  public async deleteProblemTestCase(problemId: string, testcaseId: string) {
    return await this.problemFetch(
      `/${problemId}/testcases/${testcaseId}`,
      "DELETE",
    );
  }
}

const problemServices = new ProblemServices();
export { problemServices };
