import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedAuth({children}) {
    const userToken = localStorage.getItem("token")
    if(!userToken){
     return   children;
    }

    else{
      return  <Navigate to={"/"} />;
    }

}
