export function addToCart(productInfo) {

  let carrito = localStorage.getItem("cart");
  // Si no existe un carrito, crea uno vacío
  if (!carrito) carrito = [];
  else carrito = JSON.parse(carrito);
  // Agrega el producto al carrito
  carrito.push(productInfo);
  // Guarda el carrito actualizado en el almacenamiento local
  localStorage.setItem("cart", JSON.stringify(carrito));
  
}

export function removeFromCart(index) {



}

export function clearCart() {



}