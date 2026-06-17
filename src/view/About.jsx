

import { motion } from "motion/react";
import { Link } from "react-router";
import { getPersonalInfo, getSkills } from "../utils/data";
import { useReducedMotion } from "../hooks";

const personal = getPersonalInfo();
const skills = getSkills();

export default function About() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-b from-neutral-50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-100/50 via-transparent to-transparent" aria-hidden="true" />

        <motion.div
          className="container relative z-10 py-20 sm:py-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="max-w-3xl">
            <span className="label text-primary-600">About Me</span>
            <h1 className="text-display-sm sm:text-display-md font-bold text-neutral-900 mt-4 mb-6 leading-tight">
              {personal.name}
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">{personal.bio}</p>
          </div>
        </motion.div>
      </section>

      {/* Skills Deep Dive */}
      <section id="skills" className="section bg-neutral-50" aria-labelledby="skills-title">
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="section-title max-w-2xl mx-auto mb-12">
            <span className="label">Technical Stack</span>
            <h2 id="skills-title">Skills & Technologies</h2>
            <div className="divider" />
            <p className="text-neutral-600 mt-4">Tools and technologies I use to build robust, scalable applications</p>
          </div>

          <div className="grid gap-6 md:gap-8">
            {Object.entries(skills).map(([category, items], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: reducedMotion ? 0 : catIndex * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="card p-6 sm:p-8"
              >
                <h3 className="text-heading-sm font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                  <span className="text-primary-600">//</span>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className="badge badge-neutral transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Approach */}
      <section
        id="approach"
        className="section bg-white border-y border-neutral-100"
        aria-labelledby="approach-title"
      >
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="section-title max-w-2xl mx-auto mb-16">
            <span className="label">How I Work</span>
            <h2 id="approach-title">Development Approach</h2>
            <div className="divider" />
            <p className="text-neutral-600 mt-4">Principles that guide my engineering decisions</p>
          </div>

          <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Clean Architecture",
                description: "Separation of concerns, dependency inversion, and domain-driven design. Code that's easy to test, extend, and reason about.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Performance First",
                description: "Optimizing for Core Web Vitals, bundle size, and runtime efficiency. Every millisecond counts for user experience.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Collaborative Development",
                description: "Clear communication, thorough code reviews, and shared ownership. Great software is built by great teams.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: reducedMotion ? 0 : index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="card p-6 sm:p-8 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 mx-auto mb-5">
                  {item.icon}
                </div>
                <h3 className="text-heading-sm font-semibold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-neutral-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-r from-primary-600 to-primary-700" aria-labelledby="cta-title">
        <motion.div
          className="container text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="max-w-2xl mx-auto">
            <h2 id="cta-title" className="text-display-sm font-bold text-white mb-4">
              Let's Work Together
            </h2>
            <p className="text-primary-100 text-body-lg mb-8 max-w-lg mx-auto">
              Whether you need a full application built, a technical audit, or a senior developer to join your team — I'd love to hear about your project.
            </p>
            <Link to="/contact" className="btn bg-white text-primary-600 hover:bg-primary-50 px-8 py-3.5 text-base inline-flex items-center gap-2">
              Get in Touch
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}