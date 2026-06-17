

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NavLink, useLocation } from "react-router";
import { useReducedMotion } from "../hooks";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const transition = reducedMotion
    ? { duration: 0.01 }
    : { duration: 0.3, ease: [0.4, 0, 0.2, 1] };

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <motion.header
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-neutral-200"
            : "bg-transparent"
        }`}
        style={{ willChange: "transform, box-shadow", zIndex: 300 }}
        initial={false}
      >
        <nav
          className="container mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between h-16 lg:h-20">
            <NavLink
              to="/"
              className="flex items-center gap-2 text-xl font-bold text-neutral-900 hover:text-primary-600 transition-colors focus-ring"
              aria-label="Diego Vagnini - Home"
            >
              <span className="text-primary-600">DV</span>
              <span className="hidden sm:block">Diego Vagnini</span>
            </NavLink>

            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors relative py-1 ${
                      isActive
                        ? "text-primary-600"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`
                  }
                  end={link.path === "/"}
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <motion.span
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                        initial={false}
                        animate={{ width: isActive ? "100%" : "0%" }}
                        transition={transition}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <NavLink
                to="/projects"
                className="btn btn-secondary text-sm px-4 py-2"
              >
                View Work
              </NavLink>
              <NavLink
                to="/contact"
                className="btn btn-primary text-sm px-4 py-2"
              >
                Get in Touch
              </NavLink>
            </div>

            <button
              className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors focus-ring"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
          >
            <motion.div
              className="absolute inset-0 bg-neutral-900/50"
              onClick={toggleMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={transition}
            >
              <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                <span className="text-lg font-semibold text-neutral-900">Menu</span>
                <button
                  onClick={toggleMenu}
                  className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors focus-ring"
                  aria-label="Close menu"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 p-6 space-y-4 overflow-y-auto" aria-label="Mobile navigation">
                {NAV_LINKS.map((link, index) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        isActive
                          ? "bg-primary-50 text-primary-700 border-l-4 border-primary-600"
                          : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                      }`
                    }
                    end={link.path === "/"}
                    style={{ transitionDelay: reducedMotion ? 0 : `${index * 50}ms` }}
                  >
                    {link.label}
                  </NavLink>
                ))}

                <div className="pt-6 border-t border-neutral-200 flex flex-col gap-3">
                  <NavLink
                    to="/projects"
                    onClick={toggleMenu}
                    className="btn btn-secondary w-full justify-center"
                  >
                    View Work
                  </NavLink>
                  <NavLink
                    to="/contact"
                    onClick={toggleMenu}
                    className="btn btn-primary w-full justify-center"
                  >
                    Get in Touch
                  </NavLink>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}