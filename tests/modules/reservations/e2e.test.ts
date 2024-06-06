import { Test, TestingModule } from "@nestjs/testing";
import { it, expect, describe, afterAll, beforeAll } from "@jest/globals";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { HttpStatus } from "@nestjs/common";
import { ReservationsModule } from "../../../src/modules/reservations";
import { mockDatabase, mockDatabaseModule } from "../../mocks";

//
// suites
//
describe("reservations", () => {
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
        imports: [mockDatabaseModule(), ReservationsModule],
      }).compile();

      app = testingModule.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
      app.enableShutdownHooks();

      // initialize app
      await app.init();

      await mockDatabase();
    });

    afterAll(() => app.close());

    describe("find", () => {
      //
      // tests
      //
      it("endpoint /reservations", async () => {
        return app
          .inject({
            method: "GET",
            url: "/reservations",
          })
          .then((result) => {
            expect(result.statusCode).toBeDefined();
            expect(result.statusCode).toEqual(HttpStatus.OK);

            const res = JSON.parse(result.payload);

            expect(Array.isArray(res)).toBeTruthy();
            expect(res.length).toEqual(0);
          });
      });

      it("endpoint /reservations with pagination", async () => {
        const pageSize = 1;

        return app
          .inject({
            method: "GET",
            url: `/reservations?page=1&pageSize=${pageSize}`,
          })
          .then((result) => {
            expect(result.statusCode).toBeDefined();
            expect(result.statusCode).toEqual(HttpStatus.OK);

            const res = JSON.parse(result.payload);

            expect(Array.isArray(res)).toBeTruthy();
            expect(res.length).toEqual(0);
          });
      });
    });
  });
});
