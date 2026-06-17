import { BrowserRouter as Router, Routes, Route, Link } from 'react-router'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Homepage = lazy(() => import('./view/Homepage'))
const About = lazy(() => import('./view/About'))
const Projects = lazy(() => import('./view/Projects'))
const Contact = lazy(() => import('./view/Contact'))

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center max-w-md px-6">
        <h1 className="text-display-lg font-bold text-neutral-900 mb-4">404</h1>
        <p className="text-xl text-neutral-600 mb-8">Page not found — the path you followed doesn&apos;t exist.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="btn btn-primary px-8 py-3 text-base">
            Back to Home
          </Link>
          <Link to="/projects" className="btn btn-outline px-8 py-3 text-base">
            View Projects
          </Link>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <main id="main">
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
          </div>}>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/about' element={<About />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='/projects/:id' element={<Projects />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App