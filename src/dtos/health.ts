//
// class
//
export class HealthDto {
  /** Indicate if micro service is alive. */
  alive: boolean;

  /** Micro service name. */
  name: string;

  /** Micro service version. */
  version: string;

  /** Environment where it is running. */
  environment: string;

  /** Indicate micro service status */
  status?: string;

  /** Includes information" */
  info?: any;

  /** Includes more details information */
  details?: any;

  /** Error information */
  error?: any;
}
