import type { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const config: Record<string, Knex.Config> = {
  development: {
    client: 'pg',

    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: false,
    },

    migrations: {
      directory: './src/db/migrations',
      tableName: 'knex_migrations',
    },

    seeds: {
      directory: './src/db/seeds',
    },

    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: 'pg',

    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },

    migrations: {
      directory: './src/db/migrations',
      tableName: 'knex_migrations',
    },

    seeds: {
      directory: './src/db/seeds',
    },

    pool: {
      min: 2,
      max: 10,
    },
  },
};

export default config;
