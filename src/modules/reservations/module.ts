import { Module } from "@nestjs/common";
import { ReservationsController } from "./controller";
import { ReservationsService } from "./service";
import { CreateReservationStrategy } from "./strategies";

@Module({
  controllers: [ReservationsController],
  providers: [
    // services
    ReservationsService,

    // strategies
    CreateReservationStrategy,
  ],
  exports: [ReservationsService],
})
export class ReservationsModule {}
