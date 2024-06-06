import { it, expect, describe, afterAll, beforeAll } from "@jest/globals";
import { RestaurantsService, GetAvailabilityByIdStrategy } from "../../../src/modules/restaurants";
import { restaurants, mockDatabase } from "../../mocks";

//
// constants
//
const restaurantId = 1;

//
// suites
//
describe("restaurants", () => {
  describe("service", () => {
    //
    // variables
    //
    let service: RestaurantsService;
    let db: any;

    //
    // hooks
    //
    beforeAll(async () => {
      service = new RestaurantsService(new GetAvailabilityByIdStrategy());
    });

    //
    // hooks
    //
    beforeAll(async () => {
      db = await mockDatabase();
    });

    afterAll(async () => {
      await db.truncate();
    });

    //
    // tests
    //
    describe("definition", () => {
      it("service - should be defined", () => {
        expect(service).toBeDefined();
      });
    });

    // -----------------------------------------------------------------------------

    describe("find", () => {
      //
      // tests
      //
      it("should return an array with 2 restaurants", async () => {
        const options = {
          page: "1",
          pageSize: "1",
        };

        const result = await service.find(options);

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toEqual(Number(options.pageSize));
      });

      it("should return an empty array", async () => {
        const options = {
          filters: "description eq suscripcion-de-nombre-desconocido",
        };

        const result = await service.find(options);

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toEqual(0);
      });
    });

    // -----------------------------------------------------------------------------

    describe("getById", () => {
      //
      // tests
      //
      it("should return an object", async () => {
        const result: any = await service.getById(restaurantId, {});

        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Object);
        expect(result.id).toEqual((restaurants[0] as any).id);
      });

      it("should return a null result", async () => {
        const result = await service.getById(0, {});

        expect(result).toBeNull();
      });
    });
  });
});
