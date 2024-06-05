/**
 * Variable used for listen app on specific port
 */
export const port = +(process.env.SERVER_PORT || process.env.PORT || 3030);

/**
 * Variable used for define health check endpoint
 */
export const healthPath = process.env.SERVER_HEALTH_PATH || process.env.HEALTH_PATH || "/health";
