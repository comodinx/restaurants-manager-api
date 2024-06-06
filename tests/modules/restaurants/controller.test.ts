import { Test, TestingModule } from "@nestjs/testing";
import { it, expect, describe, beforeEach, jest } from "@jest/globals";
import { RestaurantsService, RestaurantsController } from "../../../src/modules/restaurants";
import { restaurants } from "../../mocks/database/data";

//
// constants
//
const restaurantId = "1";

//
// suites
//
describe("restaurants", () => {
  describe("controller", () => {
    //
    // variables
    //
    let controller: RestaurantsController;
    let service: RestaurantsService;

    //
    // hooks
    //
    beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        controllers: [RestaurantsController],
        providers: [
          {
            provide: RestaurantsService,
            useValue: {
              find: jest.fn(() => restaurants),
              getById: jest.fn().mockImplementation(() => restaurants[0]),
            },
          },
        ],
      }).compile();

      controller = app.get<RestaurantsController>(RestaurantsController);
      service = app.get<RestaurantsService>(RestaurantsService);
    });

    //
    // tests
    //
    describe("definition", () => {
      it("controller - should be defined", () => {
        expect(controller).toBeDefined();
      });

      it("service - should be defined", () => {
        expect(service).toBeDefined();
      });
    });

    // -----------------------------------------------------------------------------

    describe("find", () => {
      it(`should return an array with ${restaurants.length} restaurants`, async () => {
        const result = await controller.find({});

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toEqual(restaurants.length);
        expect(service.find).toHaveBeenCalled();
      });
    });

    // -----------------------------------------------------------------------------

    describe("getById", () => {
      it(`should return an object with city id [${restaurantId}]`, async () => {
        const result = await controller.getById(restaurantId, {});

        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Object);
        expect(result).toEqual(restaurants[0]);
        expect(service.getById).toHaveBeenCalled();
        expect(service.getById).toHaveBeenCalledWith(Number(restaurantId), {});
      });
    });
  });
});
