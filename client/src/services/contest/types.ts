interface TGetAllContestsInput {
  page?: number;
  limit?: number;
  showDeleted?: boolean;
}

interface ContestMeta {
  id: string;
  name: string;
  description?: string;
  startTime: string;
  endTime: string;
  visibility: boolean;
  isRated: boolean;
  durationMinutes?: number;
  rules?: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

interface TGetAllContestsResponse {
  success: boolean;
  message?: string;
  data: {
    contests: ContestMeta[];
    total: number;
  };
}

interface TGetContestByIdResponse {
  success: boolean;
  message?: string;
  data: ContestMeta & {
    problems: {
      problemId: string;
      points: number;
      order: number;
    }[];
    participations: any[]; // You can replace with proper type
  };
}

interface TCreateContestInput {
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
}

interface TCreateContestResponse {
  success: boolean;
  message?: string;
  data: ContestMeta;
}

interface TDeleteContestResponse {
  success: boolean;
  message?: string;
  data?: Record<string, never>;
}

interface TParticipateInContestInput {
  contestId: string;
}

interface TParticipateInContestResponse {
  success: boolean;
  message?: string;
  data: {
    id: string;
    userId: string;
    contestId: string;
    startedAt: string;
  };
}

interface TGetContestParticipantsResponse {
  success: boolean;
  message?: string;
  data: {
    user: {
      id: string;
      username: string;
      avatar: string | null;
    };
  }[];
}

interface SubmissionMeta {
  id: string;
  userId: string;
  problemId: string;
  language: string;
  sourceCode: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  problem: {
    id: string;
    title: string;
    difficulty: string;
  };
  user?: {
    id: string;
    username: string;
    avatar: string | null;
  };
}

interface TGetSubmissionsResponse {
  success: boolean;
  message?: string;
  data: {
    submissions: SubmissionMeta[];
    total: number;
  };
}

interface TUpdateContestScoreInput {
  contestId: string;
  problemId: string;
  userId: string;
}

interface TUpdateContestScoreResponse {
  success: boolean;
  message?: string;
  data?: Record<string, never>;
}

export type {
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
};
