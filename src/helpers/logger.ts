import { Logger } from "@tsed/logger";

const name = process.env.LOGGER_NAME || process.env.APP_NAME || "app";
const level = process.env.LOGGER_LEVEL || "debug";

export const logger = new Logger(name);

logger.appenders.set("console-log", {
  type: "console",
  level,
});
