/// <reference types="cookie-parser" />
import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
export declare class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
    getResponseTime(startAt: [number, number]): string;
    headersSent(res: Response): boolean;
}
