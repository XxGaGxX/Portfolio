import React from 'react'
import { motion } from "framer-motion"
import "../style/Homepage.css"

function Homepage() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {/* HERO SECTION */}
      <div className='flex flex-col min-h-screen'>
        <div className='flex flex-1 flex-col md:flex-row items-center justify-center h-screen snap-start gap-6 md:gap-14 p-4 md:p-6'>
          <motion.div className="w-4/5 sm:w-2/3 md:w-1/3 lg:w-1/4 shadow-2xl rounded-2xl">
            <motion.img
              src="https://avatars.githubusercontent.com/u/139184713?v=4"
              alt="Diego Vagnini Avatar"
              className='w-full rounded-2xl border-amber-400 border-4 md:border-8 object-contain'
              animate={{ scale: 1, rotate: 360, rotateY: 360 }}
              transition={{ duration: 1.2 }}
            />
          </motion.div>

          <div className='w-full md:w-1/2 flex flex-col mt-5 px-4 md:px-6 items-start'>
            <p className='text-xl md:text-3xl text-gray-500'>Hi, I'm</p>
            <p className='text-3xl sm:text-5xl lg:text-8xl text-amber-400 leading-tight break-words'>Diego Vagnini</p>
            <p className='text-base sm:text-xl lg:text-3xl text-gray-500 mt-3 md:mt-6 max-w-[90vw]'>
              I build web applications with clean, scalable JavaScript/TypeScript code, focusing on APIs and user experience.
            </p>
          </div>
        </div>

        <div className='mb-6 flex flex-col items-center self-center'>
          <p className='text-sm sm:text-base text-gray-700 mb-2'>Preferred Languages & Frameworks</p>
          <p className='text-2xl animate-bounce'>&#8595;</p>
        </div>
      </div>

      {/* SECTION 2 */}
      <div className='bg-amber-300 flex flex-col h-screen snap-start items-center justify-center'>
        <div className='flex flex-wrap justify-center items-center w-full h-full gap-6 p-6'>
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
              viewport={{ once: true, amount: 0.1 }}
              className={`devicon-${icon} dev text-5xl sm:text-7xl md:text-8xl lg:text-9xl`}
            />
          ))}
        </div>
      </div>

      {/* SECTION 3 */}
      <div className='bg-sky-300 flex flex-col h-screen snap-start items-center justify-center'>
        <div className='flex flex-wrap justify-center items-center w-full h-full gap-6 p-6'>
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
              viewport={{ once: true, amount: 0.1 }}
              className={`devicon-${icon} dev text-5xl sm:text-7xl md:text-8xl lg:text-9xl`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Homepage
