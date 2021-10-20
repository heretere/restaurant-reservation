const knex = require("../db/connection");
const TABLE_NAME = "reservations";

/**
 * Sends query to DB to get back list of reservations
 */
const list = (reservation_date, mobile_number) => {
  let query = knex(TABLE_NAME)
    .select("*")
    .whereNot("status", "finished")
    .orderBy("reservation_time", "ASC");

  if (
    reservation_date &&
    reservation_date.length &&
    isNaN(reservation_date) &&
    !isNaN(Date.parse(reservation_date))
  ) {
    query = query.where({ reservation_date });
  }

  if (mobile_number) {
    query = query.where("mobile_number", "ilike", `%${mobile_number}%`);
  }

  return query;
};

const create = (reservation) =>
  knex(TABLE_NAME)
    .insert(reservation)
    .returning("*")
    .then((columns) => columns[0]);

const updateReservationStatus = (reservation_id, status) => {
  return knex(TABLE_NAME)
    .where({ reservation_id })
    .update({ status })
    .returning("*")
    .then((rows) => rows[0]);
};

const read = (reservation_id) =>
  knex(TABLE_NAME).where({ reservation_id }).first();

module.exports = { list, post: create, read, updateReservationStatus };
