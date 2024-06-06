import { Module } from "@nestjs/common";
import { RestaurantsController } from "./controller";
import { RestaurantsService } from "./service";
import { RestaurantTablesModule } from "./tables";
import { GetAvailabilityByIdStrategy } from "./strategies";

@Module({
  imports: [RestaurantTablesModule],
  controllers: [RestaurantsController],
  providers: [
    // services
    RestaurantsService,

    // strategies
    GetAvailabilityByIdStrategy,
  ],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}
