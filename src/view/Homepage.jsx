import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { getPersonalInfo, getStats } from "../utils/data";
import { useReducedMotion } from "../hooks";

const personal = getPersonalInfo();
const stats = getStats();

const GRID_PATTERN = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232d5891' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

export default function Homepage() {
  const reducedMotion = useReducedMotion();
  const [imgErrors, setImgErrors] = useState({});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.1,
        delayChildren: reducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.01 : 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const handleImgError = (projectId) => {
    setImgErrors((prev) => ({ ...prev, [projectId]: true }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-50 to-white"
        aria-labelledby="hero-title"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-100/50 via-transparent to-transparent" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `url("${GRID_PATTERN}")` }}
          aria-hidden="true"
        />

        <motion.div
          className="container relative z-10 px-4 sm:px-6 lg:px-8 py-20 sm:py-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium border border-primary-100 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" aria-hidden="true" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" aria-hidden="true" />
              </span>
              Available for freelance & contract work
            </motion.div>

            <motion.h1
              id="hero-title"
              variants={itemVariants}
              className="text-display-lg sm:text-display-md font-bold text-neutral-900 leading-tight mb-6 text-balance"
            >
              I Build <span className="gradient-text">Scalable</span> Web Applications
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-neutral-600 max-w-2xl mx-auto mb-6 leading-relaxed"
            >
              Clean architecture, robust code, and modern tech stacks that power businesses.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-sm text-neutral-500 font-medium mb-10"
            >
              — {personal.name}, {personal.title}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link
                to="/projects"
                className="btn btn-primary text-base px-8 py-3.5"
              >
                View My Work
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="btn btn-outline text-base px-8 py-3.5"
              >
                Get in Touch
              </Link>
            </motion.div>

            {/* Stats - Fixed to 3 columns */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto"
            >
              {Object.entries(stats).map(([key, value], index) => (
                <motion.div
                  key={key}
                  className="text-center p-4 sm:p-6 rounded-2xl bg-white border border-neutral-100"
                  style={{
                    transitionDelay: reducedMotion ? 0 : `${index * 80}ms`,
                  }}
                >
                  <div className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-1">{value}</div>
                  <div className="text-sm text-neutral-500 font-medium">
                    {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400"
          initial={false}
          animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-xs font-medium uppercase tracking-wider hidden sm:block">Scroll</span>
        </motion.div>
      </section>

      {/* Featured Projects Preview */}
      <section
        id="featured"
        className="section bg-neutral-50"
        aria-labelledby="featured-title"
      >
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="section-title max-w-2xl mx-auto mb-12">
            <span className="label">Featured Work</span>
            <h2 id="featured-title">Recent Projects</h2>
            <div className="divider" />
            <p className="text-neutral-600 mt-4">
              A selection of projects showcasing different domains and technologies
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
            {[
              {
                id: "blockvision",
                title: "BlockVision",
                tagline: "Crypto & NFT Analytics Platform",
                description: "Real-time market data, interactive charts, portfolio tracking, and advanced filtering across multiple blockchain networks.",
                tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "WebSocket", "Chart.js"],
                image: "/BlockVision.svg",
              },
              {
                id: "traveltracker",
                title: "TravelTracker",
                tagline: "Collaborative Travel Logging — School Project",
                description: "A travel logging web app built with Vue.js and Firebase during my school-work alternance program in 5th year of high school.",
                tech: ["Vue.js 3", "Firebase", "Pinia", "Tailwind CSS", "PWA", "IndexedDB"],
                image: "/TravelTracker.svg",
              },
              {
                id: "crypto-bot",
                title: "Crypto Trading Bot",
                tagline: "Algorithmic Signal Generator",
                description: "Multi-timeframe MACD strategy with volume confirmation, risk management, and Telegram alerts.",
                tech: ["Python", "asyncio", "ccxt", "TA-Lib", "Telegram API", "Docker"],
                image: "/work.svg",
              },
            ].map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: reducedMotion ? 0 : index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="card overflow-hidden"
              >
                <Link to={`/projects/${project.id}`} className="block" aria-label={`View ${project.title} project`}>
                  <div className="relative aspect-video overflow-hidden">
                    {!imgErrors[project.id] && (
                      <img
                        src={project.image}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                        onError={() => handleImgError(project.id)}
                      />
                    )}
                    {imgErrors[project.id] && (
                      <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                        <span className="text-neutral-400 text-sm">Image unavailable</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-heading-sm font-semibold text-neutral-900 mb-1">{project.title}</h3>
                      <p className="text-sm text-neutral-500">{project.tagline}</p>
                    </div>
                  </div>
                  <p className="text-neutral-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span key={tech} className="badge badge-primary text-xs">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="badge badge-neutral text-xs">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    View Case Study
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="btn btn-outline px-8 py-3 inline-flex items-center gap-2"
            >
              View All Projects
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        className="section bg-gradient-to-r from-primary-600 to-primary-700"
        aria-labelledby="cta-title"
      >
        <motion.div
          className="container text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="max-w-2xl mx-auto">
            <h2 id="cta-title" className="text-display-sm font-bold text-white mb-4">
              Ready to Build Something Great?
            </h2>
            <p className="text-primary-100 text-body-lg mb-8 max-w-lg mx-auto">
              I&apos;m currently available for freelance projects, contract work, and full-time opportunities. Let&apos;s discuss how I can help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="btn bg-white text-primary-600 hover:bg-primary-50 px-8 py-3.5 text-base"
              >
                Start a Conversation
              </Link>
              <Link
                to="/projects"
                className="btn btn-ghost text-white hover:bg-white/10 border-white/20 px-8 py-3.5 text-base"
              >
                See My Work
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
