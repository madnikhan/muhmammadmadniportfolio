export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  role: string;
  summary: string;
  problem: string;
  outcome: string;
  technologies: string[];
  features: string[];
  images: { src: string; alt: string }[];
  github?: string;
};

export const projects: Project[] = [
  {
    slug: "restaurant-food-ops",
    title: "Restaurant Management & Food Ops Platform",
    shortTitle: "Restaurant & Food Ops",
    role: "Full Stack Developer",
    summary:
      "End-to-end restaurant and food delivery operations platform covering ordering, kitchen display, staff workflows, and payments.",
    problem:
      "Hospitality businesses needed a unified system for front-of-house, kitchen, and payments instead of fragmented tills and paper processes.",
    outcome:
      "Delivered a multi-role Next.js platform with real-time order flow, kitchen display, menu management, and Stripe-ready payment paths — the kind of system shaped by years of real takeaway and restaurant operations experience.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Stripe",
    ],
    features: [
      "POS and order management",
      "Kitchen display system",
      "Menu and promotions",
      "Staff and role workflows",
      "Payment integration",
      "Analytics and reporting",
    ],
    images: [
      {
        src: "/projects/restaurant-dashboard.jpeg",
        alt: "Restaurant operations dashboard interface",
      },
    ],
    github: "https://github.com/madnikhan/smashdaddy",
  },
  {
    slug: "vendora-retail-pos",
    title: "Vendora — Multi-Branch Retail & Supermarket Platform",
    shortTitle: "Vendora Retail / POS",
    role: "Software Developer",
    summary:
      "Multi-branch supermarket management platform with offline-capable POS, admin, storefront, and staff mobile apps.",
    problem:
      "Retail operators running multiple branches needed consistent POS, stock visibility, click & collect, and back-office control on one stack.",
    outcome:
      "Built a monorepo product with admin, POS (including offline capability), customer storefront, and mobile surfaces — deployable with Docker and PostgreSQL.",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "Turbo monorepo",
      "PWA",
    ],
    features: [
      "Offline-capable POS terminal",
      "Multi-branch admin dashboard",
      "Click & collect storefront",
      "Staff and customer mobile apps",
      "Docker production deployment",
    ],
    images: [
      {
        src: "/projects/vendora-admin.jpeg",
        alt: "Vendora admin and customer dashboard",
      },
      {
        src: "/projects/vendora-pos.jpeg",
        alt: "POS cash-out section interface",
      },
    ],
  },
  {
    slug: "commerce-business-systems",
    title: "Business & Commerce Systems",
    shortTitle: "Commerce & Business Systems",
    role: "Full Stack / Business Systems Developer",
    summary:
      "E-commerce, bridal order management, logistics, and invoice automation — dashboards, admin panels, and operational workflows.",
    problem:
      "SMEs needed practical software for orders, suppliers, invoicing, and logistics without bloated enterprise suites.",
    outcome:
      "Delivered commerce and back-office systems with role-based portals, order tracking, reporting, and invoice tooling — selected from a wider body of 250+ project deliveries.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Drizzle ORM",
      "PostgreSQL",
      "Firebase",
      "Stripe",
    ],
    features: [
      "E-commerce storefront and admin",
      "Supplier and order workflows",
      "Customer order tracking",
      "Invoice and reporting tools",
      "Logistics and operations dashboards",
    ],
    images: [
      {
        src: "/projects/invoice-sync.png",
        alt: "Invoice synchronisation system interface",
      },
      {
        src: "/projects/sme-invoice.png",
        alt: "SME invoicing application screen",
      },
    ],
    github: "https://github.com/madnikhan/zarkari",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
