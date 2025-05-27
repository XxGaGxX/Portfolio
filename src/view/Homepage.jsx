import React from 'react'
import { motion } from "framer-motion"
import "../style/Homepage.css"

function Homepage() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {/* HERO SECTION */}
      <div className='flex flex-1 flex-col md:flex-row items-center justify-center h-screen snap-start gap-6 md:gap-14 p-6'>
        <motion.div className="w-3/4 md:w-1/3 lg:w-1/4 shadow-2xl rounded-2xl">
          <motion.img
            src="https://avatars.githubusercontent.com/u/139184713?v=4"
            alt="Diego Vagnini Avatar"
            className='w-full rounded-2xl border-amber-400 border-4 md:border-8'
            animate={{ scale: 1, rotate: 360, rotateY: 360 }}
            transition={{ duration: 1.2 }}
          />
        </motion.div>

        <div className='w-full md:w-1/2 flex flex-col mt-5 md:px-4 items-start md:items-start'>
          <p className='text-3xl md:mb-2 text-gray-500'>Hi, I'm</p>
          <p className='text-5xl lg:text-8xl text-amber-400'>Diego Vagnini</p>
          <p className='text-2xl lg:text-4xl text-gray-500 mt-3 md:mt-10'>
            I build web applications with clean, scalable JavaScript/TypeScript code, focusing on APIs and user experience.
          </p>
        </div>
      </div>

      {/* SECTION 2 */}
      <div className='bg-amber-300 flex flex-col h-screen snap-start items-center justify-center overflow-visible'>
        <div className='flex flex-1 flex-col md:flex-row w-full h-full justify-around items-center overflow-visible gap-6 py-8'>
          {[
            "javascript-plain",
            "html5-plain-wordmark",
            "css3-plain-wordmark",
            "dart-plain",
            "csharp-plain",
            "microsoftsqlserver-plain"
          ].map((icon, index) => (
            <motion.i
              key={icon}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.2,
                duration: 1,
                ease: "easeInOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
              className={`devicon-${icon} dev overflow-visible text-6xl md:text-9xl`}
            />
          ))}
        </div>
      </div>

      {/* SECTION 3 */}
      <div className='flex-1 bg-sky-300 snap-start flex items-center justify-center h-screen overflow-visible'>
        <div className='flex flex-1 flex-col md:flex-row w-full min-h-[300px] h-full justify-around items-center overflow-visible gap-6 py-8'>
          {[
            "nodejs-plain-wordmark",
            "react-original-wordmark",
            "angularjs-plain",
            "vuejs-plain-wordmark",
            "dotnetcore-plain",
            "flutter-plain"
          ].map((icon, index) => (
            <motion.i
              key={icon + "-bottom"}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.2,
                duration: 1,
                ease: "easeInOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
              className={`devicon-${icon} dev overflow-visible text-6xl md:text-9xl`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Homepage
