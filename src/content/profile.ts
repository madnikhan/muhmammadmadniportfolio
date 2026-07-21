export const profile = {
  name: "Muhammad Madni",
  role: "Full Stack Software Engineer",
  headline:
    "Building modern software solutions with 20+ years of technology experience",
  subheading:
    "Full Stack Software Engineer specialising in business applications, automation systems, and modern web technologies.",
  location: "Newton-le-Willows, St Helens, Merseyside, UK",
  locationShort: "Merseyside, UK",
  email: "madnikhan1@gmail.com",
  phone: "07799 661026",
  phoneHref: "tel:+447799661026",
  linkedin: "https://www.linkedin.com/in/madnikhan786/",
  github: "https://github.com/madnikhan",
  portfolioUrl: "https://madnikhan.dev",
  yearsExperience: 20,
  projectsDelivered: 250,
  summary:
    "Full Stack Software Engineer with over 20 years in IT and 250+ delivered projects — from websites and e-commerce to complex enterprise-style management systems spanning retail, hospitality, legal and solicitor operations, immigration application workflows, government-office automation, and AI camera traffic monitoring. Experienced in React, Next.js, TypeScript, Node.js, and SQL databases. A software engineer who understands business problems, not just code.",
  domains: [
    "Web design",
    "E-commerce",
    "Static websites",
    "Web applications",
    "Management systems",
    "Immigration casework systems",
    "Solicitor office management",
    "Government-office automation",
    "AI traffic monitoring",
    "Retail & POS",
    "Hospitality ops",
    "Logistics",
  ],
  marqueeItems: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Firebase",
    "POS systems",
    "E-commerce",
    "Immigration workflows",
    "Solicitor ops",
    "Gov office automation",
    "AI traffic cameras",
    "Business dashboards",
    "REST APIs",
    "Prisma",
    "Tailwind CSS",
  ],
  education: [
    {
      title: "Masters in Commerce (Banking & Finance)",
      detail: "Completed",
    },
    {
      title: "M.Sc Computer Science",
      detail: "Two semesters, 2010–11 — degree not completed",
    },
    {
      title: "M.Sc IBM, Coventry University",
      detail: "Postgraduate study — degree not completed",
    },
    {
      title: "CFA Level 1 Candidate",
      detail: "Professional development",
    },
  ],
} as const;

export type Profile = typeof profile;
