import { UNIVERSITIES_BY_COUNTRY } from "@/lib/universities";

export interface CountryGuide {
  slug: string;
  name: string;
  flag: string;
  overviewKey: string;
  visaInfoKey: string;
  avgTuitionRange: string;
  costOfLivingRange: string;
  currency: string;
  highlights: string[];
  topUniversitiesByMajor: Partial<Record<string, string[]>>;
}

// Pull top N universities for a given country from existing data
function getTopUnis(country: string, limit = 4): Partial<Record<string, string[]>> {
  const result: Partial<Record<string, string[]>> = {};
  for (const [major, countries] of Object.entries(UNIVERSITIES_BY_COUNTRY)) {
    const list = countries[country];
    if (list && list.length > 0) {
      result[major] = list.slice(0, limit);
    }
  }
  return result;
}

export const COUNTRY_GUIDES: CountryGuide[] = [
  {
    slug: "germany",
    name: "Germany",
    flag: "🇩🇪",
    overviewKey: "countries.germany.overview",
    visaInfoKey: "countries.germany.visaInfo",
    avgTuitionRange: "€0 – €3,000/year",
    costOfLivingRange: "€800 – €1,100/month",
    currency: "EUR",
    highlights: ["countries.germany.h1", "countries.germany.h2", "countries.germany.h3"],
    topUniversitiesByMajor: getTopUnis("Germany"),
  },
  {
    slug: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    overviewKey: "countries.uk.overview",
    visaInfoKey: "countries.uk.visaInfo",
    avgTuitionRange: "£10,000 – £38,000/year",
    costOfLivingRange: "£1,000 – £1,800/month",
    currency: "GBP",
    highlights: ["countries.uk.h1", "countries.uk.h2", "countries.uk.h3"],
    topUniversitiesByMajor: getTopUnis("United Kingdom"),
  },
  {
    slug: "canada",
    name: "Canada",
    flag: "🇨🇦",
    overviewKey: "countries.canada.overview",
    visaInfoKey: "countries.canada.visaInfo",
    avgTuitionRange: "CAD $15,000 – $35,000/year",
    costOfLivingRange: "CAD $1,500 – $2,500/month",
    currency: "CAD",
    highlights: ["countries.canada.h1", "countries.canada.h2", "countries.canada.h3"],
    topUniversitiesByMajor: getTopUnis("Canada"),
  },
  {
    slug: "usa",
    name: "United States",
    flag: "🇺🇸",
    overviewKey: "countries.usa.overview",
    visaInfoKey: "countries.usa.visaInfo",
    avgTuitionRange: "$25,000 – $60,000/year",
    costOfLivingRange: "$1,200 – $2,500/month",
    currency: "USD",
    highlights: ["countries.usa.h1", "countries.usa.h2", "countries.usa.h3"],
    topUniversitiesByMajor: getTopUnis("United States"),
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    flag: "🇳🇱",
    overviewKey: "countries.netherlands.overview",
    visaInfoKey: "countries.netherlands.visaInfo",
    avgTuitionRange: "€2,200 – €15,000/year",
    costOfLivingRange: "€1,000 – €1,500/month",
    currency: "EUR",
    highlights: ["countries.netherlands.h1", "countries.netherlands.h2", "countries.netherlands.h3"],
    topUniversitiesByMajor: getTopUnis("Netherlands"),
  },
];
