import portfolioData from "../data/portfolio.json";

export const getPersonalInfo = () => portfolioData.personal;
export const getExperience = () => portfolioData.experience;
export const getSkills = () => portfolioData.skills;
export const getProjects = () => portfolioData.projects;
export const getProjectById = (id) => portfolioData.projects.find((p) => p.id === id);
export const getTestimonials = () => portfolioData.testimonials;
export const getStats = () => portfolioData.stats;

export function truncateText(text, maxLength = 150) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function getSkillCategories(skills) {
  return Object.entries(skills).map(([category, items]) => ({
    key: category,
    label: category.charAt(0).toUpperCase() + category.slice(1),
    items,
  }));
}