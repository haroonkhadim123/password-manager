import React from 'react'
import { FaGithub } from "react-icons/fa";
import Link from 'next/link'

const Navbar = ({size=24}) => {
  return (
    <div className='w-full py-4 text-white bg-slate-800 '>
        <div className="navbar flex w-[80vw] items-center justify-between mx-auto">
          <h1 className="text-2xl font-bold text-center">
  <span className="sr-only">PassOP</span>
  <span  aria-hidden="true">
    &lt;Pass<span className="text-green-500 font-bold">OP</span>&gt;
  </span>
</h1>

            <ul>
               <Link className='curser-pointer ' href="https://github.com/haroonkhadim123"><button className='bg-green-500 cursor-pointer p-2 rounded-lg flex items-center justify-center gap-2'><FaGithub  size={size} />GitHub</button></Link> 
            </ul>
        </div>
    </div>
  )
}

export default Navbar