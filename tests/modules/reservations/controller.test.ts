import { Test, TestingModule } from "@nestjs/testing";
import { it, expect, describe, beforeEach, jest } from "@jest/globals";
import { ReservationsService, ReservationsController } from "../../../src/modules/reservations";

//
// suites
//
describe("reservations", () => {
  describe("controller", () => {
    //
    // variables
    //
    let controller: ReservationsController;
    let service: ReservationsService;

    //
    // hooks
    //
    beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        controllers: [ReservationsController],
        providers: [
          {
            provide: ReservationsService,
            useValue: {
              find: jest.fn(() => []),
            },
          },
        ],
      }).compile();

      controller = app.get<ReservationsController>(ReservationsController);
      service = app.get<ReservationsService>(ReservationsService);
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
      it(`should return an array with ${0} reservations`, async () => {
        const result = await controller.find({});

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toEqual(0);
        expect(service.find).toHaveBeenCalled();
      });
    });
  });
});
