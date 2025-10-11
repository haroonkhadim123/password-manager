import React from 'react'
import { FaGithub } from "react-icons/fa";

const Navbar = ({size=24}) => {
  return (
    <div className='w-full py-4 text-white bg-black '>
        <div className="navbar flex w-[80vw] items-center justify-between mx-auto">
            <h1 className='text-2xl '>
                &lt;Pass<span className='text-green-500 font-bold'>OP</span>
                &gt;
            </h1>
            <ul>
               <a className='curser-pointer' href="https://github.com/haroonkhadim123"><button className='bg-green-500 p-2 rounded-lg flex items-center justify-center gap-2'><FaGithub  size={size} />GitHub</button></a> 
            </ul>
        </div>
    </div>
  )
}

export default Navbar