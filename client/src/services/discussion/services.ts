import { fetchApi } from "../../utils/FetchApi";

class DiscussionServices {
  private discussionFetch;

  constructor() {
    this.discussionFetch = fetchApi.init("/discussion");
  }

  public async getAllDiscussions({
    problemId,
    parentId = null,
    page = 1,
    limit = 20,
  }: {
    problemId?: string;
    parentId?: string | null;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (problemId) queryParams.append("problemId", problemId);
    if (parentId !== null) queryParams.append("parentId", parentId);
    queryParams.append("page", String(page));
    queryParams.append("limit", String(limit));

    return await this.discussionFetch(`?${queryParams.toString()}`, "GET");
  }

  // GET DISCUSSION BY ID
  public async getDiscussionById(discussionId: string) {
    return await this.discussionFetch(`/${discussionId}`, "GET");
  }

  // CREATE DISCUSSION OR REPLY
  public async createDiscussion({
    content,
    problemId,
    parentId,
  }: {
    content: string;
    problemId?: string;
    parentId?: string;
  }) {
    return await this.discussionFetch("/", "POST", {
      content,
      problemId,
      parentId,
    });
  }

  // DELETE DISCUSSION
  public async deleteDiscussion(discussionId: string) {
    return await this.discussionFetch(`/${discussionId}`, "DELETE");
  }
}

const discussionServices = new DiscussionServices();
export { discussionServices };
