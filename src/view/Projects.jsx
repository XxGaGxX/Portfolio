

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useParams, useNavigate } from "react-router";
import { getProjects, getProjectById, getPersonalInfo } from "../utils/data";
import { useReducedMotion } from "../hooks";

const projects = getProjects();
const personal = getPersonalInfo();

const categoryIcons = {
  frontend: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 002 2v14a2 2 0 002 2z" />
    </svg>
  ),
  backend: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  database: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  cloud: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  default: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
};

function getCategoryIcon(tech) {
  const lower = tech.toLowerCase();
  if (["react", "vue.js", "vue", "angular", "svelte", "html", "css", "javascript", "typescript", "tailwind", "next.js", "nuxt"].includes(lower)) {return categoryIcons.frontend;}
  if (["node.js", "express", "nestjs", ".net", "c#", "python", "fastapi", "django", "go", "rust", "java"].includes(lower)) {return categoryIcons.backend;}
  if (["postgresql", "mysql", "mongodb", "redis", "sql", "sqlite", "prisma", "typeorm", "drizzle"].includes(lower)) {return categoryIcons.database;}
  if (["aws", "docker", "kubernetes", "vercel", "netlify", "github actions", "gitlab", "ci/cd", "terraform"].includes(lower)) {return categoryIcons.cloud;}
  return categoryIcons.default;
}

function ProjectDetail({ project }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-neutral-50 border-b border-neutral-100" aria-label="Breadcrumb">
        <div className="container py-4">
          <ol className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <li>
              <Link to="/" className="text-neutral-500 hover:text-neutral-700 transition-colors">Home</Link>
            </li>
            <li className="text-neutral-300" aria-hidden="true">/</li>
            <li>
              <Link to="/projects" className="text-neutral-500 hover:text-neutral-700 transition-colors">Projects</Link>
            </li>
            <li className="text-neutral-300" aria-hidden="true">/</li>
            <li className="text-neutral-900 font-medium" aria-current="page">{project.name}</li>
          </ol>
        </div>
      </nav>

      <section className="py-12 sm:py-16 lg:py-20" aria-labelledby="project-title">
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="badge badge-primary">
                      {getCategoryIcon(tech)}
                      {tech}
                    </span>
                  ))}
                </div>
                <h1 id="project-title" className="text-display-sm sm:text-display-md font-bold text-neutral-900 mb-4">{project.name}</h1>
                <p className="text-xl text-neutral-600 leading-relaxed">{project.tagline}</p>
              </div>

              <div className="card p-6 sm:p-8">
                <h2 className="text-heading-md font-semibold text-neutral-900 mb-4">Overview</h2>
                <p className="text-neutral-600 leading-relaxed">{project.longDescription || project.description}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="card p-6">
                  <h3 className="text-heading-sm font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    Highlights
                  </h3>
                  <ul className="space-y-3" role="list">
                    {project.highlights?.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3 text-neutral-600">
                        <span className="text-primary-600 mt-0.5 flex-shrink-0">→</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card p-6">
                  <h3 className="text-heading-sm font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Project Details
                  </h3>
                  <dl className="space-y-4" role="list">
                    <div className="flex justify-between py-2 border-b border-neutral-100 last:border-0">
                      <dt className="text-neutral-500">Role</dt>
                      <dd className="text-neutral-900 font-medium text-right">{project.role}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-neutral-100 last:border-0">
                      <dt className="text-neutral-500">Duration</dt>
                      <dd className="text-neutral-900 font-medium text-right">{project.duration}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-neutral-100 last:border-0">
                      <dt className="text-neutral-500">Technologies</dt>
                      <dd className="text-neutral-900 font-medium text-right">{project.technologies.length}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {project.liveUrl && !project.liveUrl.includes("example.com") && (
                <div className="flex items-center gap-4 pt-4 border-t border-neutral-200">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary px-6 py-3 inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Live Demo
                  </a>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline px-6 py-3 inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    View Source
                  </a>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="card p-6 sticky top-24"
              >
                <h3 className="text-heading-sm font-semibold text-neutral-900 mb-4">Project Image</h3>
                <div className="aspect-video rounded-xl overflow-hidden bg-neutral-100">
                  <img
                    src={project.image}
                    alt={`${project.name} screenshot`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="card p-6"
              >
                <h3 className="text-heading-sm font-semibold text-neutral-900 mb-4">Full Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="badge badge-neutral">
                      {getCategoryIcon(tech)}
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="card p-6"
              >
                <button
                  onClick={() => navigate(-1)}
                  className="btn btn-secondary w-full justify-center"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Projects
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const location = useLocation();
  const params = useParams();
  const reducedMotion = useReducedMotion();

  const isDetail = !!params.id;

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesFilter = filter === "all" || project.technologies.some((t) => t.toLowerCase().includes(filter.toLowerCase()));
      const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase()) || project.tagline.toLowerCase().includes(search.toLowerCase()) || project.description.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const usedTechnologies = useMemo(() => [...new Set(projects.flatMap((p) => p.technologies))].sort(), []);

  if (isDetail) {
    const projectId = params.id;
    const project = getProjectById(projectId);

    if (!project) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-heading-xl font-bold text-neutral-900 mb-4">Project Not Found</h1>
            <p className="text-neutral-600 mb-8">The project you&apos;re looking for doesn&apos;t exist.</p>
            <Link to="/projects" className="btn btn-primary">Back to Projects</Link>
          </motion.div>
        </div>
      );
    }

    return <ProjectDetail project={project} />;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-white border-b border-neutral-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-100/50 via-transparent to-transparent" aria-hidden="true" />

        <motion.div
          className="container relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="max-w-3xl">
            <span className="label text-primary-600">Portfolio</span>
            <h1 className="text-display-sm sm:text-display-md font-bold text-neutral-900 mt-4 mb-6 leading-tight">
              Selected Work
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              A collection of projects spanning web applications, data visualization, and developer tools.
              Each case study details the problem, approach, and technical decisions.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Filters & Search */}
      <section className="section bg-neutral-50 border-y border-neutral-100">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between"
          >
            <div className="relative max-w-md w-full">
              <label htmlFor="project-search" className="sr-only">Search projects</label>
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                id="project-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="input pl-12 w-full"
              />
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by technology">
              <button
                onClick={() => setFilter("all")}
                className={`btn ${filter === "all" ? "btn-primary" : "btn-secondary"}`}
                aria-pressed={filter === "all"}
              >
                All
              </button>
              {usedTechnologies.slice(0, 8).map((tech) => (
                <button
                  key={tech}
                  onClick={() => setFilter(tech)}
                  className={`btn ${filter === tech ? "btn-primary" : "btn-secondary"}`}
                  aria-pressed={filter === tech}
                >
                  {tech}
                </button>
              ))}
              {usedTechnologies.length > 8 && filter !== "all" && !usedTechnologies.slice(0, 8).includes(filter) && (
                <button
                  onClick={() => setFilter(filter)}
                  className="btn btn-primary"
                  aria-pressed={true}
                >
                  {filter}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section bg-white" aria-labelledby="projects-list-title">
        <div className="container">
          <div className="sr-only" id="projects-list-title">Projects</div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid gap-6 sm:gap-8"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))" }}
              role="list"
              aria-label="Projects"
            >
              {filteredProjects.length === 0 ? (
                <motion.div
                  className="col-span-full text-center py-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-heading-sm font-semibold text-neutral-900 mb-2">No projects found</h3>
                  <p className="text-neutral-600">Try adjusting your search or filter criteria.</p>
                </motion.div>
              ) : (
                filteredProjects.map((project, index) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: reducedMotion ? 0 : index * 0.05, ease: [0.4, 0, 0.2, 1] }}
                    className="card overflow-hidden group"
                    role="listitem"
                  >
                    <Link to={`/projects/${project.id}`} className="block focus-ring" aria-label={`View ${project.name} case study`}>
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={project.image}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span key={tech} className="badge badge-primary text-xs">
                              {getCategoryIcon(tech)}
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="badge badge-neutral text-xs">+{project.technologies.length - 4}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-heading-sm font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">{project.name}</h3>
                          <p className="text-sm text-neutral-500 mt-1">{project.tagline}</p>
                        </div>
                      </div>
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <span key={tech} className="badge badge-neutral text-xs">
                            {getCategoryIcon(tech)}
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="badge badge-neutral text-xs">+{project.technologies.length - 5} more</span>
                        )}
                      </div>
                      <Link
                        to={`/projects/${project.id}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors w-full justify-center py-2"
                      >
                        View Case Study
                        <motion.svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                          initial={{ x: 0 }}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </motion.svg>
                      </Link>
                    </div>
                  </motion.article>
                ))
              )}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length > 0 && (
            <motion.p
              className="text-center text-sm text-neutral-500 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Showing {filteredProjects.length} of {projects.length} projects
            </motion.p>
          )}
        </div>
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
              Want to See More?
            </h2>
            <p className="text-primary-100 text-body-lg mb-8 max-w-lg mx-auto">
              These are just a few highlights. I&apos;ve worked on many more projects — from internal tools to customer-facing products.
            </p>
            <a
              href={personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-white text-primary-600 hover:bg-primary-50 px-8 py-3.5 text-base inline-flex items-center gap-2"
            >
              View All on GitHub
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}