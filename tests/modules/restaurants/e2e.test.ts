import { Test, TestingModule } from "@nestjs/testing";
import { it, expect, describe, afterAll, beforeAll } from "@jest/globals";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { HttpStatus } from "@nestjs/common";
import { RestaurantsModule } from "../../../src/modules/restaurants";
import { restaurants, mockDatabase, mockDatabaseModule } from "../../mocks";

//
// suites
//
describe("restaurants", () => {
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
        imports: [mockDatabaseModule(), RestaurantsModule],
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
      it("endpoint /restaurants", async () => {
        return app
          .inject({
            method: "GET",
            url: "/restaurants",
          })
          .then((result) => {
            expect(result.statusCode).toBeDefined();
            expect(result.statusCode).toEqual(HttpStatus.OK);

            const res = JSON.parse(result.payload);

            expect(Array.isArray(res)).toBeTruthy();
            expect(res.length).toEqual(restaurants.length);
            expect(res).toEqual(restaurants);
          });
      });

      it("endpoint /restaurants with pagination", async () => {
        const pageSize = 1;

        return app
          .inject({
            method: "GET",
            url: `/restaurants?page=1&pageSize=${pageSize}`,
          })
          .then((result) => {
            expect(result.statusCode).toBeDefined();
            expect(result.statusCode).toEqual(HttpStatus.OK);

            const res = JSON.parse(result.payload);

            expect(Array.isArray(res)).toBeTruthy();
            expect(res.length).toEqual(pageSize);
          });
      });
    });

    // -----------------------------------------------------------------------------

    describe("getById", () => {
      //
      // tests
      //
      it("endpoint /restaurants/1", async () => {
        return app
          .inject({
            method: "GET",
            url: "/restaurants/1",
          })
          .then((result) => {
            expect(result.statusCode).toBeDefined();
            expect(result.statusCode).toEqual(HttpStatus.OK);

            const res = JSON.parse(result.payload);

            expect(typeof res === "object").toBeTruthy();
            expect(res).toEqual(restaurants[0]);
          });
      });

      it("endpoint /restaurants/0 return 404", async () => {
        return app
          .inject({
            method: "GET",
            url: "/restaurants/0",
          })
          .then((result) => {
            expect(result.statusCode).toBeDefined();
            expect(result.statusCode).toEqual(HttpStatus.NOT_FOUND);

            const res = JSON.parse(result.payload);

            expect(res.message).toBeDefined();
            expect(res.statusCode).toBeDefined();
            expect(res.statusCode).toEqual(HttpStatus.NOT_FOUND);
          });
      });
    });
  });
});
