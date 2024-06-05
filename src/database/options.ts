import { Dialect } from "sequelize/types/sequelize";
import { Injectable } from "@nestjs/common";
import { SequelizeOptionsFactory, SequelizeModuleOptions } from "@nestjs/sequelize";
import { trues } from "@app/constants";

/** Indicate if Database debug queries is enabled */
const isDatabaseDebug = trues.includes(String(process.env.DB_DEBUG).toLowerCase());

/** Indicate if autodiscover models */
const isAutodiscover = trues.includes(String(process.env.DB_AUTODISCOVER).toLowerCase());

/** Indicate if Database Pool is enabled */
const isPoolEnabled = trues.includes(String(process.env.DB_POOL_ENABLED).toLowerCase());

/** Indicate if Database synchronization is enabled */
const synchronize = trues.includes(String(process.env.DB_SYNCHRONIZE).toLowerCase());

/**
 * Database default options
 */
@Injectable()
export class DatabaseOptions implements SequelizeOptionsFactory {
  public createSequelizeOptions(): SequelizeModuleOptions {
    const defaultHost = process.env.DB_HOST || "localhost";
    const defaultPort = +(process.env.DB_PORT || 3306);
    const defaultUser = process.env.DB_USER || "root";
    const defaultName = process.env.DB_NAME || "laikapp";
    const defaultPass = process.env.DB_PASS || "secret";
    const defaultTimezone = process.env.DB_TIMEZONE || "+00:00";
    const models = [];
    let pool;

    if (isPoolEnabled) {
      // Maximum number of connection in pool
      const poolMax = +(process.env.DB_POOL_MAX_CONN || 10);
      // Minimum number of connection in pool
      const poolMin = +(process.env.DB_POOL_MIN_CONN || 0);
      // The maximum time, in milliseconds, that a connection can be idle before being released
      const poolIdle = +(process.env.DB_POOL_IDLE || 10000);
      // The maximum time, in milliseconds, that pool will try to get connection before throwing error
      const poolAcquire = +(process.env.DB_POOL_ACQUIRE || 60000);
      // The time interval, in milliseconds, after which sequelize-pool will remove idle connections.
      const poolEvict = +(process.env.DB_POOL_EVICT || 1000);

      pool = {
        max: poolMax,
        min: poolMin,
        idle: poolIdle,
        acquire: poolAcquire,
        evict: poolEvict,
      };
    }

    if (isAutodiscover) {
      models.push(
        process.env.DB_ENTITIES_DIR || `${process.cwd()}/!(node_modules)/entities/!(index).js`
      );
    }

    return {
      database: defaultName,
      dialect: (process.env.DB_DIALECT || "mysql") as Dialect,
      // eslint-disable-next-line no-console
      logging: isDatabaseDebug ? console.log : false,
      timezone: defaultTimezone,
      autoLoadModels: true,
      synchronize,
      models,
      replication: {
        read: [
          {
            host: process.env.DB_READ_HOST || defaultHost,
            port: +(process.env.DB_READ_PORT || defaultPort),
            username: process.env.DB_READ_USER || defaultUser,
            password: process.env.DB_READ_PASS || defaultPass,
          },
        ],
        write: {
          host: process.env.DB_WRITE_HOST || defaultHost,
          port: +(process.env.DB_WRITE_PORT || defaultPort),
          username: process.env.DB_WRITE_USER || defaultUser,
          password: process.env.DB_WRITE_PASS || defaultPass,
        },
      },
      define: {
        timestamps: false,
      },
      dialectOptions: {
        decimalNumbers: true,
      },
      pool,
    };
  }
}
