import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {
    const userToken = localStorage.getItem("token")
    if(!userToken){
     return   <Navigate to={'/login'} />
    }

    else{
      return  children;
    }

}
