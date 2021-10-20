exports.up = function (knex) {
  return knex.schema.createTable("tables", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.integer("size").notNullable();
    table.boolean("occupied").defaultTo(false).notNullable();
    table.integer("reservation_id").notNullable();
    table
      .foreign("reservation_id")
      .references("reservation_id")
      .inTable("reservations");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tables");
};
