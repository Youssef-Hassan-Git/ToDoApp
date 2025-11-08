import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full py-5  bg-linear-to-r from-cyan-600 to-sky-600 shadow-inner">
      <div className="text-center text-white text-sm">
        &copy; {new Date().getFullYear()} To Do App. All rights reserved.
      </div>
    </footer>
  )
}
