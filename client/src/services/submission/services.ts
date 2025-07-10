import { fetchApi } from "../../utils/FetchApi";

class SubmissionServices {
  private submissionFetch;

  constructor() {
    this.submissionFetch = fetchApi.init("/submissions");
  }

  // ✅ Get all submissions by the logged-in user (paginated)
  public async getAllSubmissions(page: number = 1) {
    return await this.submissionFetch(
      `/get-all-submissions?page=${page}`,
      "GET",
    );
  }

  // ✅ Get all submissions for a specific problem by the logged-in user (paginated)
  public async getSubmissionsForProblem(problemId: string, page: number = 1) {
    return await this.submissionFetch(
      `/get-submissions-for-problem/${problemId}?page=${page}`,
      "GET",
    );
  }

  // ✅ Get total submission count for a specific problem
  public async getSubmissionCountForProblem(problemId: string) {
    return await this.submissionFetch(
      `/get-submissions-for-problem-count/${problemId}`,
      "GET",
    );
  }
}

const submissionServices = new SubmissionServices();
export { submissionServices };
