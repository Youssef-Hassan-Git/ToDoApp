import React from 'react'
import { Oval } from 'react-loader-spinner'

export default function LoadingSpinner() {
  return (
    <div className='h-screen flex justify-center items-center bg-linear-to-b from-cyan-500 to-blue-500'>
    <Oval
      height={200}      // smaller
      width={200}       // smaller
      color="#fff"     // white to contrast with button
      secondaryColor="#ccc"
      strokeWidth={5}
      strokeWidthSecondary={5}
      ariaLabel="loading"
    />
    </div>
  )
}
