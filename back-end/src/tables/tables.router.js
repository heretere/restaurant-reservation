/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./tables.controller");

router.route("/").get(controller.list).post(controller.post);

router.route("/:tableId([0-9]+)").get(controller.read);

router.route("/:tableId([0-9]+)/seat").put(controller.assignReservation);

module.exports = router;
