const varName = 'wishList'

export function getWishListCount() {
  let wishList = localStorage.getItem(varName);
  if(!wishList) wishList = [];
  else return JSON.parse(localStorage.getItem(varName)).length;
  
  localStorage.setItem(varName, JSON.stringify(wishList));
  return JSON.parse(localStorage.getItem(varName)).length

}

export function getWishList() {
  let wishList = localStorage.getItem(varName);
  if(!wishList) wishList = [];
  else return JSON.parse(localStorage.getItem(varName));
  
  localStorage.setItem(varName, JSON.stringify(wishList));
  return JSON.parse(localStorage.getItem(varName))
}

export function addToWishList(productInfo) {
  let wishList = localStorage.getItem(varName);

  if (!wishList) wishList = [];
  else wishList = JSON.parse(wishList);
  
  const itemRepeated = wishList.some(obj => obj._id == productInfo._id)
  
  if(itemRepeated) {
    return;
  }
  
  wishList.push(productInfo);
  localStorage.setItem(varName, JSON.stringify(wishList));
}

export function updateWishList(index, count) {
  let wishList = JSON.parse(localStorage.getItem(varName));
  wishList[index].Cantidad += count;
  localStorage.setItem(varName, JSON.stringify(wishList));
}

export function removeFromWishList(index) {
  let wishList = JSON.parse(localStorage.getItem(varName));
  
  wishList.splice(index, 1);
  localStorage.setItem(varName, JSON.stringify(wishList));
}

export function clearWishList() {
  localStorage.removeItem(varName)
}