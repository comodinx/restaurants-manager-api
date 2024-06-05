import { HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { healthPath } from "../../../src/constants/server";
import { HealthModule } from "../../../src/modules";

//
// suites
//
describe("health", () => {
  describe("e2e", () => {
    //
    // variables
    //
    let app: NestFastifyApplication;

    //
    // hooks
    //
    beforeAll(async () => {
      const testingModule: TestingModule = await Test.createTestingModule({
        imports: [HealthModule],
      }).compile();

      app = testingModule.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
      app.enableShutdownHooks();

      // initialize app
      await app.init();
    });

    afterAll(() => app.close());

    //
    // tests
    //
    it(`health check - endpoint ${healthPath}`, async () => {
      return app
        .inject({
          method: "GET",
          url: healthPath,
        })
        .then((result) => {
          expect(result.statusCode).toBeDefined();
          expect(result.statusCode).toEqual(HttpStatus.OK);

          const res = JSON.parse(result.payload);

          expect(typeof res === "object").toBeTruthy();
          expect(res.alive).toBeTruthy();
          expect(res.name).toBeDefined();
          expect(res.version).toBeDefined();
          expect(res.environment).toBeDefined();
        });
    });
  });
});
