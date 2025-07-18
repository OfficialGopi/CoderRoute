import axios, { Axios, AxiosError } from "axios";
import { env } from "../../env";

class Judge0 {
  private api: Axios;

  private languageMap = {
    // C: 50,
    // CPP: 54,
    // JAVA: 62,
    PYTHON: 71,
    JAVASCRIPT: 63,
  };

  private sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  constructor() {
    this.api = axios.create({
      baseURL: env.JUDGE0_API_URL,
      headers: {
        Authorization: `Bearer ${env.JUDGE0_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
  }

  public getJudge0LanguageId(language: string): number {
    return (
      this.languageMap[
        language.toUpperCase() as keyof typeof this.languageMap
      ] ?? undefined
    );
  }

  public getJudge0LanguageName(languageId: number): string | undefined {
    return Object.keys(this.languageMap).find(
      (key) =>
        (this.languageMap[key as keyof typeof this.languageMap] as number) ===
        languageId,
    );
  }

  public async createSubmissionBatch(
    submissions: {
      language_id: number;
      source_code: string;
      stdin: string;
      expected_output?: string;
    }[],
  ) {
    try {
      const response = await this.api.post(
        "/submissions/batch",
        {
          submissions,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return {
        success: true,
        data: response.data as {
          token: string;
        }[],
      };
    } catch (error) {
      return {
        success: false,
        error: error as AxiosError,
      };
    }
  }

  public async poolBatchResults(tokens: string[]) {
    try {
      const maxRetries = 15;
      let attempt = 0;

      while (attempt < maxRetries) {
        const {
          data,
        }: {
          data: {
            submissions: {
              language_id: number;
              stdout: string;
              status: {
                description: string;
                id: number;
              };
              stderr: string | null;
              token: string;
              [key: string]: any;
            }[];
          };
        } = await this.api.get("/submissions/batch", {
          params: {
            tokens: tokens.join(","),
          },

          headers: {
            "Content-Type": "application/json",
          },
        });

        const isAllDone = data.submissions.every(
          (submission) => submission.status.id >= 3,
        );

        if (isAllDone) {
          return {
            success: true,
            data: data.submissions,
          };
        }
        attempt++;
        // Wait for 1 second before polling again
        await this.sleep(2000);
      }

      throw new Error("Failed to get batch results after 15 attempts");
    } catch (error) {
      return {
        success: false,
        error: error as AxiosError,
      };
    }
  }
}

const judge0 = new Judge0();

const getJudge0LanguageName = judge0.getJudge0LanguageName.bind(judge0);
const getJudge0LanguageId = judge0.getJudge0LanguageId.bind(judge0);
const createSubmissionBatch = judge0.createSubmissionBatch.bind(judge0);
const poolBatchResults = judge0.poolBatchResults.bind(judge0);

export {
  getJudge0LanguageName,
  getJudge0LanguageId,
  createSubmissionBatch,
  poolBatchResults,
};
