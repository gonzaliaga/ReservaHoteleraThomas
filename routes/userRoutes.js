const express = require("express");
const bookingController = require("../controllers/controller");

const router = express.Router();

router.post("/reserva", bookingController.createBooking);
router.get("/reserva", bookingController.getBooking);
router.get("/reserva", bookingController.getBookingInfo);
router.get("/reserva/:id", bookingController.getBookingById);
router.put("/reserva/:id", bookingController.upDateBookingById);
router.delete("/reserva/:id", bookingController.deleteBookingById);

module.exports = router;
// api/booking = api/reservas