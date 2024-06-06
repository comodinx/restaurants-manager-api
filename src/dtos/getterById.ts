import { IsOptional } from "class-validator";

export class GetterByIdDto {
  /**
   * Filters condition.
   * Example: `"categoryId eq 1,description li *cerveza*"`
   * Required: `false`
   * Default: `null`
   */
  @IsOptional()
  filters?: string;

  /**
   * Fields.
   * Example: `"*"`
   * Required: `false`
   * Default: `null`
   */
  @IsOptional()
  fields?: string;

  /**
   * Include relationships (Format, relation).
   * Example: `"status"`
   * Required: `false`
   * Default: `null`
   */
  @IsOptional()
  include?: string;
}
