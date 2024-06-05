import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { LoggerMiddleware } from "./middlewares";
import { HealthModule } from "./modules";

@Module({
  exports: [],
  controllers: [],
  imports: [
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
