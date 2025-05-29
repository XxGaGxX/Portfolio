"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen((prev) => !prev)

    return (
        <>
            <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-3/4 z-50 bg-white shadow-md rounded-3xl mt-3">
                <nav className="flex items-center justify-between px-6 py-4 lg:px-12 max-w-7xl mx-auto">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a
                            href="/"
                            className="text-xl font-bold text-gray-900 hover:text-yellow-500 transition-colors duration-300"
                        >
                            My Portfolio
                        </a>
                    </div>

                    {/* Desktop links */}
                    <div className="hidden lg:flex gap-10 items-center">
                        <a href="/projects" className="text-sm font-bold text-gray-700 hover:text-yellow-500 transition">
                            Projects
                        </a>
                        <a href="/studies" className="text-sm font-bold text-gray-700 hover:text-yellow-500 transition">
                            Studies
                        </a>
                        <a href="/contacts" className="text-sm font-bold text-gray-700 hover:text-yellow-500 transition">
                            Contact me
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 hover:text-yellow-500 p-2 transition"
                            aria-label="Toggle menu"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile menu overlay - moved outside header */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[60] lg:hidden">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-black/50"
                            onClick={toggleMenu}
                        />

                        {/* Menu panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
                                    <button
                                        onClick={toggleMenu}
                                        className="text-gray-600 hover:text-red-500 p-2 rounded-lg hover:bg-gray-100 transition"
                                        aria-label="Close menu"
                                    >
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Navigation links */}
                                <nav className="flex flex-col p-6 space-y-6">
                                    <a
                                        href="/"
                                        className="text-gray-800 hover:text-yellow-500 text-lg font-bold transition-colors duration-200 py-2"
                                        onClick={toggleMenu}
                                    >
                                        Home
                                    </a>
                                    <a
                                        href="/projects"
                                        className="text-gray-800 hover:text-yellow-500 text-lg font-bold transition-colors duration-200 py-2"
                                        onClick={toggleMenu}
                                    >
                                        Projects
                                    </a>
                                    <a
                                        href="/studies"
                                        className="text-gray-800 hover:text-yellow-500 text-lg font-bold transition-colors duration-200 py-2"
                                        onClick={toggleMenu}
                                    >
                                        Studies
                                    </a>
                                    <a
                                        href="/contacts"
                                        className="text-gray-800 hover:text-yellow-500 text-lg font-bold transition-colors duration-200 py-2"
                                        onClick={toggleMenu}
                                    >
                                        Contact me
                                    </a>
                                    
                                </nav>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar
