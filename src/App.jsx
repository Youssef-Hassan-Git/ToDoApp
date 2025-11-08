import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home'
import Register from './Components/Register/Register'
import NotFound from './Components/NotFound/NotFound'
import Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login'
import AuthContextProvider from './Components/Contexts/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProtectedRoute from './Components/Protected Routes/ProtectedRoute'
import ProtectedAuth from './Components/Protected Routes/ProtectedAuth'

const router = createBrowserRouter([
  {path: '/', element: <Layout />, children: [
    {index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute>},
    {path: 'register', element: <ProtectedAuth> <Register /> </ProtectedAuth>},
    {path: 'login', element: <ProtectedAuth> <Login /> </ProtectedAuth>},
    {path: '*', element: <NotFound />},

  ]},
]);


export default function App() {
  const reactQueryConfigs = new QueryClient();

  return (
   
    <>

    <AuthContextProvider>
    <QueryClientProvider client={reactQueryConfigs}>

    <RouterProvider router={router} />

    </QueryClientProvider>
    </AuthContextProvider>

    
    </>
  )
}
