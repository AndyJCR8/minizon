import { Payment } from '../models/payment.js';

// Obtener todos los metodos de pago
export const buscarPagos = async (req, res) => {
  try {
    const pagos = await Payment.find();
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los metodos de pago' });
  }
};

// Crear un nuevo metodo de pago
export const nuevoPago = async (req, res) => {
  const {
    IDTarjeta,
    Tipo
  } = req.body;

  const newPayment = new Payment({
    IDTarjeta,
    Tipo
  });

  try {
    const createdPayment = await newPayment.save();
    res.status(201).json(createdPayment);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el metodo de pago', message: error.message });
  }
};

// Obtener un metodo de pago por su ID
export const buscarPago = async (req, res) => {
  const paymentId = req.params.id;

  try {
    const payment = await Payment.findById(paymentId);
    if (payment) {
      res.json(payment);
    } else {
      res.status(404).json({ message: 'Metodo de pago no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el metodo de pago' });
  }
};

// Actualizar un metodo de pago
export const editarPago = async (req, res) => {
  const paymentId = req.params.id;
  const {
    IDTarjeta,
    Tipo
  } = req.body;

  try {
    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      {
        IDTarjeta,
        Tipo
      },
      { new: true }
    );

    if (payment) {
      res.json(payment);
    } else {
      res.status(404).json({ message: 'Metodo de pago no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el metodo de pago',  message: error.message  });
  }
};

// Eliminar un metodo de pago
export const eliminarPago = async (req, res) => {
  const paymentId = req.params.id;

  try {
    const payment = await Payment.findByIdAndRemove(paymentId);
    if (payment) {
      res.json({ message: 'Metodo de pago eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Metodo de pago no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el metodo de pago', message: error.message });
  }
};