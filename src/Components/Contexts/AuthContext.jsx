import React, { createContext, useEffect, useState } from 'react'

export const userAuth= createContext();

export default function AuthContextProvider({children}) {

    const [token, setToken] = useState(null);
    const [userToken, setUserToken] = useState(localStorage.getItem("token"));


    useEffect(()=>{
        if(userToken){
            setToken(userToken)
        }
    }, [])


    return (
    <>
      <userAuth.Provider value={{token, setToken}}>
        {children}

      </userAuth.Provider>
    </>
  )
}
