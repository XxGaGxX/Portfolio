import React, { useState } from 'react';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
            <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center justify-between">
                    <a className="flex-none text-xl font-semibold focus:outline-none focus:opacity-80" href="#" aria-label="GaG's Portfolio">
                        GaG's Portfolio
                    </a>
                    <div className="sm:hidden">
                        <button
                            type="button"
                            className="relative size-9 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                            onClick={toggleMenu}
                            aria-expanded={isOpen}
                            aria-label="Toggle navigation"
                        >
                            {/* Hamburger icon */}
                            <svg className={`${isOpen ? 'hidden' : 'block'} shrink-0 size-4`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                            {/* Close icon */}
                            <svg className={`${isOpen ? 'block' : 'hidden'} shrink-0 size-4`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18" />
                                <path d="M6 6 18 18" />
                            </svg>
                            <span className="sr-only">Toggle navigation</span>
                        </button>
                    </div>
                </div>
                <div
                    className={`${isOpen ? 'block' : 'hidden'} sm:block overflow-hidden transition-all duration-300 basis-full grow`}
                >
                    <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                        <a className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" href="#">Home</a>
                        <a className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" href="#">Projects</a>
                        <a className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" href="#">Contact me</a>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;