import { Module } from "@nestjs/common";
import { RestaurantTablesController } from "./controller";
import { RestaurantTablesService } from "./service";

@Module({
  controllers: [RestaurantTablesController],
  providers: [RestaurantTablesService],
  exports: [RestaurantTablesService],
})
export class RestaurantTablesModule {}
