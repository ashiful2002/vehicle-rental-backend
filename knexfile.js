require('dotenv').config();

/** @type {import("knex").Knex.Config} */
const config = {
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

    pool: {
      min: 2,
      max: 10,
    },
  },
};

module.exports = config;
