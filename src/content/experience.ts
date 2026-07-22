export const softwareExperience = {
  title: "Full Stack Software Engineer — Business Systems",
  period: "Ongoing · 20+ years in IT",
  intro:
    "Designing and developing web applications, business management systems, and digital solutions across retail, hospitality, finance-adjacent tooling, and operational platforms — including cloud and on-prem deployments.",
  blocks: [
    {
      heading: "Restaurant / food operations platforms",
      bullets: [
        "Built full-stack ordering, kitchen display, staff, and payment flows with Next.js, TypeScript, and PostgreSQL.",
        "Translated real hospitality operations into practical software for POS and multi-role dashboards.",
        "Integrated modern payment and real-time order update patterns for live service environments.",
      ],
    },
    {
      heading: "Multi-branch retail / POS (Vendora)",
      bullets: [
        "Developed multi-app retail stack: admin, offline-capable POS, storefront, and staff mobile surfaces.",
        "Implemented PostgreSQL-backed inventory and branch workflows with Docker-ready deployment.",
        "Focused on reliability for till and back-office use in day-to-day retail operations.",
      ],
    },
    {
      heading: "Commerce, logistics, infra & surveillance systems",
      bullets: [
        "Delivered e-commerce, supplier portals, order tracking, invoicing, and logistics dashboards.",
        "Integrated payment terminal hardware, local server builds, and business networking for on-site deployments.",
        "Built and supported surveillance AI systems alongside immigration-style workflows, solicitor office patterns, and government-office automation among 250+ career deliveries.",
      ],
    },
  ],
} as const;

export const additionalExperience = [
  {
    title: "IT Support & Office Management — Printing services (USA)",
    bullets: [
      "Provided IT support and office systems for a box-printing and production business.",
      "Supported operational workflows, tooling, and day-to-day business administration.",
    ],
  },
  {
    title: "Hospitality & Takeaway Operations",
    bullets: [
      "Long-term takeaway and restaurant operations experience, including sous chef and management roles.",
      "Brings floor-level understanding of service pressure, stock discipline, and customer flow into POS and hospitality software design.",
    ],
  },
] as const;

export const skills = {
  frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
  backend: [
    "Node.js",
    "Python",
    "REST APIs",
    "Authentication",
    "Payment terminal integrations",
    "Server-side development",
  ],
  database: ["PostgreSQL", "MongoDB", "Neon", "Firebase Firestore", "MySQL", "Prisma", "Drizzle"],
  tools: [
    "Git",
    "GitHub",
    "Vercel",
    "Railway",
    "Blob storage",
    "Docker",
    "Cursor AI",
    "ChatGPT",
    "Anthropic Claude",
    "Local AI systems",
  ],
  infra: [
    "Local servers",
    "Business hardware install",
    "Networking",
    "Surveillance AI",
  ],
} as const;

export const technicalStrengths = [
  "Business-problem → practical software",
  "SME and operations fluency",
  "End-to-end delivery of complex management systems",
  "Domain depth across retail, hospitality, legal ops, and automation",
  "AI-augmented workspace for efficient, modern delivery",
  "On-prem servers, networking, and business hardware installation",
  "Payment terminals and surveillance AI systems",
] as const;
