import * as entities from "../../../src/entities";
import { mockDatabase as MockDatabase, mockDatabaseModule as MockDatabaseModule } from "./mock";
import { restaurants, restaurantTables, reservationStatuses } from "./data";

//
// constants
//
const listEntitiesData = [
  { entity: entities.Restaurant, data: restaurants },
  { entity: entities.RestaurantTable, data: restaurantTables },
  { entity: entities.ReservationStatus, data: reservationStatuses },
  { entity: entities.Reservation, data: [] },
  { entity: entities.Customer, data: [] },
];

//
// public
//

/**
 * Emulate database module
 */
export const mockDatabaseModule = async () => MockDatabaseModule(Object.values(entities));

/**
 * Emulate database instance object
 *
 * @param initializeBaseData {boolean} Indicate if is necesary insert base data
 *
 * @return Sequelize instance
 */
export const mockDatabase = async (initializeBaseData = true) =>
  MockDatabase(initializeBaseData, listEntitiesData);
