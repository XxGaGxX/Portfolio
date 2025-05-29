import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Homepage from './view/Homepage'
import { motion } from "motion/react"
import Projects from './view/Projects'


function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/projects' element={ <Projects/> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
