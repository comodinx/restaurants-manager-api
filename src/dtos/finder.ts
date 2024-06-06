import { IsNumberString, IsOptional } from "class-validator";
import { GetterByIdDto } from "./getterById";

export class FinderDto extends GetterByIdDto {
  /**
   * Order registers.
   * Example: `"createdAt-DESC"`
   * Required: `false`
   * Default: `null`
   */
  @IsOptional()
  order?: string;

  /**
   * Group registers.
   * Example: `"id"`
   * Required: `false`
   * Default: `null`
   */
  @IsOptional()
  group?: string;

  /**
   * Indicate page size length.
   * Example: `10`
   * Required: `false`
   * Default: `25`
   */
  @IsOptional()
  @IsNumberString({}, { message: "El número de registros por página no es válido." })
  pageSize?: string;

  /**
   * Indicate page number.
   * Example: `1`
   * Required: `false`
   * Default: `1`
   */
  @IsOptional()
  @IsNumberString({}, { message: "El número de página no es válido." })
  page?: string;
}
