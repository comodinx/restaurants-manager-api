import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { LoggerMiddleware } from "./server";
import { DatabaseModule } from "./database";
import { HealthModule } from "./modules";

@Module({
  exports: [],
  controllers: [],
  imports: [
    // Database
    DatabaseModule,

    // Controllers
    HealthModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(process.env.LOGGER_ROUTES || "*");
  }
}
