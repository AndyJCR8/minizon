export function getToken() {

  // Obtén todas las cookies de la página
  var cookies = document.cookie;

  // Separa la cadena de cookies en pares de nombre y valor
  var cookiesArray = cookies.split(';');
  // Busca la cookie con el nombre "miCookie"
  var token = null;
  for (var i = 0; i < cookiesArray.length; i++) {
    var cookie = cookiesArray[i].trim();

    if (cookie.indexOf("token=") == 0) {
      token = cookie.substring("token=".length, cookie.length);
      break;
    }
  }

  return token
}