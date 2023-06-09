import { Product } from '../models/product.js';

// Obtener todos los productos
export const todosLosProductos = async (req, res) => {
  try {
    const options = {
      page: parseInt(req.query.page ?? 1),
      limit: 10
    }

    const products = await Product.paginate({}, options);
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

export const buscarProductos = async (req, res) => {
  try {
    const options = {
      page: parseInt(req.query.page ?? 1),
      limit: 10
    }
    //const products = await Product.find({Nombre: { $regex: req.query.searchFor, $options: 'i' }});
    const products = await Product.paginate({Nombre: { $regex: req.query.searchFor, $options: 'i' }}, options);
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

export const buscarProductosCat = async (req, res) => {
  try {
    const options = {
      page: parseInt(req.query.page ?? 1),
      limit: 10
    }

    let products;
    if (req.query.subcat) {
      products = await Product.paginate({ Categoria: req.query.cat, SubCategoria: req.query.subcat }, options);
    } else {
      products = await Product.paginate({ Categoria: req.query.cat }, options);
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

export const buscarProductosCatLimit = async (req, res) => {
  try {

    let products;
    if (req.query.subcat) {
      products = await Product.find({ Categoria: req.query.cat, SubCategoria: req.query.subcat }).limit(parseInt(req.query.count));
    } else {
      products = await Product.find({ Categoria: req.query.cat }).limit(parseInt(req.query.count));
    }
    
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
    PrecioVenta,
    Descripcion,
    Categoria,
    SubCategoria,
    Stock
  } = req.body;

  // Calcula el PrecioBeneficio aplicando el descuento del 20%
  const PrecioBeneficio = PrecioVenta * 0.8;

  const newProduct = new Product({
    Nombre,
    Codigo,
    PrecioBeneficio,
    PrecioVenta,
    Descripcion,
    Categoria,
    SubCategoria,
    Imagen: "http://localhost:5000/public/" + req.file.filename,
    Stock
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
    console.log(req.get("authorization"))
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
    PrecioVenta,
    Descripcion,
    Categoria,
    SubCategoria,
    Stock
  } = req.body;

  // Calcula el PrecioBeneficio aplicando el descuento del 20%
  const PrecioBeneficio = PrecioVenta * 0.8;

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
        Imagen: "http://localhost:5000/public/" + req.file.filename,
        Stock,
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

/* import { Product } from '../models/product.js';
import multer from 'multer';
import path from 'path';

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
const storage = multer.diskStorage({
  destination: 'public',
  filename: (req, file, cb) => {
    const filename = `${Date.now()}_${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({ storage }).array('images', 2); // Ajuste para permitir hasta 2 imágenes

export const nuevoProducto = async (req, res) => {
  const {
    Nombre,
    Codigo,
    PrecioBeneficio,
    PrecioVenta,
    Descripcion,
    Categoria,
    SubCategoria,
    RutasImagen,
    Stock
  } = req.body;

  try {
    // Procesar la carga de las imágenes
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: 'Error al cargar las imágenes' });
      }

      // Obtener las rutas de las imágenes subidas
      const imagePaths = req.files.map(file => path.join('public', file.filename));

      // Crear una nueva instancia de Producto con todas las propiedades
      const newProduct = new Product({
        Nombre,
        Codigo,
        PrecioBeneficio,
        PrecioVenta,
        Descripcion,
        Categoria,
        SubCategoria,
        RutasImagen: {
          original: imagePaths[0],
          thumbnail: imagePaths[1]
        },
        Stock,
        CreatedAt: Date.now()
      });

      // Guardar el producto en la base de datos
      const createdProduct = await newProduct.save();

      res.status(201).json(createdProduct);
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto', message: error.message });
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
    RutasImagen,
    Stock
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
        Stock,
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
    res.status(500).json({ error: 'Error al eliminar el producto', message: error.message });
  }
}; */