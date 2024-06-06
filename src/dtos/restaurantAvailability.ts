import { IsString, IsDefined, IsOptional, IsNumberString, Matches, IsIn } from "class-validator";
import constants from "@app/constants";

export class RestaurantAvailabilityDto {
  /**
   * Reservation date start.
   * Example: `"2024-06-06"`
   * Required: `true`
   */
  @IsDefined()
  @IsString({ message: "La fecha de inicio no es válida." })
  @Matches(/\d\d\d\d-\d\d-\d\d/, {
    message: `La fecha de inicio no es válida (${constants.dates.formatReservationDate}).`,
  })
  startDate: string;

  /**
   * Reservation date end.
   * Example: `"2024-06-06"`
   * Required: `true`
   */
  @IsOptional()
  @IsString({ message: "La fecha de fin no es válida." })
  @Matches(/\d\d\d\d-\d\d-\d\d/, {
    message: `La fecha de fin no es válida (${constants.dates.formatReservationDate}).`,
  })
  endDate?: string;

  /**
   * Number guests.
   * Example: `1`
   * Required: `true`
   */
  @IsOptional()
  @IsNumberString({}, { message: "El número de invitados no es válido." })
  numGuests?: string;

  /**
   * Flag for indicate if include restaurant on response
   * Example: `true`
   * Required: `true`
   */
  @IsOptional()
  @IsIn(constants.booleans)
  includeRestaurant?: string;

  /**
   * Flag for indicate if include those not availables on response
   * Example: `true`
   * Required: `true`
   */
  @IsOptional()
  @IsIn(constants.booleans)
  includeNotAvailables?: string;
}
