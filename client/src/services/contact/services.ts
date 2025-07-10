import { fetchApi } from "../../utils/FetchApi";

class ContestServices {
  private contestFetch;

  constructor() {
    this.contestFetch = fetchApi.init("/contest");
  }

  public async getAllContests({
    page = 1,
    limit = 20,
  }: {
    page?: number;
    limit?: number;
    showDeleted?: boolean;
  }) {
    return await this.contestFetch(`?page=${page}&limit=${limit}`, "GET");
  }

  public async getContestById(contestId: string) {
    return await this.contestFetch(`/${contestId}`, "GET");
  }

  public async createContest(data: {
    name: string;
    description?: string;
    startTime: string;
    endTime: string;
    visibility: "PUBLIC" | "PRIVATE";
    isRated: boolean;
    durationMinutes: number;
    rules?: string;
    problems: {
      problemId: string;
      points?: number;
      order?: number;
    }[];
  }) {
    return await this.contestFetch("/", "POST", data);
  }

  public async deleteContest(contestId: string) {
    return await this.contestFetch(`/${contestId}`, "DELETE");
  }

  public async participateInContest(contestId: string) {
    return await this.contestFetch("/participate", "POST", {
      contestId,
    });
  }

  public async getContestParticipants(contestId: string) {
    return await this.contestFetch(`/${contestId}/participants`, "GET");
  }

  public async getUserSubmissionsInContest(
    contestId: string,
    page = 1,
    limit = 20,
  ) {
    return await this.contestFetch(
      `/${contestId}/submissions/user?page=${page}&limit=${limit}`,
      "GET",
    );
  }

  public async getAllSubmissionsInContest(
    contestId: string,
    page = 1,
    limit = 20,
  ) {
    return await this.contestFetch(
      `/${contestId}/submissions/all?page=${page}&limit=${limit}`,
      "GET",
    );
  }

  public async updateContestScore({
    contestId,
    userId,
    problemId,
  }: {
    contestId: string;
    userId: string;
    problemId: string;
  }) {
    return await this.contestFetch(`/${contestId}/score`, "PATCH", {
      userId,
      problemId,
    });
  }
}

const contestServices = new ContestServices();
export { contestServices };
