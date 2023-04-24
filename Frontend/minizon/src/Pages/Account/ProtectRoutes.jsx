import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectRoutes({data, children}) {
  const [userVerified, setUserVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      {
        !userVerified && loading &&
        <div>
            <p>cargando...</p>
        </div>
      }
      {
        !userVerified && !loading && <Navigate to={"login"}/>
      }
      {
        userVerified && children
      }
    </>
  )
}
