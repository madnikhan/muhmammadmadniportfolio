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
  liveUrl?: string;
  video?: { src: string; poster?: string };
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
  {
    slug: "invoice-manager",
    title: "Invoice Manager — SME Invoicing Platform",
    shortTitle: "Invoice Manager",
    role: "Full Stack Developer",
    summary:
      "Web application for creating invoices, tracking receivables, and giving small teams clearer cash-flow visibility without a full accounting suite.",
    problem:
      "Micro-businesses often rely on spreadsheets for invoices and payment follow-up, losing visibility on aging balances.",
    outcome:
      "Delivered a modern invoicing product surface with customer billing flows and operational clarity for SME finance routines.",
    technologies: ["Next.js", "React", "TypeScript", "Vercel"],
    features: [
      "Invoice creation and management",
      "Customer billing workflows",
      "Receivables visibility",
      "Cloud deployment on Vercel",
    ],
    images: [
      {
        src: "/projects/invoice-manager/hero.png",
        alt: "Invoice Manager application hero screen",
      },
      {
        src: "/projects/invoice-manager/screen-2.png",
        alt: "Invoice Manager scrolled content view",
      },
    ],
    liveUrl: "https://invoicemanager-pi.vercel.app/",
    video: {
      src: "/projects/invoice-manager/demo.webm",
      poster: "/projects/invoice-manager/hero.png",
    },
  },
  {
    slug: "zarkari-ecommerce",
    title: "ZARKARI — Designer Formal Wear E-commerce",
    shortTitle: "ZARKARI E-commerce",
    role: "Full Stack Developer",
    summary:
      "UK e-commerce storefront for designer formal wear — catalogue browsing, product detail, and customer shopping flows.",
    problem:
      "A formal-wear brand needed a polished online catalogue and purchase path aligned with a premium product range.",
    outcome:
      "Shipped a responsive commerce front end with catalogue collections, product presentation, and conversion-focused UX.",
    technologies: ["Next.js", "TypeScript", "React", "E-commerce"],
    features: [
      "Product catalogue and collections",
      "Product detail presentation",
      "Responsive shopping experience",
      "UK brand storefront",
    ],
    images: [
      {
        src: "/projects/zarkari-ecommerce/hero.png",
        alt: "ZARKARI e-commerce homepage",
      },
      {
        src: "/projects/zarkari-ecommerce/screen-2.png",
        alt: "ZARKARI catalogue section",
      },
    ],
    liveUrl: "https://www.zarkari.co.uk/",
    github: "https://github.com/madnikhan/zarkari",
    video: {
      src: "/projects/zarkari-ecommerce/demo.webm",
      poster: "/projects/zarkari-ecommerce/hero.png",
    },
  },
  {
    slug: "lstf-education",
    title: "LSTF — Financial Education Platform Site",
    shortTitle: "LSTF Education Site",
    role: "Web Application Developer",
    summary:
      "Marketing and education website for London School of Trading and Finance — programs, webinars, and institutional positioning.",
    problem:
      "An education provider needed a clear UK-facing site to present programs, founder credibility, and enrolment paths.",
    outcome:
      "Built a structured education marketing site with program discovery, partnership messaging, and conversion CTAs.",
    technologies: ["Next.js", "React", "TypeScript", "Content-driven UI"],
    features: [
      "Program and course presentation",
      "Webinar and enrolment CTAs",
      "Founder / about storytelling",
      "Responsive education marketing UX",
    ],
    images: [
      {
        src: "/projects/lstf-education/hero.png",
        alt: "LSTF homepage hero",
      },
      {
        src: "/projects/lstf-education/screen-2.png",
        alt: "LSTF programs section",
      },
    ],
    liveUrl: "https://www.lstfinance.com/",
    video: {
      src: "/projects/lstf-education/demo.webm",
      poster: "/projects/lstf-education/hero.png",
    },
  },
  {
    slug: "finest-plastering",
    title: "Finest Plastering — Marketing & Showcase Site",
    shortTitle: "Finest Plastering Site",
    role: "Full Stack Developer",
    summary:
      "Business marketing website for Venetian and specialty plastering — services, process, gallery, and enquiry flows.",
    problem:
      "A specialist trades business needed a premium web presence to explain services, process stages, and capture enquiries.",
    outcome:
      "Delivered a conversion-oriented marketing site with service detail, process storytelling, and visual showcase surfaces.",
    technologies: ["Next.js", "React", "TypeScript", "3D / gallery UI"],
    features: [
      "Service and pricing narrative",
      "Multi-stage process explanation",
      "Gallery and visual showcase",
      "Contact and enquiry paths",
    ],
    images: [
      {
        src: "/projects/finest-plastering/hero.png",
        alt: "Finest Plastering homepage",
      },
      {
        src: "/projects/finest-plastering/screen-2.png",
        alt: "Finest Plastering services section",
      },
    ],
    liveUrl: "https://finestplastering-flax.vercel.app/",
    video: {
      src: "/projects/finest-plastering/demo.webm",
      poster: "/projects/finest-plastering/hero.png",
    },
  },
  {
    slug: "fumari-rms",
    title: "Fumari — Restaurant Management System",
    shortTitle: "Fumari Restaurant System",
    role: "Full Stack Developer",
    summary:
      "Restaurant operations platform with authenticated admin dashboards for tables, floor operations, and staff workflows.",
    problem:
      "Venues need reliable digital tooling for table management and back-of-house coordination beyond paper floor plans.",
    outcome:
      "Built an authenticated restaurant management dashboard covering tables and operational views for live service environments.",
    technologies: ["Next.js", "React", "TypeScript", "Auth", "Dashboard UI"],
    features: [
      "Staff authentication",
      "Tables / floor dashboard",
      "Operational admin views",
      "Hospitality-focused UX",
    ],
    images: [
      {
        src: "/projects/fumari-rms/hero.png",
        alt: "Fumari restaurant management dashboard",
      },
      {
        src: "/projects/fumari-rms/screen-2.png",
        alt: "Fumari tables dashboard view",
      },
    ],
    liveUrl: "https://fumari.vercel.app/dashboard/tables",
    video: {
      src: "/projects/fumari-rms/demo.webm",
      poster: "/projects/fumari-rms/hero.png",
    },
  },
  {
    slug: "sparex-parts",
    title: "Sparex — Vehicle Parts Storefront",
    shortTitle: "Sparex Parts Store",
    role: "Full Stack Developer",
    summary:
      "New and used vehicle parts storefront with registration/model lookup, product browsing, cart, and sign-in flows.",
    problem:
      "Parts buyers need a fast way to find compatible components by vehicle registration or model instead of browsing blindly.",
    outcome:
      "Delivered a parts commerce UX focused on vehicle-based search and catalogue browsing for aftermarket retail.",
    technologies: ["Next.js", "React", "TypeScript", "E-commerce"],
    features: [
      "Find parts by registration / model",
      "Product catalogue browsing",
      "Cart and account entry points",
      "Responsive retail storefront",
    ],
    images: [
      {
        src: "/projects/sparex-parts/hero.png",
        alt: "Sparex vehicle parts homepage",
      },
      {
        src: "/projects/sparex-parts/screen-2.png",
        alt: "Sparex parts finder interface",
      },
    ],
    liveUrl: "https://spareparts-liart.vercel.app/",
    video: {
      src: "/projects/sparex-parts/demo.webm",
      poster: "/projects/sparex-parts/hero.png",
    },
  },
  {
    slug: "motor-gurus",
    title: "Motor Gurus — Showroom & Dealership Platform",
    shortTitle: "Motor Gurus Showroom",
    role: "Full Stack Developer",
    summary:
      "End-to-end motor showroom and dealership platform covering vehicles, customers, orders, leads, reporting, and settings — with authenticated staff workflows.",
    problem:
      "Dealerships need a unified system for stock, customers, sales orders, lead intake, and operational reporting instead of fragmented spreadsheets and tools.",
    outcome:
      "Delivered a modern Next.js dealership app with tRPC APIs, Prisma/PostgreSQL on Supabase, NextAuth login, and operational modules for day-to-day showroom management.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "tRPC",
      "Zod",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "NextAuth",
      "Tailwind CSS",
      "TanStack Query",
      "Recharts",
      "Vercel",
    ],
    features: [
      "Staff authentication (credentials + JWT)",
      "Vehicle stock management",
      "Customers and orders",
      "Leads pipeline",
      "Reports and charts",
      "Settings and admin configuration",
    ],
    images: [
      {
        src: "/projects/motor-gurus/hero.png",
        alt: "Motor Gurus showroom dashboard",
      },
      {
        src: "/projects/motor-gurus/orders.png",
        alt: "Motor Gurus orders section",
      },
      {
        src: "/projects/motor-gurus/customers.png",
        alt: "Motor Gurus customers section",
      },
      {
        src: "/projects/motor-gurus/vehicles.png",
        alt: "Motor Gurus vehicles section",
      },
      {
        src: "/projects/motor-gurus/leads.png",
        alt: "Motor Gurus leads section",
      },
      {
        src: "/projects/motor-gurus/reports.png",
        alt: "Motor Gurus reports section",
      },
      {
        src: "/projects/motor-gurus/settings.png",
        alt: "Motor Gurus settings section",
      },
    ],
    liveUrl: "https://showroom-tawny.vercel.app/",
    video: {
      src: "/projects/motor-gurus/demo.webm",
      poster: "/projects/motor-gurus/hero.png",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
