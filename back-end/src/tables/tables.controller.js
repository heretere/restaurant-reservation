const service = require("./tables.service");
const reservationService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Middleware validation

const validateTable = (req, res, next) => {
  const { data: { table_name, capacity, reservation_id } = {} } = req.body;

  if (!table_name || table_name.length < 2) {
    return next({ status: 400, message: `Invalid table_name: ${table_name}` });
  }

  if (typeof capacity !== "number" || capacity < 1) {
    return next({ status: 400, message: `Invalid capacity: ${capacity}` });
  }

  res.locals.table = { table_name, capacity, reservation_id };

  return next();
};

const tableExists = (req, res, next) => {
  const { tableId } = req.params;

  service
    .read(tableId)
    .then((table) => {
      if (!table)
        return next({ status: 404, message: `no table with id ${tableId}.` });

      res.locals.table = table;
      return next();
    })
    .catch(next);
};

const validateReservation = (req, res, next) => {
  const { data: { reservation_id } = {} } = req.body;

  if (!reservation_id) {
    return next({
      status: 400,
      message: `Invalid reservation_id: ${reservation_id}.`,
    });
  }

  reservationService
    .read(reservation_id)
    .then((reservation) => {
      if (!reservation)
        return next({
          status: 404,
          message: `no reservation with id ${reservation_id}.`,
        });
      res.locals.reservation = reservation;
      return next();
    })
    .catch(next);
};

const validateTableSeating = (req, res, next) => {
  const { table, reservation } = res.locals;

  if (table.reservation_id) {
    return next({
      status: 400,
      message: `${table.table_id} is occupied.`,
    });
  }

  if (reservation.people > table.capacity) {
    return next({
      status: 400,
      message: `${table.table_id} can't hold that many people. (capacity: ${table.capacity})`,
    });
  }

  if (reservation.status !== "booked") {
    return next({
      status: 400,
      message: `${reservation.reservation_id} has already been seated.`,
    });
  }

  return next();
};

const validateTableOccupied = (req, res, next) => {
  const { table } = res.locals;

  if (!table.reservation_id) {
    return next({
      status: 400,
      message: `${table.table_id} is not occupied.`,
    });
  }

  return next();
};

/**
 * List tables
 */
const list = (req, res, next) => {
  service
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
};

/**
 * Create new table
 */
const post = (req, res, next) => {
  service
    .create(res.locals.table)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
};

/**
 * Get specific table
 */
const read = (req, res) => {
  res.json({ data: res.locals.table });
};

const assignReservation = (req, res, next) => {
  const {
    table: { table_id },
    reservation: { reservation_id },
  } = res.locals;

  service
    .updateReservation(table_id, reservation_id)
    .then(async (data) => {
      await reservationService.updateReservationStatus(
        reservation_id,
        "seated"
      );
      return data;
    })
    .then((data) => res.json({ data }))
    .catch(next);
};

const unAssignReservation = (req, res, next) => {
  const {
    table: { table_id, reservation_id },
  } = res.locals;

  service
    .updateReservation(table_id, null)
    .then(async (data) => {
      await reservationService.updateReservationStatus(
        reservation_id,
        "finished"
      );
      return data;
    })
    .then((data) => res.json({ data }))
    .catch(next);
};

module.exports = {
  list: asyncErrorBoundary(list),
  post: [validateTable, asyncErrorBoundary(post)],
  read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
  assignReservation: [
    tableExists,
    asyncErrorBoundary(validateReservation),
    validateTableSeating,
    asyncErrorBoundary(assignReservation),
  ],
  deleteReservation: [
    asyncErrorBoundary(tableExists),
    validateTableOccupied,
    asyncErrorBoundary(unAssignReservation),
  ],
};
