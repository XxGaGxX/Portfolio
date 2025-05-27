import React from 'react'

function Homepage() {
  return (
    <div className='flex flex-col md:flex-row items-center gap-6 p-6'>
          <div className="w-full md:w-1/2 shadow-2xl">
              <img src="https://avatars.githubusercontent.com/u/139184713?v=4" alt="" className='w-full rounded-2xl ' />
          </div>
          <div className='w-full md:w-1/2 flex flex-col mt-5'>
              <p className='text-4xl'>Hi, I'm</p>
              <p className='text-6xl lg:text-8xl text-primary'>Diego Vagnini</p>
              <p></p>
          </div>
    </div>
  )
}

export default Homepage
