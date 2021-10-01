const service = require("./reservations.service");

// Middleware validation

const validateReservation = (req, res, next) => {
  const {
    data: {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    } = {},
  } = req.body;

  if (!first_name || !first_name.length) {
    return next({ status: 400, message: `Invalid first_name: ${first_name}` });
  }

  if (!last_name || !last_name.length) {
    return next({ status: 400, message: `Invalid last_name: ${last_name}` });
  }

  if (!mobile_number || !mobile_number.length) {
    return next({
      status: 400,
      message: `Invalid mobile_number: ${mobile_number}`,
    });
  }

  if (
    !reservation_date ||
    !reservation_date.length ||
    !isNaN(reservation_date) ||
    isNaN(Date.parse(reservation_date))
  ) {
    return next({
      status: 400,
      message: `Invalid reservation_date: ${reservation_date}`,
    });
  }

  if (
    !reservation_time ||
    !/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(reservation_time)
  ) {
    return next({
      status: 400,
      message: `Invalid reservation_time: ${reservation_time}`,
    });
  }

  const dateNumber = Date.parse(`${reservation_date}T${reservation_time}`);
  const date = new Date(dateNumber);
  const timeNumber = Number(
    `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }`
  );
  if (dateNumber < Date.now()) {
    return next({
      status: 400,
      message: `Reservation date/time must occur in the future`,
    });
  }

  if (date.getDay() === 2) {
    return next({
      status: 400,
      message: `The restaurant is closed on Tuesday`,
    });
  }

  if (timeNumber < 1030 || timeNumber > 2130) {
    return next({
      status: 400,
      message: `Time need to be between 10:30 and 21:30`,
    });
  }

  if (typeof people !== "number" || people < 1) {
    return next({
      status: 400,
      message: `Invalid people: ${people}`,
    });
  }

  return next();
};

/**
 * List handler for reservation resources
 */
const list = (req, res, next) => {
  const { date } = req.query;

  service
    .list(date)
    .then((data) => res.json({ data }))
    .catch(next);
};

/**
 * Add new reservation to reservations
 */
const post = (req, res, next) => {
  service
    .post(req.body.data)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
};

module.exports = {
  list: list,
  post: [validateReservation, post],
};
