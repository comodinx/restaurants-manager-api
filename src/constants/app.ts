// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require(`${process.cwd()}/package.json`);

/**
 * Variable used for logs, health check, etc
 */
export const name = process.env.APP_NAME || pkg.name || "application";

/**
 * Variable used for logs, health check, etc
 */
export const version = process.env.APP_VERSION || pkg.version || "0.0.1";
