import React from 'react'
import { motion } from "framer-motion"
import "../style/Homepage.css"

function Homepage() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory pt-12 sm:pt-16">
      {/* HERO SECTION */}
      <div className='flex flex-col min-h-screen'>
        <div className='flex flex-1 flex-col md:flex-row items-center justify-center h-screen snap-start gap-4 sm:gap-6 md:gap-14 p-3 sm:p-4 md:p-6'>
          <div className="w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 shadow-2xl rounded-2xl">
            <motion.img
              src="https://avatars.githubusercontent.com/u/139184713?v=4"
              alt="Diego Vagnini Avatar"
              className='w-full rounded-2xl border-gray-900 border-4 md:border-8 object-contain'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </div>
          <div className='w-full md:w-1/2 flex flex-col mt-4 sm:mt-5 px-3 sm:px-4 md:px-6 items-start'>
            <motion.p initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className='text-lg sm:text-xl md:text-3xl text-gray-500'>Hi, I'm</motion.p>
            <motion.p initial={{ x: 100, opacity: 0 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }} className="text-transparent bg-clip-text bg-gradient-to-r font-bold from-amber-300 via-sky-400 to-purple-500 text-4xl sm:text-6xl lg:text-8xl leading-tight break-words">
              Diego Vagnini
            </motion.p>
            <motion.p initial={{ y: 100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className='text-sm sm:text-xl lg:text-3xl text-gray-500 mt-2 sm:mt-3 md:mt-6'>
              I build web applications with clean, scalable JavaScript code, focusing on APIs and user experience.
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className='mb-4 sm:mb-6 flex flex-col items-center self-center px-2 text-center'
        >
          <p className='text-xs sm:text-sm md:text-base text-gray-700 mb-1 sm:mb-2 font-semibold'>Preferred Languages & Frameworks</p>
          <p className='text-xl sm:text-2xl animate-bounce'>&#8595;</p>
        </motion.div>
      </div>

      {/* SECTION 2 */}
      <div className='bg-amber-300 flex min-h-screen snap-start items-center justify-center'>
        <div className='w-full h-full flex items-center justify-center py-8 sm:py-12'>
          <div className='grid grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 p-4 sm:p-6'>
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
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.2, duration: 1, ease: "easeInOut" }
                }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2, ease: "easeInOut" }
                }}
                viewport={{ once: true, amount: 0.1 }}
                className={`devicon-${icon} dev text-5xl sm:text-7xl md:text-8xl lg:text-9xl`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3 */}
      <div className='bg-sky-300 flex min-h-screen snap-start items-center justify-center'>
        <div className='w-full h-full flex items-center justify-center py-8 sm:py-12'>
          <div className='grid grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 p-4 sm:p-6'>
            {[
              "nodejs-plain-wordmark",
              "react-original-wordmark",
              "angularjs-plain",
              "vuejs-plain-wordmark",
              "dotnetcore-plain",
              "flutter-plain"
            ].map((icon, index) => (
              <motion.i
                key={icon}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.2, duration: 1, ease: "easeInOut" }
                }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2, ease: "easeInOut" }
                }}
                viewport={{ once: true, amount: 0.1 }}
                className={`devicon-${icon} dev text-5xl sm:text-7xl md:text-8xl lg:text-9xl`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
