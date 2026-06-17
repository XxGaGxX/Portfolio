import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { getPersonalInfo } from "../utils/data";
import { EMAILJS_CONFIG } from "../utils/emailjs";

const personal = getPersonalInfo();

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 20) newErrors.message = "Message must be at least 20 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    if (!EMAILJS_CONFIG.publicKey || !EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId) {
      console.error("EmailJS is not configured. Add VITE_EMAILJS_* vars to .env");
      setStatus("error");
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: personal.email,
        },
        EMAILJS_CONFIG.publicKey
      );

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

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
            <span className="label text-primary-600">Contact</span>
            <h1 className="text-display-sm sm:text-display-md font-bold text-neutral-900 mt-4 mb-6 leading-tight">
              Let's Start a Conversation
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Have a project in mind? Need a technical audit? Looking for a senior developer to join your team?
              I'd love to hear about it. Fill out the form or reach out directly.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Contact Form & Info */}
      <section className="section bg-neutral-50" aria-labelledby="contact-title">
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="card p-6 sm:p-8 h-full">
                <h2 id="contact-title" className="text-heading-lg font-semibold text-neutral-900 mb-6">Get In Touch</h2>
                <p className="text-neutral-600 mb-8">
                  I typically respond within 24 hours on weekdays. Whether it's a quick question or a detailed project proposal, don't hesitate to reach out.
                </p>

                <div className="space-y-6">
                  <a
                    href={`mailto:${personal.email}`}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white border border-neutral-100 hover:border-primary-200 hover:bg-primary-50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">Email</h3>
                      <p className="text-neutral-600 text-sm">{personal.email}</p>
                    </div>
                  </a>

                  <a
                    href={personal.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-xl bg-white border border-neutral-100 hover:border-primary-200 hover:bg-primary-50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">GitHub</h3>
                      <p className="text-neutral-600 text-sm">github.com/XxGaGxX</p>
                    </div>
                  </a>

                  <a
                    href={personal.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-xl bg-white border border-neutral-100 hover:border-primary-200 hover:bg-primary-50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">LinkedIn</h3>
                      <p className="text-neutral-600 text-sm">linkedin.com/in/diegovagnini</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Availability */}
              <div className="card p-6 sm:p-8 bg-primary-50 border-primary-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-heading-sm font-semibold text-primary-900">Current Availability</h3>
                </div>
                <p className="text-primary-800">
                  <strong>Open for opportunities</strong> — Freelance, contract, and full-time positions.
                  Based in {personal.location}, working remotely worldwide.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div
                className="card p-6 sm:p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                <h2 className="text-heading-lg font-semibold text-neutral-900 mb-6">Send a Message</h2>

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-6 rounded-xl bg-success-50 border border-success-200 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-heading-sm font-semibold text-success-900 mb-2">Message Sent!</h3>
                      <p className="text-success-800 mb-4">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="btn bg-success-500 text-white hover:bg-success-600"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="space-y-6"
                      noValidate
                    >
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="label">Name *</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`input ${errors.name ? "border-error-500 focus:border-error-500 focus:ring-error-200" : ""}`}
                            placeholder="Your name"
                            aria-invalid={errors.name ? "true" : "false"}
                            aria-describedby={errors.name ? "name-error" : undefined}
                            disabled={status === "submitting"}
                          />
                          {errors.name && (
                            <p id="name-error" className="mt-1.5 text-sm text-error-600" role="alert">{errors.name}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="email" className="label">Email *</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`input ${errors.email ? "border-error-500 focus:border-error-500 focus:ring-error-200" : ""}`}
                            placeholder="you@example.com"
                            aria-invalid={errors.email ? "true" : "false"}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            disabled={status === "submitting"}
                          />
                          {errors.email && (
                            <p id="email-error" className="mt-1.5 text-sm text-error-600" role="alert">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="label">Subject *</label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`input ${errors.subject ? "border-error-500 focus:border-error-500 focus:ring-error-200" : ""}`}
                          disabled={status === "submitting"}
                          aria-invalid={errors.subject ? "true" : "false"}
                          aria-describedby={errors.subject ? "subject-error" : undefined}
                        >
                          <option value="">Select a topic</option>
                          <option value="project">Project Inquiry</option>
                          <option value="freelance">Freelance Work</option>
                          <option value="fulltime">Full-time Opportunity</option>
                          <option value="collaboration">Collaboration</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.subject && (
                          <p id="subject-error" className="mt-1.5 text-sm text-error-600" role="alert">{errors.subject}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="message" className="label">Message *</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          className={`input resize-y min-h-[140px] ${errors.message ? "border-error-500 focus:border-error-500 focus:ring-error-200" : ""}`}
                          placeholder="Tell me about your project, timeline, budget, or just say hello..."
                          aria-invalid={errors.message ? "true" : "false"}
                          aria-describedby={errors.message ? "message-error" : "message-hint"}
                          disabled={status === "submitting"}
                        />
                        {errors.message ? (
                          <p id="message-error" className="mt-1.5 text-sm text-error-600" role="alert">{errors.message}</p>
                        ) : (
                          <p id="message-hint" className="mt-1.5 text-sm text-neutral-500">Minimum 20 characters</p>
                        )}
                      </div>

                      {status === "error" && (
                        <div className="p-4 rounded-xl bg-error-50 border border-error-200 text-error-800" role="alert">
                          Something went wrong. Please try again or email me directly at {personal.email}.
                        </div>
                      )}

                      <div className="flex items-center gap-4 pt-4">
                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          className="btn btn-primary px-8 py-3"
                        >
                          {status === "submitting" ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                  </svg>
                                  Sending...
                                </>
                              ) : (
                                <>
                                  Send Message
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                  </svg>
                                </>
                              )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData({ name: "", email: "", subject: "", message: "" })}
                          className="btn btn-ghost"
                          disabled={status === "submitting"}
                        >
                          Clear
                        </button>
                      </div>

                      <p className="text-sm text-neutral-500 text-center">
                        I'll get back to you within 24 hours on weekdays.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section bg-white border-y border-neutral-100" aria-labelledby="faq-title">
        <div className="container">
          <div className="section-title max-w-2xl mx-auto mb-16">
            <span className="label">Common Questions</span>
            <h2 id="faq-title">FAQs</h2>
            <div className="divider" />
            <p className="text-neutral-600 mt-4">Quick answers to questions I often receive</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "What's your availability for new projects?",
                a: "I'm currently open for freelance, contract, and full-time opportunities. I typically have 2-4 week lead time for new engagements, but feel free to reach out regardless — timelines can be flexible.",
              },
              {
                q: "What's your typical project process?",
                a: "Discovery call → Proposal & timeline → Design/spec review → Development with weekly check-ins → Testing & deployment → Handoff & documentation. I adapt this based on project scope and your preferences.",
              },
              {
                q: "Do you work with teams or solo?",
                a: "Both. I've led small teams, paired with designers, and worked as a solo contributor. I'm comfortable integrating into existing workflows or establishing new ones.",
              },
              {
                q: "What's your rate?",
                a: "Rates vary by engagement type (project-based, retainer, or full-time). I'm transparent about pricing after understanding scope. Let's discuss your project first — no pressure.",
              },
              {
                q: "Can you work in my timezone?",
                a: "I'm based in Italy (CET/CEST). I'm flexible and can adapt to your preferred working hours within reason — just let me know what works best for you.",
              },
            ].map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
                className="group card p-6"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-heading-sm font-semibold text-neutral-900 pr-8">{faq.q}</h3>
                  <svg className="w-5 h-5 text-neutral-400 group-open:rotate-180 transition-transform duration-200 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-neutral-600 mt-4 pb-2">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-gradient-to-r from-primary-600 to-primary-700" aria-labelledby="final-cta-title">
        <motion.div
          className="container text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="max-w-2xl mx-auto">
            <h2 id="final-cta-title" className="text-display-sm font-bold text-white mb-4">
              Ready to Build Something?
            </h2>
            <p className="text-primary-100 text-body-lg mb-8 max-w-lg mx-auto">
              Let's discuss your project. No pressure, no spam — just a conversation about what you're building.
            </p>
            <a href={`mailto:${personal.email}`} className="btn bg-white text-primary-600 hover:bg-primary-50 px-8 py-3.5 text-base inline-flex items-center gap-2">
              Email Me Directly
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}