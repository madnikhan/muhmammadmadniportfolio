import { profile } from "./profile";
import {
  additionalExperience,
  skills,
  softwareExperience,
  technicalStrengths,
} from "./experience";

export const cv = {
  profile,
  summary: profile.summary,
  skills,
  softwareExperience,
  additionalExperience,
  education: profile.education,
  domainsLine:
    "E-commerce · Immigration casework · Solicitor ops · Gov office automation · AI traffic monitoring · Retail & POS · Hospitality systems",
  technicalStrengths,
} as const;
