import helmet from "helmet";
import cookieParser from "cookie-parser";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe, INestApplication } from "@nestjs/common";
import { ExceptionsFilter } from "./server";
import { AppModule } from "./app.module";
import { logger } from "./helpers/logger";
import constants from "./constants";

export class App {
  async bootstrap() {
    // 01. Create nest application with factory strategy
    const app = await NestFactory.create(AppModule);

    // 02. Setup middlewares
    this.setupMiddlewares(app);

    // 03. Listen application
    await this.listen(app);

    // 04. Log necesary information
    this.log(app);

    return app;
  }

  setupMiddlewares(app: INestApplication) {
    // Exception handler
    app.useGlobalFilters(new ExceptionsFilter());

    // Helmet
    const directives = helmet.contentSecurityPolicy.getDefaultDirectives();

    delete directives["upgrade-insecure-requests"];
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives,
        },
      })
    );

    // Cookies parser
    app.use(cookieParser());

    // Pipes
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    // CORS
    app.enableCors();

    return app;
  }

  async listen(app: INestApplication) {
    await app.listen(constants.server.port);
    return app;
  }

  async log(app: INestApplication) {
    const url = await app.getUrl();

    logger.info(`Restaurant Manager API v${constants.app.version}`);
    logger.info(`Application is running on: ${url}`);
  }
}
