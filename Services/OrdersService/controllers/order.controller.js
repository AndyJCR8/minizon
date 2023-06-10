import { decode, encode } from '../jwt/encription.js';
import { Order } from '../models/order.js';
import axios from 'axios'
import moment from 'moment'

// Obtener todas las ordenes
export const buscarOrdenes = async (req, res) => {
  const userID = req.params.userID;
  console.log("USERID: ", userID)
  try {

    const orders = await Order.find({ IDUsuario: userID.toString() });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las ordenes' });
  }
};

const getNextCodigoPedido = async () => {
  const order = await Order.findOne().sort({ CodigoPedido: -1 }).exec();
  if (order && order.CodigoPedido) {
    return order.CodigoPedido + 1;
  } else {
    return 1; // Valor predeterminado si no hay ningún documento existente
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
      IDTarjeta,
      IDDireccion,
      Direccion,
      Tipo
    } = req.body;
    
    const newOrder = new Order({
      IDUsuario: payload.IDUsuario,
      NIT,
      IDProductos,
      CodigoPedido: await getNextCodigoPedido(), // Obtener el siguiente valor del contador
      EstadoPedido: 'completado',
      IDTarjeta,
      Tipo,
      IDDireccion,
      Direccion,
      CreatedAt: Date.now()
    });
    console.log("Productos: ", IDProductos)
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
    let totalQuet = 0.0
    let detalles = []
    
    for(let pr of IDProductos) {
      let subTotal = 0.0
      if(!pr.PrecioVenta) subTotal = (parseFloat(pr.PrecioBeneficio) * parseInt(pr.Cantidad))
      else subTotal = (parseFloat(pr.PrecioVenta) * parseInt(pr.Cantidad))

      totalQuet += subTotal
      detalles.push({
        "CantidadProducto": parseInt(pr.Cantidad),
        "SubTotalQuetzales": subTotal,
        "IDProducto": pr._id
      })
    }

    let encabezadoData = {
      "IDPedido": createdOrder.CodigoPedido,
      "TotalQuetzales": totalQuet,
      "TotalDolares": totalQuet * 0.77
    }
    const billToken = await encode({...payload, ...encabezadoData, 'iss': process.env.HOST})
    //console.log(`TOTALQUET: ${totalQuet}\ndetalles: ${JSON.stringify(detalles)}\nencabezado: ${JSON.stringify(encabezadoData)}`)
    await axios.post('http://0.0.0.0:5010/cabeceras', {}, {
      headers: { Authorization: `Bearer ${billToken}` }
    })

    //console.log(`EncabezadoData IDPedido: ${encabezadoData.IDPedido}`)
    const lastEncabezado = (await axios.get(`http://0.0.0.0:5010/cabecera/pedido/${encabezadoData.IDPedido}`, {
      headers: { Authorization: `Bearer ${newToken}` }
    })).data
    //console.log('LastEncabezado: ', lastEncabezado)
    //print("Last: ",JSON.stringify(lastEncabezado))
    for(let detalle of detalles) {
      await axios.post('http://0.0.0.0:5010/montos', {...detalle, 'IDFactura': lastEncabezado.id}, {
        headers: { Authorization: `Bearer ${newToken}` }
      })
    }
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