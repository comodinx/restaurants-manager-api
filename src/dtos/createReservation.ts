import {
  IsInt,
  IsEmail,
  IsString,
  IsDefined,
  IsOptional,
  IsNumberString,
  Min,
  Matches,
  MinLength,
  ValidateIf,
} from "class-validator";
import constants from "@app/constants";

export class CreateReservationDto {
  /**
   * Unique Restaurant Identifier.
   * Example: `1`
   * Required: `true`
   */
  @IsDefined({ message: "El restaurante es requerido." })
  @IsInt({ message: "El restaurante no es válido." })
  @Min(1, { message: "El ID del restaurante debe ser mayor a 0." })
  restaurantId: number;

  /**
   * Unique Restaurant Table Identifier.
   * Example: `1`
   * Required: `true`
   */
  @IsDefined({ message: "La mesa es requerida." })
  @IsInt({ message: "La mesa no es válida." })
  @Min(1, { message: "El ID de la mesa debe ser mayor a 0." })
  tableId: number;

  /**
   * Reservation date.
   * Example: `"2024-06-06"`
   * Required: `true`
   */
  @IsDefined({ message: "La fecha de reservación es requerida." })
  @IsString({ message: "La fecha de reservación no es válida." })
  @Matches(/\d\d\d\d-\d\d-\d\d/, {
    message: `La fecha de reservación no es válida (${constants.dates.formatReservationDate}).`,
  })
  reservationDate: string;

  /**
   * Number guests.
   * Example: `1`
   * Required: `true`
   */
  @IsDefined({ message: "El ro de invitados es requerido." })
  @IsInt({ message: "El número de invitados no es válido." })
  @Min(1, { message: "El número de invitados debe ser mayor a 0." })
  numGuests: number;

  /**
   * Unique Customer Identifier.
   * Example: `1`
   * Required: `false`
   */
  @ValidateIf((self) => !self.email)
  @IsInt({ message: "El cliente no es válido." })
  @Min(1, { message: "El ID del cliente debe ser mayor a 0." })
  customerId?: number;

  /**
   * Customer email
   * Example: `"nico.molina@gmail.com"`
   * Required: `false`
   */
  @ValidateIf((self) => !self.customerId)
  @IsEmail({}, { message: "El correo electrónico no es válido." })
  email?: string;

  /**
   * Customer name
   * Example: `"Nico Molina"`
   * Required: `false`
   */
  @IsOptional()
  @MinLength(2, { message: "El nombre del cliente no es válido (min. 2 caracteres)." })
  name?: string;

  /**
   * Customer phone
   * Example: `"1112341234"`
   * Required: `false`
   */
  @IsOptional()
  @IsNumberString({}, { message: "El número de telefono no es válido." })
  phone?: string;
}
