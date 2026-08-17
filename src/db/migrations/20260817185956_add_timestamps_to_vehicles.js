/**
 * @param {import('knex').Knex} knex
 */
exports.up = function (knex) {
  return knex.schema.alterTable("vehicles", function (table) {
    table.timestamps(true, true);
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = function (knex) {
  return knex.schema.alterTable("vehicles", function (table) {
    table.dropColumn("created_at");
    table.dropColumn("updated_at");
  });
};
