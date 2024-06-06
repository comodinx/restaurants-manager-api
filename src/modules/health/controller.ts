import { Controller, Query, Get } from "@nestjs/common";
import { HealthService } from "./service";

//
// class
//

@Controller("/health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  //
  // endpoints
  //

  @Get()
  async healthCheck(@Query("include") include: string) {
    return this.healthService.check(include || "");
  }
}
