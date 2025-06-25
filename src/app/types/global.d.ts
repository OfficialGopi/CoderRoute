import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import { User } from "../generated/prisma";

declare global {
  var prisma: PrismaClient | undefined;

  namespace Express {
    interface Request {
      user?: Partial<User>;
    }
  }
}

export {};
