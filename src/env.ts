import dotenv from "dotenv";
import z from "zod";
import { logger } from "./logger";
dotenv.config({
  path: "./.env",
});

const object = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),

  //PORT
  PORT: z.string().optional(),

  //DATABASE_URL
  DATABASE_URL: z.string(),

  //  FRONTEND ORIGIN FROM WHERE SHOULD THE REQUESTS COME
  ORIGIN: z.string(),

  //  SERVER URL
  BASE_URL: z.string(),

  //  CLOUDINARY VARIABLES
  CLOUDINARY_SECRET: z.string(),
  CLOUDINARY_KEY: z.string(),
  CLOUDINARY_NAME: z.string(),

  //  MAILTRAP VARIABLES
  MAILTRAP_HOST: z.string(),
  MAILTRAP_PORT: z.string(),
  MAILTRAP_USER: z.string(),
  MAILTRAP_PASSWORD: z.string(),
  MAILTRAP_SENDER_EMAIL: z.string(),

  //  JWT TOKEN ENV VARIABLESs
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRY: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRY: z.string(),

  //  JUDGE0 API
  JUDGE0_API_URL: z.string(),
  JUDGE0_API_TOKEN: z.string(),
});

function validateEnv(env: NodeJS.ProcessEnv) {
  const { data, success, error } = object.safeParse(env);
  if (!success) {
    logger.error(
      `## INVALID ENVIRONMENT VARIABLES PARSING :  ${error.name}   ##`,
    );

    throw new Error(
      `## INVALID ENVIRONMENT VARIABLES PARSING :  ${error.name}   ##`,
    );
  }

  return data;
}

const env = validateEnv(process.env);

export { env };
