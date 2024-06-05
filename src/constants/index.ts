import * as booleans from "./booleans";
import * as server from "./server";
import * as http from "./http";
import * as app from "./app";
import * as env from "./env";

const constants: any = {
  ...booleans,
  ...env,
  server,
  http,
  app,
};

export default constants;
