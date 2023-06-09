import { decode, encode } from '../jwt/encription.js';
import { Order } from '../models/order.js';
import axios from 'axios'
import moment from 'moment'

// Obtener todas las ordenes
export const buscarOrdenes = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las ordenes' });
  }
};

// Crear una nueva orden
export const nuevaOrden = async (req, res) => {
  
  try {
    
    const token = req.get("authorization").split(' ')[1]
    const payload = (await decode(token)).Payload
    
    const {
      NIT,
      IDProductos,
      CodigoPedido,
      EstadoPedido,
      IDTarjeta,
      IDDireccion,
      Direccion,
      Tipo
    } = req.body;
    
    const newOrder = new Order({
      IDUsuario: payload.IDUsuario,
      NIT,
      IDProductos,
      CodigoPedido,
      EstadoPedido,
      IDTarjeta,
      Tipo,
      IDDireccion,
      Direccion,
      CreatedAt: Date.now()
    });
    
    const createdOrder = await newOrder.save();

    console.log(payload["Orders"])
    let newPayload = {}

    if(payload["Orders"] == undefined) newPayload = { ...payload, "Orders": [createdOrder], 'iss': process.env.HOST }
    else { 
      payload.Orders.push(createdOrder)
      newPayload = { ...payload, 'iss': process.env.HOST }
    }
    
    const newToken = await encode(newPayload)
    /* PROCESANDO PEDIDO EN EL BACKEN DE USUARIOS */
    await axios.post('http://0.0.0.0:8000/api/pedido', {
      'NIT': NIT,
      'Fecha': moment().format('YYYY-MM-DD').toString(),
      "IDDireccion": IDDireccion
    }, { headers: { Authorization: `Bearer ${newToken}` } })
    /* ------------------------------------------ */

    /* SIMULANDO QUE EL PEDIDO YA FUE PROCESADO */
    
    /* ---------------------------------------- */
    
    res.status(201).json({"Order": createdOrder, "token": newToken});
    //res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la orden', message: error.message });
  }
};

// Obtener una orden por su ID
export const buscarOrden = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Orden no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la orden', message: error.message });
  }
};

// Actualizar una orden
export const editarOrden = async (req, res) => {
  const orderId = req.params.id;
  const {
    IDUsuario,
    NIT,
    IDProductos,
    CodigoPedido,
    EstadoPedido,
    IDTarjeta,
    Tipo
  } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        IDUsuario,
        NIT,
        IDProductos,
        CodigoPedido,
        EstadoPedido,
        IDTarjeta,
        Tipo,
        UpdatedAt: Date.now()
      },
      { new: true }
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Orden no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la orden' });
  }
};

// Eliminar una orden
export const eliminarOrden = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findByIdAndRemove(orderId);
    if (order) {
      res.json({ message: 'Orden eliminada correctamente' });
    } else {
      res.status(404).json({ message: 'Orden no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la orden', message: error.message });
  }
};