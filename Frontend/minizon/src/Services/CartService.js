const varName = 'cart'

export function getCartCount() {
  let carrito = localStorage.getItem(varName);
  if(!carrito) carrito = [];
  else return JSON.parse(localStorage.getItem(varName)).length;
  
  localStorage.setItem(varName, JSON.stringify(carrito));
  return JSON.parse(localStorage.getItem(varName)).length
}

export function getCart() {
  let carrito = localStorage.getItem(varName);
  if(!carrito) carrito = [];
  else return JSON.parse(localStorage.getItem(varName));
  
  localStorage.setItem(varName, JSON.stringify(carrito));
  return carrito
}

export function addToCart(productInfo) {
  let carrito = localStorage.getItem(varName);

  if (!carrito) carrito = [];
  else carrito = JSON.parse(carrito);
  
  const itemRepeated = carrito.some(obj => obj._id == productInfo._id)
  
  if(itemRepeated) {
    updateCart(carrito.findIndex(obj => obj._id == productInfo._id), productInfo.Cantidad ?? 1)
    return;
  }

  if(!productInfo.Cantidad) productInfo.Cantidad = 1
  
  carrito.push(productInfo);
  localStorage.setItem(varName, JSON.stringify(carrito));
}

export function updateCart(index, count) {
  let carrito = JSON.parse(localStorage.getItem(varName));
  carrito[index].Cantidad = parseInt(carrito[index].Cantidad) + count;
  localStorage.setItem(varName, JSON.stringify(carrito));
}

export function removeFromCart(index) {
  let carrito = JSON.parse(localStorage.getItem(varName));
  
  carrito.splice(index, 1);
  localStorage.setItem(varName, JSON.stringify(carrito));
}

export function clearCart() {
  localStorage.removeItem(varName)
}