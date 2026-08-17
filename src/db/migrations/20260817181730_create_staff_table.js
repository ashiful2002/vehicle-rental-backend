/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("vehicles", function (table) {
    table.increments("id").primary();

    table.string("name").notNullable();

    table.string("plate_number").notNullable().unique();

    table.enu("category", ["sedan", "suv", "van", "truck"]).notNullable();

    table.decimal("daily_rate", 10, 2).notNullable();

    table.string("photo_path").nullable();

    table.timestamp("deleted_at").nullable();

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("vehicles");
};
