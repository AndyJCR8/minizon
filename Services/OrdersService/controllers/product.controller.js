import { Product } from '../models/product.js';

// Obtener todos los productos
export const buscarProductos = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// Crear un nuevo producto
export const nuevoProducto = async (req, res) => {
  const {
    Nombre,
    Codigo,
    PrecioBeneficio,
    PrecioVenta,
    Descripcion,
    Categoria,
    SubCategoria,
    RutasImagen
  } = req.body;

  const newProduct = new Product({
    Nombre,
    Codigo,
    PrecioBeneficio,
    PrecioVenta,
    Descripcion,
    Categoria,
    SubCategoria,
    RutasImagen
  });

  try {
    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// Obtener un producto por su ID
export const buscarProducto = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

// Actualizar un producto
export const editarProducto = async (req, res) => {
  const productId = req.params.id;
  const {
    Nombre,
    Codigo,
    PrecioBeneficio,
    PrecioVenta,
    Descripcion,
    Categoria,
    SubCategoria,
    RutasImagen
  } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      {
        Nombre,
        Codigo,
        PrecioBeneficio,
        PrecioVenta,
        Descripcion,
        Categoria,
        SubCategoria,
        RutasImagen,
        UpdatedAt: Date.now()
      },
      { new: true }
    );

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// Eliminar un producto
export const eliminarProducto = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByIdAndRemove(productId);
    if (product) {
      res.json({ message: 'Producto eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};