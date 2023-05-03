import axios from 'axios';
import React, { Children, useState } from 'react'
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function getToken() {

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

export default function ProtectRoutes({data, children}) {
  const [userVerified, setUserVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const token = getToken();

    if(token != null) {
      (async () => {
        setLoading(true)
        const res = await axios.post(`${import.meta.env.VITE_SERVICE_1}/usuario/verifyUser?token=${token}`)

        setLoading(false)
        if(res.data['userValid']) setUserVerified(true)
        else setUserVerified(false)
        console.log(res.data.UserData)
      })()
    } else {
      setLoading(false)
      setUserVerified(false)
    }
    
  }, []);
  
  return (
    <>
      {
        !userVerified && loading &&
        <div>
            <p>cargando...</p>
        </div>
      }
      {
        !userVerified && !loading ? <Navigate to={"login"}/> : null
      }
      {
        userVerified && children
      }
    </>
  )
}
