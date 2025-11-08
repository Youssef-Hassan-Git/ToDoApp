import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { userAuth } from '../Contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Modal from '../Modal/Modal';
import jwt_decode from "jwt-decode";


export default function Home() {
  // const [notesTitle, setNotesTitle] = useState(null);
  // const [notescontent, setNotesContent] = useState(null);
  // const [createdAt, setCreatedAt] = useState(null);
  const {token} = useContext(userAuth);
  const [showModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [values, setValues] = useState(null);
  const [updateId, setupdateId] = useState(null);

  // function getAllNotes() {
  //   axios("https://note-sigma-black.vercel.app/api/v1/notes/allNotes", {
  //     headers: { token: "3b8ny__" + token }
  //   })
  //   .then((res) => {
  //     setNotesTitle(res.data.title);
  //     setNotesContent(res.data.content);
  //   })
  //   .catch((err) => {
  //     console.log(err?.response?.data?.msg || "Error fetching the notes data");
  //   });
  // }

  function getAllNotes() {
    return axios("https://note-sigma-black.vercel.app/api/v1/notes/allNotes", {
      headers: {
        token: "3b8ny__"+ token
      }
    })
  }

  const { data, isError, isLoading, error, refetch} = useQuery({
    queryKey: ["getNotes", token],
    queryFn: getAllNotes
  })

  if (isError) {
    return (
      <div className="flex justify-center items-center bg-red-500 h-screen">
        <h2 className="text-white text-3xl">
          Error: {error?.message || "Something went wrong"}
        </h2>
      </div>
    );
  }
  
  if(isLoading){
    return (
      <>
      <LoadingSpinner />
      </>
    )
  }

   
  function handleModal(){
    setShowModal(true)
  }
  
  function handleDelete(productId){

    axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${productId}`, {
      headers: {
        token : '3b8ny__' + token
      }
    })
    .then(()=>{
      refetch();
    })
    .catch((err) => console.log(err)
    )
  }

  function handleUpdate(id, title ,content){
    setIsUpdating(true);
    setValues({
      title, content
    })
    setupdateId(id);
    setShowModal(true);
  }

  const decodedToken = jwt_decode(token);

  const userNotes = data.data.notes.filter(
    (note) => note.createdBy === decodedToken.id
  );

  const isEmpty = userNotes.length === 0;



  return (
    <div className='min-h-screen bg-linear-to-b from-cyan-500 to-blue-500'>
      
      <div className='container mx-auto p-3'>


     {/* button */}
      <div className='flex justify-end mb-4'>
    <button  onClick={() => handleModal()}
      className='bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors'>
      <i className="fas fa-sticky-note mr-2 text-white"></i> Add Note
    </button>
  </div>


    {showModal === true ? <Modal setShowModal={setShowModal} refetch={refetch} setIsUpdating={setIsUpdating} isUpdating={isUpdating} values={values} updateId={updateId} /> : ""}


  {/* grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 text-white gap-4'>
          {data.data.notes.filter((note) => note.createdBy === decodedToken.id).map((note) => {
            return (
              <div key={note._id} className='bg-white/95 relative text-gray-800 p-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 hover:shadow-xl overflow-hidden group/delete group/update'>
                <button onClick={()=> {handleDelete(note._id)}} className="text-red-600 hover:text-red-800 absolute top-3 right-3 translate-x-[200%] transition-all group-hover/delete:translate-x-0 duration-500">
                  <i className="fas fa-trash text-xl "></i>
                </button>
                <button onClick={()=> {handleUpdate(note._id, note.title, note.content)}} className="text-cyan-600 hover:text-cyan-700 absolute top-3 right-12 translate-x-[350%] transition-all group-hover/update:translate-x-0 duration-500">
                  <i className="fas fa-pen text-xl "></i>
                </button>                
                <h2 className='text-gray-800 text-lg font-bold mb-2'><i className="fas fa-sticky-note mr-2 text-cyan-600"></i> {note.title}</h2>
                <p className="text-gray-700 text-sm ">{note.content}</p>
              </div>
            );
          })
        
          }

     
        
        </div>

        {isEmpty?    
          
          <div className=" w-3/4  mx-auto flex flex-col items-center justify-center mt-10 bg-white/95 relative text-gray-800 p-12 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 hover:shadow-xl ">
          <i className="far fa-sticky-note text-8xl mb-4 text-cyan-600"></i>
          <p className="text-lg">You have no notes yet</p>
        </div> :""}

      </div>
    </div>
  )
}
