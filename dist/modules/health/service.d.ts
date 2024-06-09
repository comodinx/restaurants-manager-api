import { HealthCheckService, SequelizeHealthIndicator } from "@nestjs/terminus";
import { HealthDto } from "@app/dtos";
export declare class HealthService {
    private readonly database;
    private readonly health;
    constructor(database: SequelizeHealthIndicator, health: HealthCheckService);
    check(include?: string): Promise<HealthDto>;
    protected resolveDatabase(include: string, indicators: any[]): Promise<void>;
    protected normalizeIndicators(res: HealthDto, indicators: any[]): Promise<void>;
    protected normalizeError(res: HealthDto, e: any): Promise<void>;
    protected normalizeDetails(res: HealthDto, details: any | null | undefined): Promise<void>;
}
