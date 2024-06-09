import { HealthService } from "./service";
export declare class HealthController {
    private readonly healthService;
    constructor(healthService: HealthService);
    healthCheck(include: string): Promise<import("../../dtos").HealthDto>;
}
