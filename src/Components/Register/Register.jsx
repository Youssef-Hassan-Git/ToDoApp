import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { FallingLines, Oval } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

export default function Register() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  let registerDetails = {
    name: "",
    email:"",
    password: "",
    age: "",
    phone: ""
  }

  const registerFormik = useFormik({
    initialValues: registerDetails,
    onSubmit: (values) =>{
    setIsSubmitted(true);
    axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp', values)
    .then((res)=>{
      setIsSubmitted(false);
      setIsSuccess(true);

      setTimeout(()=>{
        setIsSuccess(false);
        navigate("/login")
      },3000)
    })
    .catch((err)=>{
      setIsSubmitted(false);
      setErrorMessage(err.response.data.msg)
      setTimeout(()=> {
        setErrorMessage(null);
      }, 4000)
    })

    },

    validationSchema: yup.object().shape({
      name:yup.string().required("Name is required").min(3, "Name is mininum 3 characters").max(18, "Name is maximum 18 characters"),
      email: yup.string().required("Email is required").email("Invalid email"),
      password: yup.string().required().min(6, "Minimum is 6 characters").max(12, "Maximum is 12 characters"),
      age: yup.number().required("Age is required").min(10, "Minimum age is 10"),
      phone: yup.string().required("Phone is Required").matches(/^(02)?01[0125][0-9]{8,9}$/, "The phone must be egyptian number start with 011 | 012 | 010 | 015 and ranged between 11 - 12 numbers"),

    })
  })





  return (
    <div className='min-h-screen flex justify-center items-center mx-auto bg-linear-to-b from-cyan-500 to-blue-500 '>
     
      <div className='w-1/2 my-10 py-7 bg-linear-to-r from-cyan-600 to-sky-600   rounded-md shadow-xl md:flex flex-col items-center justify-center  gap-3 '>

      <h1 className='text-2xl font-bold text-center text-white text-bold'>Register Page</h1>
      <h3 className='text-white text-center font-medium mt-3 '><i className="fa-solid fa-user text-lg m-1 hover:text-blue-300"></i> Enter Your Register Details Below Please:</h3>
    
    
      {/* form */}
      <form onSubmit={registerFormik.handleSubmit} className="w-3/4 mx-auto ">

  <div className="mb-5 mt-5 w-full">
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-white w-full  ">Your name</label>
    <input type="name" id="name" value={registerFormik.values.name} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} className="shadow-md bg-gray-50 border border-t-0 border-blue-300 w-full  rounded-lg focus:border-blue-300 focus:outline-none  block   p-2.5 " placeholder="Youssef" required />
    
    {registerFormik.errors.name && registerFormik.touched.name ?
        <div className='text-red-800 pt-2  '>
        <h3>{registerFormik.errors.name}</h3>
      </div>
  :
  ""  
  }
  
  </div>



  <div className="mb-5 mt-5 w-full">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white w-full  ">Your email</label>
    <input type="email" id="email" value={registerFormik.values.email} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} className="shadow-md bg-gray-50 border border-t-0 border-blue-300 w-full  rounded-lg focus:border-blue-300 focus:outline-none  block   p-2.5 " placeholder="name@mail.com" required />
  
    {registerFormik.errors.email && registerFormik.touched.email ?
        <div className='text-red-800 pt-2  '>
        <h3>{registerFormik.errors.email}</h3>
      </div>
  :
  ""  
  }
  
  </div>
  
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white ">Your password</label>
    <input type="password" id="password" value={registerFormik.values.password} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} className="shadow-md bg-gray-50 border border-t-0 border-blue-300 w-full  rounded-lg focus:border-blue-300 focus:outline-none  block   p-2.5" required />
  
    {registerFormik.errors.password && registerFormik.touched.password ?
        <div className='text-red-800 pt-2  '>
        <h3>{registerFormik.errors.password}</h3>
      </div>
  :
  ""  
  }
  
  </div>

  <div className="mb-5">
    <label htmlFor="age" className="block mb-2 text-sm font-medium text-white ">Age</label>
    <input type="number" id="age" value={registerFormik.values.age} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} className="shadow-md bg-gray-50 border border-t-0 border-blue-300 w-full  rounded-lg focus:border-blue-300 focus:outline-none  block   p-2.5" required />

    {registerFormik.errors.age && registerFormik.touched.age ?
        <div className='text-red-800 pt-2  '>
        <h3>{registerFormik.errors.age}</h3>
      </div>
  :
  ""  
  }

  </div>

  <div className="mb-5">
    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-white ">Phone</label>
    <input type="text" id="phone" value={registerFormik.values.phone} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} className="shadow-md bg-gray-50 border border-t-0 border-blue-300 w-full  rounded-lg focus:border-blue-300 focus:outline-none  block   p-2.5" required />      
 
    {registerFormik.errors.phone && registerFormik.touched.phone ?
        <div className='text-red-800 pt-2  '>
        <h3>{registerFormik.errors.phone}</h3>
      </div>
  :
  ""  
  }
 
  </div>

  {isSuccess == true ? 
<div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 m-3" role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <i className="fa-solid fa-check text-white bg-green-500 rounded-md p-1.5 me-2"></i>
  </svg>
  <div>
    Registered Sucessfully!
  </div>
  </div>
: '' }


{errorMessage ? 
  <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 m-3" role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <div>
    {errorMessage}
  </div>
  </div>
: '' }


    <button type="submit" disabled={!registerFormik.isValid}  className={`${registerFormik.isValid? 'flex justify-center items-center text-white w-full bg-linear-to-r from-violet-600 to-blue-600  hover:bg-linear-to-r hover:from-blue-600 hover:to-violet-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center ' : "text-white w-full bg-linear-to-r from-violet-600 to-blue-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " }  `}>
    {isSubmitted ? (
    <Oval
      height={20}      // smaller
      width={20}       // smaller
      color="#fff"     // white to contrast with button
      secondaryColor="#ccc"
      strokeWidth={5}
      strokeWidthSecondary={5}
      ariaLabel="loading"
    />
  ) : (
    'Register new account'
  )}

    </button>
<p className='text-center text-white mt-5 '>Already have an account? <Link to="/login" className='text-blue-400 underline underline-offset-4  hover:text-blue-600'>Login</Link></p>
    
      </form>

    </div>

  </div>
);
}
