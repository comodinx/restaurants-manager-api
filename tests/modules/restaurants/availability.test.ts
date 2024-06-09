import moment from "moment";
import { Test, TestingModule } from "@nestjs/testing";
import { it, expect, describe, afterAll, beforeAll } from "@jest/globals";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { HttpStatus } from "@nestjs/common";
import { statuses } from "../../../src/constants/reservations";
import { formatReservationDate } from "../../../src/constants/dates";
import { RestaurantsModule } from "../../../src/modules/restaurants";
import { ReservationsModule } from "../../../src/modules/reservations";
import { restaurantTables, mockDatabase, mockDatabaseModule } from "../../mocks";

//
// suites
//
describe("restaurants", () => {
  describe("availavility", () => {
    //
    // variables
    //
    let app: NestFastifyApplication;

    //
    // hooks
    //
    beforeAll(async () => {
      const testingModule: TestingModule = await Test.createTestingModule({
        imports: [mockDatabaseModule(), ReservationsModule, RestaurantsModule],
      }).compile();

      app = testingModule.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
      app.enableShutdownHooks();

      // initialize app
      await app.init();

      await mockDatabase();
    });

    afterAll(() => app.close());

    //
    // tests
    //
    it(`should return ${restaurantTables.length} tables available for the requested restaurant`, async () => {
      const startDate = moment().format(formatReservationDate);

      return app
        .inject({
          method: "GET",
          url: "/restaurants/1/availability",
          query: {
            startDate,
          },
        })
        .then((result) => {
          expect(result.statusCode).toBeDefined();
          expect(result.statusCode).toEqual(HttpStatus.OK);

          const res = JSON.parse(result.payload);

          expect(typeof res === "object").toBeTruthy();
          expect(res.timelines).toBeDefined();
          expect(res.timelines[startDate]).toBeDefined();
          expect(res.timelines[startDate].length).toEqual(restaurantTables.length);
        });
    });

    it(`should return ${restaurantTables.length} tables available for the requested restaurant in selected range dates`, async () => {
      const startDate = moment().format(formatReservationDate);
      const endDate = moment(startDate).add(4, "days").format(formatReservationDate);

      return app
        .inject({
          method: "GET",
          url: "/restaurants/1/availability",
          query: {
            startDate,
            endDate,
          },
        })
        .then((result) => {
          expect(result.statusCode).toBeDefined();
          expect(result.statusCode).toEqual(HttpStatus.OK);

          const res = JSON.parse(result.payload);

          expect(typeof res === "object").toBeTruthy();

          expect(res.timelines).toBeDefined();
          expect(res.timelines[startDate]).toBeDefined();
          expect(res.timelines[startDate].length).toEqual(restaurantTables.length);
          expect(res.timelines[endDate]).toBeDefined();
          expect(res.timelines[endDate].length).toEqual(restaurantTables.length);
          expect(Object.keys(res.timelines).length).toEqual(5);
        });
    });

    it("should return the object of the reservation, when the same is made", async () => {
      const reservationDate = moment().format(formatReservationDate);
      const reservation = {
        restaurantId: 1,
        tableId: 1,
        name: "Nico Molina",
        email: "nico.molina@gmail.com",
        phone: "+5491112341234",
        reservationDate,
        numGuests: 2,
      };

      return app
        .inject({
          method: "POST",
          url: "/reservations",
          payload: reservation,
        })
        .then(async (result) => {
          expect(result.statusCode).toBeDefined();
          expect(result.statusCode).toEqual(HttpStatus.CREATED);

          const res = JSON.parse(result.payload);

          expect(typeof res === "object").toBeTruthy();
          expect(res.id).toBeDefined();
          expect(res.customerId).toBeDefined();
          expect(res.statusId).toBeDefined();
          expect(res.statusId).toEqual(statuses.reserved);
          expect(res.reservationDate).toBeDefined();
          expect(res.reservationDate).toContain(reservation.reservationDate);
          expect(res.numGuests).toBeDefined();
          expect(res.numGuests).toEqual(reservation.numGuests);
        });
    });

    it(`should return ${
      restaurantTables.length - 1
    } tables available for the requested restaurant, because the selected day has one reservation`, async () => {
      const reservationDate = moment().format(formatReservationDate);

      return app
        .inject({
          method: "GET",
          url: "/restaurants/1/availability",
          query: {
            startDate: reservationDate,
          },
        })
        .then((result) => {
          expect(result.statusCode).toBeDefined();
          expect(result.statusCode).toEqual(HttpStatus.OK);

          const res = JSON.parse(result.payload);

          expect(typeof res === "object").toBeTruthy();
          expect(res.timelines).toBeDefined();
          expect(res.timelines[reservationDate]).toBeDefined();
          expect(res.timelines[reservationDate].length).toEqual(restaurantTables.length - 1);
        });
    });

    it(`should return ${
      restaurantTables.length - 1
    } tables available for the requested restaurant, because the selected day has one reservation, in selected range date`, async () => {
      const reservationDate = moment().format(formatReservationDate);
      const startDate = reservationDate;
      const endDate = moment(startDate).add(4, "days").format(formatReservationDate);

      return app
        .inject({
          method: "GET",
          url: "/restaurants/1/availability",
          query: {
            startDate,
            endDate,
          },
        })
        .then((result) => {
          expect(result.statusCode).toBeDefined();
          expect(result.statusCode).toEqual(HttpStatus.OK);

          const res = JSON.parse(result.payload);

          expect(typeof res === "object").toBeTruthy();

          expect(res.timelines).toBeDefined();
          expect(res.timelines[startDate]).toBeDefined();
          expect(res.timelines[startDate].length).toEqual(restaurantTables.length - 1);
          expect(res.timelines[endDate]).toBeDefined();
          expect(res.timelines[endDate].length).toEqual(restaurantTables.length);
          expect(Object.keys(res.timelines).length).toEqual(5);
        });
    });
  });
});
