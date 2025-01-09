import React from 'react'
import {assets} from '../assets/admin_assets/assets.js'
const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img className='w-[max(10%,80px)]' src={assets.logo}/>
        <button onClick={()=>setToken('')} className='bg-gray-500 text-white px-5 py-2 sm:px-7 sm:py rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
