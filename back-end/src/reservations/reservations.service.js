const knex = require("../db/connection");
const TABLE_NAME = "reservations";

/**
 * Sends query to DB to get back list of reservations
 */
const list = (reservation_date) => {
  let query = knex(TABLE_NAME).select("*").orderBy("reservation_time", "ASC");

  if (
    reservation_date &&
    reservation_date.length &&
    isNaN(reservation_date) &&
    !isNaN(Date.parse(reservation_date))
  ) {
    query = query.where({ reservation_date });
  }

  return query;
};

const post = (reservation) =>
  knex(TABLE_NAME)
    .insert(reservation)
    .returning("*")
    .then((columns) => columns[0]);

module.exports = { list, post };
