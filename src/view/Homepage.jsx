import React from 'react'
import { motion } from "motion/react"


function Homepage() {
  return (
    <div style={{ height: "100vh" }}>
      <div className='flex flex-col md:flex-row items-center justify-center min-h-full gap-6 md:gap-14 p-6'>
        <motion.div className="w-3/4 md:w-1/3 lg:w-1/4 shadow-2xl rounded-2xl">
          <motion.img src="https://avatars.githubusercontent.com/u/139184713?v=4" alt=""
            className='w-full rounded-2xl border-amber-400 border-4 md:border-8 '
            animate={{ scale: 1, rotate: 360, rotateY: 360 }}
            transition={{ duration: '1.2' }} />
        </motion.div>
        <div className='w-full md:w-1/2 flex flex-col mt-5 md:px-4'>
          <p className='text-3xl md:mb-2 text-gray-500'>Hi, I'm</p>
          <p className='text-5xl lg:text-8xl text-amber-400'>Diego Vagnini</p>
          <p className='text-2xl lg:text-4xl text-gray-500 mt-3 md:mt-10 '>I build web applications with clean, scalable JavaScript/TypeScript code, focusing on APIs and user experience.</p>
        </div>
      </div>
      <div className='bg-amber-300 flex min-h-full 
      items-center justify-center'
        style={{ height: "calc(100vh + px)" }}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0,
              duration: 1,
              ease: "easeInOut",
            },
          }}
          viewport={{ once: true, amount: 1 }}
        >
          
        </motion.div>
      </div>
    </div>
  )
}

export default Homepage
