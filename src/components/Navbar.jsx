import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
            <nav className="flex items-center justify-between px-6 py-4 lg:px-12 max-w-7xl mx-auto">
                {/* Logo */}
                <div className="flex items-center">
                    <a href="#" className="text-xl font-bold text-gray-900 hover:text-yellow-500 transition-colors duration-300">
                        My Portfolio
                    </a>
                </div>

                {/* Desktop links */}
                <div className="hidden lg:flex gap-10 items-center">
                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-yellow-500 transition">Projects</a>
                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-yellow-500 transition">Studies</a>
                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-yellow-500 transition">Contact me</a>
                </div>

                {/* Mobile menu button */}
                <div className="lg:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-700 hover:text-yellow-500 p-2 transition"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={toggleMenu}>
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.3 }}
                            className="absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
                                <button onClick={toggleMenu} className="text-gray-600 hover:text-red-500">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <nav className="flex flex-col space-y-4">
                                <a href="#" className="text-gray-800 hover:text-yellow-500 text-base font-medium transition">Projects</a>
                                <a href="#" className="text-gray-800 hover:text-yellow-500 text-base font-medium transition">Studies</a>
                                <a href="#" className="text-gray-800 hover:text-yellow-500 text-base font-medium transition">Contact me</a>
                            </nav>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Navbar;
