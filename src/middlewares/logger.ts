import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { logger } from "@app/helpers/logger";
import { trues } from "@app/constants";

//
// class
//

/**
 * Log http access
 *
 * Format => :method :url :status :response-time ms - :res[content-length]
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Request properties
    const { method, originalUrl, url } = req;

    // Mark start time
    const startAt = process.hrtime();

    // Attach event to close response
    res.on("close", () => {
      const responseTime = this.getResponseTime(startAt);
      const time = responseTime ? ` ${responseTime} ms` : "";
      const status = res.statusCode ? ` ${res.statusCode}` : "";
      const realContentLength = res.getHeader("content-length");
      const contentLength = this.headersSent(res) && realContentLength ? ` - ${realContentLength}` : "";

      // Check if is necesary manual exclude health check log http access
      if (req.path === "/health") {
        return;
      }

      // Log http access
      logger.info(`${method} ${originalUrl || url}${status}${time}${contentLength || ""}`);
    });

    next();
  }

  getResponseTime(startAt: [number, number]) {
    // time elapsed from request start
    const elapsed = process.hrtime(startAt);
    // cover to milliseconds
    const ms = elapsed[0] * 1e3 + elapsed[1] * 1e-6;

    // return truncated value
    return ms.toFixed(3);
  }

  headersSent(res: Response) {
    // istanbul ignore next: node.js 0.8 support
    return typeof res.headersSent !== "boolean" ? Boolean((res as any)._header) : res.headersSent;
  }
}
