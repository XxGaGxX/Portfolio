import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Homepage from './view/Homepage'
import { motion } from "motion/react"


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
