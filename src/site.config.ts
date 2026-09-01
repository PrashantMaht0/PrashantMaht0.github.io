/**
 * Single source of truth for identity, navigation and SEO defaults.
 * No component may hardcode any of this.
 *
 * Education, skills and certifications live here rather than in a content
 * collection: they are identity, not publishable content, and the CMS's write
 * surface is deliberately limited to src/content/ and src/assets/.
 */

// TODO: replace with the real custom domain once it is bought (Context.md §11).
export const siteUrl = 'https://example.com';

export const site = {
  name: 'Prashant Mahto',
  greeting: "Hi I'm",
  role: 'AI Engineer & Software Developer',
  tagline: 'AI Engineer & Software Developer',
  bio: 'I am a software developer from India currently based in Ireland, completing an MSc in Software Design with Artificial Intelligence. I specialize in backend architecture and building applied AI solutions. My work focuses on designing logical, scalable systems to solve practical, real-world problems.',
  description:
    'Portfolio of Prashant Mahto — AI engineer and software developer. Project case studies and weekly writing.',
  author: 'Prashant Mahto',
  email: 'prashantmahto111@gmail.com',
  locale: 'en',
  ogImage: '/og-default.jpeg',
  resume: '/resume.pdf',
  portrait: '/profile_pic/profile_pic.jpeg',
} as const;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blogs', href: '/blog' },
] as const;

/** The four bordered icon buttons in the top right of the header. */
export const headerLinks = [
  { mark: 'GH', tip: 'GitHub', href: 'https://github.com/PrashantMaht0', icon: '/icons/github.svg' },
  {
    mark: 'IN',
    tip: 'LinkedIn',
    href: 'https://www.linkedin.com/in/prashant-mahto-',
    icon: '/icons/linkedin.svg',
  },
  // '@' and '↓' stay as glyphs — real typographic marks, not placeholders.
  { mark: '@', tip: 'Email', href: 'mailto:prashantmahto111@gmail.com' },
  { mark: '↓', tip: 'Download resume', href: '/resume.pdf' },
] as const;

/** The larger squares in the "Follow Me" section. */
export const socials = [
  { label: 'X', href: 'https://x.com/PrashantMahto17', icon: '/icons/x-twitter-brands-solid-full.svg' },
  { label: 'GitHub', href: 'https://github.com/PrashantMaht0', icon: '/icons/github.svg' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/prashant-mahto-', icon: '/icons/linkedin.svg' },
  { label: 'Substack', href: 'https://substack.com/@notprax', icon: '/icons/substack-mono.svg' },
] as const;

/** The sticky "On this page" rail. Ids must match `data-section` on the homepage. */
export const homeSections = [
  { id: 'about', label: 'About Me', number: '01' },
  { id: 'education', label: 'Education', number: '02' },
  { id: 'experience', label: 'Experience', number: '03' },
  { id: 'stack', label: 'Tech Stack', number: '04' },
  { id: 'certifications', label: 'Certifications', number: '05' },
  { id: 'follow', label: 'Follow Me', number: '06' },
] as const;

export const education = [
  {
    school: 'Technological University of Shannon, Athlone',
    degree: 'MSc in Software Design with AI',
    place: 'Athlone, Co. Westmeath, Ireland',
    dates: 'Sep 2025 — Oct 2026',
  },
  {
    school: 'MIT Arts Design and Technology University',
    degree: "Bachelor's in Computer Application with Applied Data Science",
    place: 'Pune, Maharashtra, India',
    dates: 'Jul 2022 — May 2025',
  },
  {
    school: 'Ness Wadia College of Commerce',
    degree: 'Higher Secondary Education',
    place: 'Pune, Maharashtra, India',
    dates: '2020 — Apr 2022',
  },
] as const;

export const skills = [
  { name: 'Java', tag: 'lang' },
  { name: 'Spring Boot', tag: 'backend' },
  { name: 'Python', tag: 'lang' },
  { name: 'React', tag: 'frontend' },
  { name: 'TypeScript', tag: 'lang' },
  { name: 'PostgreSQL', tag: 'data' },
  { name: 'pgvector', tag: 'data' },
  { name: 'LangGraph', tag: 'ai' },
  { name: 'AutoGen', tag: 'ai' },
  { name: 'Qdrant', tag: 'data' },
] as const;

export const certifications = [
  {
    issuer: 'Microsoft',
    title: 'Microsoft Certified: Azure AI Apps and Agents Developer Associate',
    year: '2026',
    link : 'https://learn.microsoft.com/en-us/users/prashantmahto-3258/credentials/5a852a4b04d0d881?ref=https%3A%2F%2Fwww.linkedin.com%2F',
  },
  {
    issuer: 'Amazon (Coursera)',
    title: 'Amazon Junior Software Developer Professional Certificate',
    year: '2026',
    link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/2J1WRYAJIUCF',
  },
  {
    issuer: 'IBM (Coursera)',
    title: 'IBM DevOps, Cloud, and Agile Foundations',
    year: '2026',
    link: 'https://coursera.org/share/7664d4da2ff14c5d1612eaa239814d57',
  },
  {
    issuer: 'IBM (Coursera)',
    title: 'IBM RAG And Agentic AI ',
    year: '2026',
    link: 'https://coursera.org/share/b9397182e9a540fe666f58b5e63058da',
  },
] as const;
