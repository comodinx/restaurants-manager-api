import moment from "moment";
import { Test, TestingModule } from "@nestjs/testing";
import { it, expect, describe, afterAll, beforeAll } from "@jest/globals";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { HttpStatus, ValidationPipe } from "@nestjs/common";
import { statuses } from "../../../src/constants/reservations";
import { formatReservationDate } from "../../../src/constants/dates";
import { ReservationsModule } from "../../../src/modules/reservations";
import { mockDatabase, mockDatabaseModule } from "../../mocks";

//
// suites
//
describe("reservations", () => {
  describe("creation", () => {
    //
    // variables
    //
    let app: NestFastifyApplication;

    //
    // hooks
    //
    beforeAll(async () => {
      const testingModule: TestingModule = await Test.createTestingModule({
        imports: [mockDatabaseModule(), ReservationsModule, ReservationsModule],
      }).compile();

      app = testingModule.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
      app.useGlobalPipes(new ValidationPipe({ transform: true }));
      app.enableShutdownHooks();

      // initialize app
      await app.init();

      await mockDatabase();
    });

    afterAll(() => app.close());

    //
    // tests
    //
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

    it("should return a 400 error status code when trying to create a reservation without all necesary data", async () => {
      const reservationDate = moment().format(formatReservationDate);
      const reservation = {
        restaurantId: 1,
        tableId: 1,
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
          expect(result.statusCode).toEqual(HttpStatus.BAD_REQUEST);

          const res = JSON.parse(result.payload);

          expect(typeof res === "object").toBeTruthy();
          expect(res.message).toBeDefined();
          expect(res.message.length).toBeGreaterThanOrEqual(1);
        });
    });

    it("should return a 400 error status code with the code INVALID_RESERVATION_DATE when trying to create a reservation with a date less than today", async () => {
      const reservationDate = moment().subtract(1, "days").format(formatReservationDate);
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
          expect(result.statusCode).toEqual(HttpStatus.BAD_REQUEST);

          const res = JSON.parse(result.payload);

          expect(typeof res === "object").toBeTruthy();
          expect(res.message).toBeDefined();
          expect(res.extra).toBeDefined();
          expect(res.extra.code).toBeDefined();
          expect(res.extra.code).toEqual("INVALID_RESERVATION_DATE");
        });
    });

    it("should return a 404 error status code with the code RESTAURANT_TABLE_NOT_FOUND when trying to create a reservation with invalid table ID", async () => {
      const reservationDate = moment().format(formatReservationDate);
      const reservation = {
        restaurantId: 1,
        tableId: 9999,
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
          expect(result.statusCode).toEqual(HttpStatus.NOT_FOUND);

          const res = JSON.parse(result.payload);

          expect(typeof res === "object").toBeTruthy();
          expect(res.message).toBeDefined();
          expect(res.extra).toBeDefined();
          expect(res.extra.code).toBeDefined();
          expect(res.extra.code).toEqual("RESTAURANT_TABLE_NOT_FOUND");
        });
    });

    it("should return a 409 error status code with the code DATE_ALREADY_RESERVED when trying to create a reservation with a date already reserved", async () => {
      const reservationDate = moment().format(formatReservationDate);
      const reservation = {
        restaurantId: 1,
        tableId: 1,
        name: "Natalia Valiu",
        email: "natalia.valiu@gmail.com",
        phone: "+5491143214321",
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
          expect(result.statusCode).toEqual(HttpStatus.CONFLICT);

          const res = JSON.parse(result.payload);

          expect(typeof res === "object").toBeTruthy();
          expect(res.message).toBeDefined();
          expect(res.extra).toBeDefined();
          expect(res.extra.code).toBeDefined();
          expect(res.extra.code).toEqual("DATE_ALREADY_RESERVED");
        });
    });

    it("should return a 409 error status code with the code RESERVATION_ALREADY_EXISTS when trying to create a reservation with a date already reserved with the same customer", async () => {
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
          expect(result.statusCode).toEqual(HttpStatus.CONFLICT);

          const res = JSON.parse(result.payload);

          expect(typeof res === "object").toBeTruthy();
          expect(res.message).toBeDefined();
          expect(res.extra).toBeDefined();
          expect(res.extra.code).toBeDefined();
          expect(res.extra.code).toEqual("RESERVATION_ALREADY_EXISTS");
        });
    });

    it("should return a 412 error status code with the code INVALID_NUM_GUESTS when trying to create a reservation with a invalid num guests", async () => {
      const reservationDate = moment().format(formatReservationDate);
      const reservation = {
        restaurantId: 1,
        tableId: 1,
        name: "Nico Molina",
        email: "nico.molina@gmail.com",
        phone: "+5491112341234",
        reservationDate,
        numGuests: 8,
      };

      return app
        .inject({
          method: "POST",
          url: "/reservations",
          payload: reservation,
        })
        .then(async (result) => {
          expect(result.statusCode).toBeDefined();
          expect(result.statusCode).toEqual(HttpStatus.PRECONDITION_FAILED);

          const res = JSON.parse(result.payload);

          expect(typeof res === "object").toBeTruthy();
          expect(res.message).toBeDefined();
          expect(res.extra).toBeDefined();
          expect(res.extra.code).toBeDefined();
          expect(res.extra.code).toEqual("INVALID_NUM_GUESTS");
        });
    });
  });
});
