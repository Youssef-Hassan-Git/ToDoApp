import React, { useContext, useState } from 'react'
import { userAuth } from '../Contexts/AuthContext'
import { useFormik } from 'formik'
import axios from 'axios'
import * as yup from 'yup'
import { Oval } from 'react-loader-spinner'

export default function Modal({setShowModal, refetch, setIsUpdating, isUpdating, values, updateId }) {


  const {token} = useContext(userAuth)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [successMessage2, setSuccessMessage2] = useState(null);

  const note = {
    title : "",
    content : ""
  }
  
  function addOrUpdateNote(values){
    if(isUpdating){
      console.log("updating");
      updateNote(values, updateId)
    }
    else{
      console.log("adding");
      addNote(values)
    }
  }
  
  
    function addNote(values){
      setIsSubmitted(true);
      axios.post('https://note-sigma-black.vercel.app/api/v1/notes', values, {
        headers: {
          token: "3b8ny__" + token
        }
      })
      .then((res) =>{
        setIsSubmitted(false);
        refetch();
        setShowModal(false);
        
        setSuccessMessage(true)
        setIsUpdating(false);
        setTimeout(()=>{
          setSuccessMessage(false)
        }, 3000)
      })
      .catch((err) => {console.log(err)}
      )
    }

    function updateNote(values, productId){
      setIsSubmitted(true);
      axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${productId}`, values, {
        headers: {
          token: "3b8ny__" + token
        }
      })
      .then((res) =>{
        setIsSubmitted(false);
        refetch();
        setSuccessMessage2(true)
        setTimeout(()=>{
          setSuccessMessage2(false);
          setShowModal(false);
          setIsUpdating(false);
        }, 3000)
      
      })
      .catch((err) => {console.log(err)}
      )
    }

  const noteFormik = useFormik({
    initialValues: {title: isUpdating? values.title: "", content:  isUpdating? values.content: "" },
    onSubmit: addOrUpdateNote,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      title: yup.string().required("Title is required"),
      content: yup.string().required("Content is required")
    })
  })


  function handleCloseModal(){
    setShowModal(false);
    setIsUpdating(false);

  }



  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <form onSubmit={noteFormik.handleSubmit} className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i className="fas fa-sticky-note mr-2 text-cyan-600"></i>
          Add New Note
        </h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="note-title" className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name='title'
              value={noteFormik.values.title}
              onChange={noteFormik.handleChange}
              onBlur={noteFormik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-800 bg-white/80"
              placeholder="Enter note title..."
            />
  
            {noteFormik.errors.title && noteFormik.touched.title ?
                  <div className='text-red-800 pt-2  '>
                  <h3>{noteFormik.errors.title}</h3>
                </div>
            :
            ""  
            }
          </div>
          
          <div>
            <label htmlFor="note-content" className="block text-sm font-semibold text-gray-700 mb-2">
              Content
            </label>
            <textarea
              id="content"
              name='content'
              value={noteFormik.values.content}
              onChange={noteFormik.handleChange}
              onBlur={noteFormik.handleBlur}
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-800 bg-white/80 resize-none"
              placeholder="Enter note content..."
            ></textarea>

          {noteFormik.errors.content && noteFormik.touched.content ?
                  <div className='text-red-800 pt-2  '>
                  <h3>{noteFormik.errors.content}</h3>
                </div>
            :
            ""  
            }
         
         
          </div>
          {successMessage?
          <div className="flex justify-center text-green-600">
            Your Note has been added.
          </div>
          :""}

         
                  {successMessage2?
          <div className="flex justify-center text-green-600">
            Your Note has been updated.
          </div>
          :""}


          <div className="flex gap-3 pt-2">
            <button type='submit' disabled={!noteFormik.isValid} className="flex justify-center items-ceter bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
            {isSubmitted ? (
    <Oval
      height={30}      // smaller
      width={30}       // smaller
      color="#fff"     // white to contrast with button
      secondaryColor="#ccc"
      strokeWidth={5}
      strokeWidthSecondary={5}
      ariaLabel="loading"
    />
  ) : 

  isUpdating?
  "Update Note"
  : 
    'Add Note'
  
  }

            </button>
            <button type='button' className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
