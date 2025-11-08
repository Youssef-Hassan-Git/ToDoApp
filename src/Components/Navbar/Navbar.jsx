import React, { use, useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { userAuth } from '../Contexts/AuthContext';

export default function Navbar() {
    const [menu, setMenu] = useState(false)
    const {token, setToken} = useContext(userAuth);
    const navigate = useNavigate();
    function openMenu(){
        setMenu(!menu)
    }


    function logOut(){

      localStorage.removeItem("token");
      setToken(null);
      navigate("/login");

    }

  return (

    <>

    <div>
    

<nav className="bg-[#1E293B]  p-3">
  <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">

    <Link to={"/"} className=' flex flex-row justify-around items-start gap-3'>
    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 " alt="Flowbite Logo" />
    <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#F8FAFC] ">NoteSphere</span>
 
    </Link>

    <button data-collapse-toggle="navbar-default" type="button" onClick={openMenu} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>




    <div className={`${menu ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
     
     
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  ">
      
        {token?
  <>
            <li>
               <NavLink to="/" className="block py-1.5  px-3 text-[#F8FAFC]  rounded-sm hover:text-[#60A5FA]" aria-current="page">Home</NavLink>
            </li> 
             <li>
                    <span onClick={()=> { logOut()}} className='text-[#F8FAFC] hover:text-[#f1e6e6] bg-red-500 block py-1.5  px-3  rounded-sm'>SignOut</span>
            </li>
  </>
      : 
 <>
            <li>
              <NavLink to="/register" className="block py-1.5  px-3 text-[#F8FAFC] rounded-sm hover:text-[#60A5FA]">Register</NavLink>
            </li>
            <li>
              <NavLink to="/login" className="block py-1.5  px-3 text-[#F8FAFC] rounded-sm hover:text-[#60A5FA]">Login</NavLink>
            </li>
        
 </>     
      
      }
      


        

      </ul>
    </div>
  </div>
</nav>

    </div>

    </>
  )
}
