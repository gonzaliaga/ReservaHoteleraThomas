const Booking = require("../models/model");
const dayjs = require("dayjs");
const { v4: uuidv4} = require("uuid");


let bookings = [];

// Crear una Reserva. POST /api/booking 
exports.createBooking = async (req, res) => {
  const { nameHotel ,arrivalDate, departureDate, typeRoom, passengers, name, mail, paymentStatus } =
    req.body;
    
    // Verificar el contenido de req.body
    console.log("Datos recibidos:", req.body);

    // Validar que las fechas arrivalDate y departureDate sean válidas.

    if (!arrivalDate || !departureDate) {
      return res.status(400).json ({
        msg: "Faltan fecha de llegada o de salida.",
      })
    }

  const parsedArrivalDate = dayjs(arrivalDate).format("DD/MM/YYYY");
  const parsedDepartureDate = dayjs(departureDate).format("DD/MM/YYYY");

    // Verificar las fechas convertidas 
    console.log("Fecha de llegada: ", parsedArrivalDate);
    console.log("Fecha de Salida: ", parsedDepartureDate);

    // Crear la nueva Reserva

  const newBooking = new Booking(
    uuidv4(),
    nameHotel,
    parsedArrivalDate,
    parsedDepartureDate,
    passengers,
    typeRoom,
    name,
    mail,
    paymentStatus
  );
  bookings.push(newBooking);
  console.log("Reservas:", bookings);

  res.json({
    msg: "Reserva creada con éxito.",
    data: newBooking,
  });
};

// Recupera una lista de todas las Reservas. GET /api/booking 
exports.getBooking = async (req, res) => {
  
    return res.json({
      msg: "Reservas",
      data: bookings
    });
 
  };

// Recupera los detalles de una reserva específica. GET /api/booking/:id 
exports.getBookingById= async (req, res) => {
  const bookingId = req.params.id;
  const booking = bookings.find(booking => booking.id === bookingId );

  if (!booking) {
    return res.status(404).json({ msg: "Reserva no encontrada." })
  }
  return res.json({
    msg: 'Reserva obtenida con éxito.',
    data: booking
})
}

// Actualiza los detalles de una reserva existente. PUT /api/booking/:id 
exports.upDateBookingById = async (req, res) => {
  const bookingId = req.params.id;
  const bookingIndex = bookings.findIndex(booking => booking.id === bookingId);

  if (bookingIndex === -1){
      return res.status(404).json({ msg: "Reserva no encontrada." })
  }

  bookings[bookingIndex] = { ...bookings[bookingIndex], ...req.body} // spread

  return res.json({
      msg: 'Reserva modificada con éxito.',
      data: bookings[bookingIndex]
  })
}

// Elimina una reserva del sistema buscada desde el id. DELETE /api/booking/:id 
exports.deleteBookingById = async (req, res) => {
  const bookingId = req.params.id;
  const bookingIndex = bookings.findIndex(booking => booking.id === bookingId);

  if (bookingIndex === -1){
      return res.status(404).json({ msg: "Reserva no encontrada." })
  }

 bookings.splice(bookingIndex,1)

  return res.json({
      msg: 'Reserva eliminada con éxito.',
  })

};

// Buesquedas segun distintas peticiones 
// 01. "Como gerente de una cadena de hoteles, quiero ver todas las reservas para el "Hotel Paraíso" para el próximo mes."/api/reservas?hotel=HOTEL 
// 02. "Como gerente del hotel, quiero ver todas las reservas para la semana de Navidad para poder planificar el personal y las actividades necesarias." /api/reservas?fecha_inicio=FECHA_INICIO&fecha_fin=FECHA_FIN
// 03. "Como gerente del hotel, quiero ver todas las reservas para nuestras suites de lujo para el próximo mes para asegurarme de que todo esté en perfectas condiciones para nuestros huéspedes VIP." /api/reservas?tipo_habitacion=TIPO_HABITACION
// 04. "Como gerente del hotel, quiero ver todas las reservas que están pendientes de pago para poder hacer un seguimiento con los clientes."/api/reservas?estado=ESTADO
// 05. "Como gerente del hotel, quiero ver todas las reservas para grupos de más de 5 personas para el próximo mes, para poder planificar las necesidades adicionales de estos grupos grandes." /api/reservas?num_huespedes=NUM_HUESPEDES

exports.getBookingInfo = async (req, res) => {
  const { nameHotel, arrivalDate, departureDate, typeRoom, passengers, paymentStatus } = req.query;

  if (typeRoom) {
    const bookingFiltered = bookings.filter(
      (booking) => booking.typeRoom === typeRoom
    );
    if (bookingFiltered.length === 0) {
      return res
        .status(404)
        .json({ msg: "no se encontraron esas habitaciones " });
    }

    return res.json({
      msg: "tipo de habitaciones",
      data: bookingFiltered,
    });

  } else if (arrivalDate && departureDate) {
    const parsedArrivalDate = dayjs(arrivalDate).format("DD/MM/YYYY");
    const parsedDepartureDate = dayjs(departureDate).format("DD/MM/YYYY");

    const bookingFiltered = bookings.filter(
      (booking) =>
        booking.arrivalDate.isBetween(
          parsedArrivalDate,
          parsedDepartureDate
        ) === true
    );
    if (usersFiltered.length === 0) {
      return res.status(404).json({ msg: "No se encontraron reservas" });
    }
    return res.json({
      msg: "Reservas",
      data: bookingFiltered,
    });
  } else {
    return res.json({
      msg: "Reservas",
      data: bookings,
    });
  }
};