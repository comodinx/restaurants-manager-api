/**
 * Current environment
 */
export const env = process.env.NODE_ENV || "development";

/**
 * Flag for indicate if the application is running on production mode
 */
export const isProd = ["prod", "production"].includes(String(env).toLowerCase());
