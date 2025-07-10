import { fetchApi } from "../../utils/FetchApi";
import { LANGUAGE } from "../../types/language.enum"; // Import your LANGUAGE enum type if available

class ExecuteCodeService {
  private executeCodeFetch;

  constructor() {
    this.executeCodeFetch = fetchApi.init("/execute-code");
  }

  /**
   * Executes or Submits code for a given problem
   * @param problemId - ID of the problem
   * @param sourceCode - User's solution code
   * @param language - Selected language (enum string)
   * @param stdin - Array of standard input test cases
   * @param expected_outputs - Array of expected outputs
   * @param isSubmit - Whether it's a submission or just a run
   * @param contestId - Optional contest ID
   */
  public async executeCode({
    problemId,
    sourceCode,
    language,
    stdin = [],
    expected_outputs = [],
    isSubmit = false,
    contestId,
  }: {
    problemId: string;
    sourceCode: string;
    language: LANGUAGE;
    stdin?: string[];
    expected_outputs?: string[];
    isSubmit?: boolean;
    contestId?: string;
  }) {
    return await this.executeCodeFetch(`/${problemId}`, "POST", {
      sourceCode,
      language,
      stdin,
      expected_outputs,
      isSubmit,
      contestId,
    });
  }
}

const executeCodeService = new ExecuteCodeService();
export { executeCodeService };
