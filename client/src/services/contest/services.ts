import { fetchApi } from "../../utils/FetchApi";
import type {
  TGetAllContestsInput,
  TGetAllContestsResponse,
  TGetContestByIdResponse,
  TCreateContestInput,
  TCreateContestResponse,
  TDeleteContestResponse,
  TParticipateInContestInput,
  TParticipateInContestResponse,
  TGetContestParticipantsResponse,
  TGetSubmissionsResponse,
  TUpdateContestScoreInput,
  TUpdateContestScoreResponse,
} from "./types";

class ContestServices {
  private contestFetch;

  constructor() {
    this.contestFetch = fetchApi.init("/contest");
  }

  public async getAllContests({
    page = 1,
    limit = 20,
    showDeleted,
  }: TGetAllContestsInput) {
    const query = `?page=${page}&limit=${limit}${showDeleted ? `&showDeleted=${showDeleted}` : ""}`;
    const response = await this.contestFetch<
      TGetAllContestsResponse,
      TGetAllContestsInput
    >(query, "GET");
    return response;
  }

  public async getContestById(contestId: string) {
    const response = await this.contestFetch<TGetContestByIdResponse>(
      `/${contestId}`,
      "GET",
    );
    return response;
  }

  public async createContest(data: TCreateContestInput) {
    const response = await this.contestFetch<
      TCreateContestResponse,
      TCreateContestInput
    >("/", "POST", data);
    return response;
  }

  public async deleteContest(contestId: string) {
    const response = await this.contestFetch<TDeleteContestResponse>(
      `/${contestId}`,
      "DELETE",
    );
    return response;
  }

  public async participateInContest(data: TParticipateInContestInput) {
    const response = await this.contestFetch<
      TParticipateInContestResponse,
      TParticipateInContestInput
    >("/participate", "POST", data);
    return response;
  }

  public async getContestParticipants(contestId: string) {
    const response = await this.contestFetch<TGetContestParticipantsResponse>(
      `/${contestId}/participants`,
      "GET",
    );
    return response;
  }

  public async getUserSubmissionsInContest(
    contestId: string,
    page = 1,
    limit = 20,
  ) {
    const response = await this.contestFetch<TGetSubmissionsResponse>(
      `/${contestId}/submissions/user?page=${page}&limit=${limit}`,
      "GET",
    );
    return response;
  }

  public async getAllSubmissionsInContest(
    contestId: string,
    page = 1,
    limit = 20,
  ) {
    const response = await this.contestFetch<TGetSubmissionsResponse>(
      `/${contestId}/submissions/all?page=${page}&limit=${limit}`,
      "GET",
    );
    return response;
  }

  public async updateContestScore(data: TUpdateContestScoreInput) {
    const response = await this.contestFetch<
      TUpdateContestScoreResponse,
      TUpdateContestScoreInput
    >(`/${data.contestId}/score`, "PATCH", data);
    return response;
  }
}

const contestServices = new ContestServices();
export { contestServices };
