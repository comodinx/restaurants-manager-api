import { Controller, Query, Get } from "@nestjs/common";
import { HealthService } from "./service";

//
// class
//

// Controller name
@Controller("/health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  //
  // public
  //

  @Get()
  async healthCheck(@Query("include") include: string) {
    return this.healthService.check(include || "");
  }
}
