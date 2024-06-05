// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

// imports
import { App } from "./app";

// Create nest application instance
const app = new App();

// Bootstrap application
app.bootstrap();
