import { isString } from "lodash";
import { Injectable } from "@nestjs/common";
import { HealthCheckService, SequelizeHealthIndicator } from "@nestjs/terminus";
import { HealthDto } from "@app/dtos";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require(`${process.cwd()}/package.json`);

@Injectable()
export class HealthService {
  constructor(
    private readonly database: SequelizeHealthIndicator,
    private readonly health: HealthCheckService
  ) {}

  //
  // public
  //

  async check(include: string = "") {
    const res: HealthDto = {
      alive: true,
      name: pkg.name,
      version: pkg.version || "1.0.0",
      environment: process.env.NODE_ENV || "development",
    };

    try {
      const indicators: any[] = [];

      await this.resolveDatabase(include, indicators);
      await this.normalizeIndicators(res, indicators);
    } catch (e) {
      await this.normalizeError(res, e);
    }

    return res;
  }

  //
  // private
  //

  protected async resolveDatabase(include: string, indicators: any[]) {
    if (!include.includes("database")) {
      return;
    }

    // Health check database connection
    indicators.push(() =>
      this.database.pingCheck("database", {
        timeout: /* ms */ 2000,
      })
    );
  }

  protected async normalizeIndicators(res: HealthDto, indicators: any[]) {
    // Check if is necesary check indicators
    if (indicators && indicators.length) {
      const checks = await this.health.check(indicators);

      // Success indicators response
      res.info = checks.info;

      // Prevent unnecesary information details
      await this.normalizeDetails(res, checks.details);

      // Check if has errors
      if (checks.error && Object.keys(checks.error).length) {
        res.error = checks.error;
      }
    }
  }

  protected async normalizeError(res: HealthDto, e: any) {
    // Unmount error response. An response with this if necesary
    const checksError = (e && (e as any).response) || null;

    if (checksError) {
      res.alive = false;
      res.info = checksError.info;

      // Prevent unnecesary information details
      await this.normalizeDetails(res, checksError.details);

      // Check if has errors
      if (checksError.error && Object.keys(checksError.error).length) {
        res.error = checksError.error;
      }
    }
    // Common error response
    else {
      res.alive = false;
      res.status = "error";
      res.error = `${e}`;
    }
  }

  protected async normalizeDetails(res: HealthDto, details: any | null | undefined) {
    // Prevent unnecesary information details
    if (!details) {
      return;
    }

    const normalizedDetails = Object.keys(details).reduce((acc: any, key: string) => {
      const detail = details[key];

      if (
        (isString(detail.status) && detail.status !== "up" && detail.status !== "ok") ||
        (detail.alive != null && !detail.alive)
      ) {
        acc[key] = detail;
      }
      return acc;
    }, {});

    if (Object.keys(normalizedDetails).length) {
      res.details = normalizedDetails;
      res.alive = false;
    }
  }
}
