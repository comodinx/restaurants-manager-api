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
} from "class-validator";

export class CreateReservationDto {
  /**
   * Unique Restaurant Identifier.
   * Example: `1`
   * Required: `true`
   */
  @IsDefined()
  @IsInt({ message: "El restaurante no es válido." })
  @Min(1, { message: "El restaurante no es válido." })
  restaurantId: number;

  /**
   * Unique Restaurant Table Identifier.
   * Example: `1`
   * Required: `true`
   */
  @IsDefined()
  @IsInt({ message: "La mesa no es válida." })
  @Min(1, { message: "La mesa no es válida." })
  tableId: number;

  /**
   * Restaurant date.
   * Example: `"2024-06-06"`
   * Required: `true`
   */
  @IsDefined()
  @IsString({ message: "La fecha de reservación no es válida." })
  @Matches(/\d\d\d\d-\d\d-\d\d/, { message: "La fecha de reservación no es válida (YYYY-MM-DD)." })
  reservationDate: string;

  /**
   * Number guests.
   * Example: `1`
   * Required: `true`
   */
  @IsDefined()
  @IsInt({ message: "El número de invitados no es válido." })
  @Min(1, { message: "El número de invitados no es válido." })
  numGuests: number;

  /**
   * Unique Customer Identifier.
   * Example: `1`
   * Required: `false`
   */
  @IsOptional()
  @IsInt()
  @Min(1, { message: "El cliente no es válido." })
  customerId?: number;

  /**
   * Customer name
   * Example: `"Nico Molina"`
   * Required: `false`
   */
  @IsOptional()
  @MinLength(2, { message: "El nombre del cliente no es válido (min. 2 caracteres)." })
  name?: string;

  /**
   * Customer email
   * Example: `"nico.molina@gmail.com"`
   * Required: `false`
   */
  @IsOptional()
  @IsEmail({}, { message: "El correo electrónico no es válido." })
  email?: string;

  /**
   * Customer phone
   * Example: `"1112341234"`
   * Required: `false`
   */
  @IsOptional()
  @IsNumberString({}, { message: "El número de telefono no es válido." })
  phone?: string;
}
