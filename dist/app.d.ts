import { INestApplication } from "@nestjs/common";
export declare class App {
    bootstrap(): Promise<INestApplication>;
    setupMiddlewares(app: INestApplication): INestApplication;
    listen(app: INestApplication): Promise<INestApplication>;
    log(app: INestApplication): Promise<void>;
}
