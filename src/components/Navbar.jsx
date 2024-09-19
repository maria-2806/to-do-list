import React from 'react'

const Navbar = () => {
  return (
    <nav className='py-2 flex justify-between bg-[rgb(0,0,0)] text-white'>
        <div className="logo">
           <span className='font-bold text-xl mx-9'>iTask</span> 
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all duration-100'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-100'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
