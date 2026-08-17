/**
 * @param {import('knex').Knex} knex
 */
exports.up = function (knex) {
  return knex.schema.createTable("staff", function (table) {
    table.increments("id").primary();

    table.string("name").notNullable();

    table.string("email").notNullable().unique();

    table.string("password_hash").notNullable();

    table.timestamps(true, true);
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("staff");
};
