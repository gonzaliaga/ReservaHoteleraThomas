class Booking {
  constructor(
    id,
    nameHotel,
    arrivalDate,
    dapartureDate,
    passengers,
    typeRoom,
    name,
    mail,
    paymentStatus

  ) {
    this.id = id;
    this.nameHotel = nameHotel;
    this.arrivalDate = arrivalDate;
    this.dapartureDate = dapartureDate;
    this.typeRoom = typeRoom;
    this.passengers = passengers;
    this.name = name;
    this.mail = mail;
    this.paymentStatus = paymentStatus;

  }

  getInfo() {
    return `Nombre: ${this.name} Correo electrónico: ${this.mail}, Fecha de entrada: ${this.arrivalDate}, Fecha de Salida: ${this.dapartureDate}, Tipo de Habitación: ${this.typeRoom} Numero de personas: ${this.passengers}, Estado de Pago : ${this.paymentStatus}`;
  }
}

module.exports = Booking;
