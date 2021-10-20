/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");

router.route("/").get(controller.list).post(controller.post);

router.route("/:reservationId([0-9]+)").get(controller.read);

module.exports = router;
