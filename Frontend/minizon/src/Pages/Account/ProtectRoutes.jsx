import axios from 'axios';
import React, { Children, cloneElement, useState } from 'react';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../../Services/TokenFromCookie';
import Loader from '../../Components/UI Components/Loader/Loader';

export default function ProtectRoutes({children}) {
  const [userVerified, setUserVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = getToken();

    if(token != null) {
      (async () => {
        setLoading(true)
        const res = await axios.post(`${import.meta.env.VITE_SERVICE_1}/usuario/verifyUser?token=${token}`)

        setLoading(false)
        if(res.data['userValid']) setUserVerified(true)
        else setUserVerified(false)
        
        setUserData(res.data.UserData)
      })()
    } else {
      setLoading(false)
      setUserVerified(false)
    }
    
  }, []);
  
  return (
    <>
      {
        !userVerified && loading && <Loader size={"xxl"} text="cargando"/>
      }
      {
        !userVerified && !loading ? <Navigate to={"/account/login"}/> : null
      }
      {
        userVerified && Children.map(children, child => {
          return cloneElement(child, { "userData": userData})
        })
      }
    </>
  )
}
