export const port = +(process.env.SERVER_PORT || process.env.PORT || 3030);
export const healthPath = process.env.SERVER_HEALTH_PATH || process.env.HEALTH_PATH || "/health";
