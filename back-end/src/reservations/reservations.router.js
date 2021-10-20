/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");

router.route("/").get(controller.list).post(controller.post);

router.route("/:reservationId/status").put(controller.updateStatus);

router.route("/:reservationId").get(controller.read);

module.exports = router;
