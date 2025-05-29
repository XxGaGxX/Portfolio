import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion"

function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    setProjects([{
      Nome: "BlockVision",
      Url: "https://github.com/XxGaGxX/BlockVision",
      Descrizione: "BlockVision is a web platform designed to analyze and visualize data related to cryptocurrencies and NFTs. Its goal is to provide users with an intuitive interface to explore detailed information about various digital assets, combining real-time data with interactive visualizations",
      Immagine: "./src/assets/BlockVision.png"
    },
    {
      Nome: " Collaborator in : TravelTracker",
      Url: "https://github.com/rosalinaowo/traveltracker",
      Descrizione: "TravelTracker is a simple travel logging web app built with JavaScript and Vue.js. It allows users to create, view, and manage travel entries with ease. The app features a clean UI and uses Firebase for backend services like authentication and data storage, making it a lightweight solution for tracking travel memories.",
      Immagine: "./src/assets/TravelTracker.png"  
    },
    {
      Nome: 'Crypto Bot',
      Descrizione: 'A Python bot that analyzes the iMACD indicator to detect market trends and sends real-time buy and sell signals via Telegram. Ideal for automating basic crypto or stock trading alerts.',
      Immagine: './src/assets/work.jpg'
    }
    ])
  }, [])

  return (
    <div className='min-h-screen pt-32 pb-16 flex items-center justify-center bg-gradient-to-tr from-amber-300 via-sky-400 to-purple-500 '>
      <div className=" flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 md:justify-items-center justify-center items-center gap-y-8 md:gap-x-8">
        {
          projects.length <= 0 ? <div>fetching...</div> :
            projects.map((project, index) => (
              <motion.div
                initial={{ opacity: 0, x:100}}
                whileInView={{ opacity: 1, x:0 }}
                transition={{
                  delay: index * 0.2,
                  duration: 1,
                  ease: "easeInOut",
                }}
                viewport={{ once: true, amount: 0.1 }}
                
                key={index} className="max-w-sm min-w-sm bg-white  border-gray-200 border-2 rounded-lg shadow-md">
                <a href={project.Url} target="_blank" rel="noopener noreferrer" className='flex justify-center '>
                  <img className="rounded-t-lg max-h-52" src={project.Immagine} alt={project.Nome} />
                </a>
                <div className="p-5">
                  <a href={project.Url} target="_blank" rel="noopener noreferrer">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                      {project.Nome}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal line-clamp-3 text-gray-700">
                    {project.Descrizione}
                  </p>
                  {project.Url ? <a
                    href={project.Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a> : <a></a>}
                </div>
              </motion.div>
            ))
        }
      </div>
    </div>
  )
}

export default Projects