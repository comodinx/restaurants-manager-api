// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

// force test environment
process.env.NODE_ENV = "test";

// Health check
process.env.SERVER_HEALTH_PATH = "/health";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default async function setup() {}
