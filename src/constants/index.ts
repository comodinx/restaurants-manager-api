import * as reservations from "./reservations";
import * as booleans from "./booleans";
import * as server from "./server";
import * as dates from "./dates";
import * as http from "./http";
import * as app from "./app";
import * as env from "./env";

const constants: any = {
  reservations,
  ...booleans,
  ...env,
  server,
  dates,
  http,
  app,
};

export default constants;
