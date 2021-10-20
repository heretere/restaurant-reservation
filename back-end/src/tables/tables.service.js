const knex = require("../db/connection");
const TABLE_NAME = "tables";

/**
 * Return list of tables ordered by their name
 */
const list = () => {
  return knex(TABLE_NAME).select("*").orderBy("table_name");
};

/**
 * Add table to database
 */
const create = (table) => {
  return knex(TABLE_NAME)
    .insert(table)
    .returning("*")
    .then((rows) => rows[0]);
};

/**
 * Retrieve table from database
 */
const read = (table_id) => {
  return knex(TABLE_NAME).where({ table_id }).first();
};

/**
 * Update reservation on a specific table
 */
const updateReservation = (table_id, reservation_id) => {
  return knex(TABLE_NAME)
    .where({ table_id })
    .update({ reservation_id })
    .returning("*")
    .then((rows) => rows[0]);
};

module.exports = { list, create, read, updateReservation };
