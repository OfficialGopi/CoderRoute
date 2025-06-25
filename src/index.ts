import type { Application } from "express";
import http from "http";
import { env } from "./env";
import { logger } from "./logger";
import { createApp } from "./app/index";

async function main(createApp: () => Application) {
  //  GETTING APPLICATION INSTANCE
  //  CREATING SERVER INSTANCE
  //  STARTING SERVER
  //  HANDLING ERRORS

  const server = http.createServer(createApp());
  const PORT = Number(env.PORT) ?? 5000;

  try {
    server.listen(PORT, () => {
      logger.info(`=====    SERVER STARTED ON PORT:${PORT}    =====`);
    });
  } catch (error) {
    logger.error("## SERVER STARTUP FAILED ##");
    process.exit(1);
  }
}

main(createApp);
