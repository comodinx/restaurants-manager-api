import { Module } from "@nestjs/common";
import { RestaurantsController } from "./controller";
import { RestaurantsService } from "./service";
import { RestaurantTablesModule } from "./tables";

@Module({
  imports: [RestaurantTablesModule],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}
