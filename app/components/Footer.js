import React from 'react'

const Footer = () => {
  return (
   
          <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full'>
          <div className="logo font-bold text-white text-2xl flex items-center">
  {/* Screen reader friendly text */}
  <span className="sr-only">PassOP</span>

  {/* Decorative logo for visual users */}
  <span aria-hidden="true" className="text-green-500">&lt;</span>
  <span>Pass</span>
  <span aria-hidden="true" className="text-green-500">OP/&gt;</span>
</div>

            <div className='flex justify-center items-center'> Created by codewithharoon </div>
        </div>
    
  )
}

export default Footer