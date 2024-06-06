import { it, expect, describe, afterAll, beforeAll } from "@jest/globals";
import { ReservationsService, CreateReservationStrategy } from "../../../src/modules/reservations";
import { mockDatabase } from "../../mocks";

//
// suites
//
describe("reservations", () => {
  describe("service", () => {
    //
    // variables
    //
    let service: ReservationsService;
    let db: any;

    //
    // hooks
    //
    beforeAll(async () => {
      service = new ReservationsService(new CreateReservationStrategy());
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
      it("should return an array with 0 reservations", async () => {
        const options = {
          page: "1",
          pageSize: "1",
        };

        const result = await service.find(options);

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toEqual(0);
      });

      it("should return an empty array", async () => {
        const options = {
          filters: "customerId eq 9999999",
        };

        const result = await service.find(options);

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toEqual(0);
      });
    });
  });
});
