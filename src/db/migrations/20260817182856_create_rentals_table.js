/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('rentals', function (table) {
    table.increments('id').primary();

    table
      .integer('vehicle_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('vehicles')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');

    table.string('customer_name').notNullable();
    table.string('customer_phone').notNullable();

    table.date('start_date').notNullable();
    table.date('end_date').notNullable();

    table.decimal('total_amount').notNullable();

    table
      .enu('status', ['booked', 'ongoing', 'completed', 'cancelled'])
      .notNullable()
      .defaultTo('booked');

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('rentals');
};
