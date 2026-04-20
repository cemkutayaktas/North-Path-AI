export interface SalaryEntry {
  avgSalaryUSD: [number, number]; // [low, high] annual USD
  jobGrowthPct: number;           // projected 10-year %
  growthLabel: "High" | "Average" | "Below Average";
  topRoles: string[];             // 2-3 highest-paying roles
}

export const GROWTH_COLOR: Record<SalaryEntry["growthLabel"], string> = {
  "High": "text-emerald-600 dark:text-emerald-400",
  "Average": "text-amber-600 dark:text-amber-400",
  "Below Average": "text-muted-foreground",
};

export const fmtK = (n: number) => `$${Math.round(n / 1000)}k`;

export const salaryChipText = (entry: SalaryEntry) =>
  `${fmtK(entry.avgSalaryUSD[0])}–${fmtK(entry.avgSalaryUSD[1])} · +${entry.jobGrowthPct}%`;

export const SALARY_DATA: Record<string, SalaryEntry> = {
  "Computer Science & Software Engineering": {
    avgSalaryUSD: [75000, 165000],
    jobGrowthPct: 25,
    growthLabel: "High",
    topRoles: ["Software Engineer", "ML Engineer", "Staff Engineer"],
  },
  "Business Administration & Management": {
    avgSalaryUSD: [55000, 130000],
    jobGrowthPct: 8,
    growthLabel: "Average",
    topRoles: ["Management Consultant", "Operations Director", "CEO"],
  },
  "Medicine & Health Sciences": {
    avgSalaryUSD: [80000, 220000],
    jobGrowthPct: 13,
    growthLabel: "High",
    topRoles: ["Physician", "Surgeon", "Medical Director"],
  },
  "Creative Arts & Graphic Design": {
    avgSalaryUSD: [40000, 85000],
    jobGrowthPct: 3,
    growthLabel: "Below Average",
    topRoles: ["Creative Director", "UX Designer", "Art Director"],
  },
  "Environmental Science & Sustainability": {
    avgSalaryUSD: [45000, 90000],
    jobGrowthPct: 8,
    growthLabel: "Average",
    topRoles: ["Environmental Consultant", "Sustainability Manager", "Climate Analyst"],
  },
  "Psychology & Social Sciences": {
    avgSalaryUSD: [40000, 95000],
    jobGrowthPct: 6,
    growthLabel: "Average",
    topRoles: ["Clinical Psychologist", "Research Director", "HR Director"],
  },
  "Law & Political Science": {
    avgSalaryUSD: [60000, 190000],
    jobGrowthPct: 10,
    growthLabel: "Average",
    topRoles: ["Partner at Law Firm", "Corporate Counsel", "Judge"],
  },
  "Mechanical & Civil Engineering": {
    avgSalaryUSD: [65000, 130000],
    jobGrowthPct: 11,
    growthLabel: "High",
    topRoles: ["Senior Engineer", "Project Director", "Engineering Manager"],
  },
  "Data Science & Statistics": {
    avgSalaryUSD: [80000, 160000],
    jobGrowthPct: 28,
    growthLabel: "High",
    topRoles: ["Data Scientist", "ML Engineer", "Chief Data Officer"],
  },
  "Education & Teaching": {
    avgSalaryUSD: [38000, 75000],
    jobGrowthPct: 5,
    growthLabel: "Average",
    topRoles: ["School Principal", "Curriculum Director", "Education Consultant"],
  },
  "Finance & Economics": {
    avgSalaryUSD: [65000, 180000],
    jobGrowthPct: 8,
    growthLabel: "Average",
    topRoles: ["Investment Banker", "CFO", "Portfolio Manager"],
  },
  "Architecture & Urban Design": {
    avgSalaryUSD: [50000, 110000],
    jobGrowthPct: 5,
    growthLabel: "Average",
    topRoles: ["Senior Architect", "Urban Planner", "Design Director"],
  },
  "Pharmacy & Biomedical Sciences": {
    avgSalaryUSD: [70000, 140000],
    jobGrowthPct: 6,
    growthLabel: "Average",
    topRoles: ["Clinical Pharmacist", "R&D Director", "Regulatory Affairs Manager"],
  },
  "Communication & Media Studies": {
    avgSalaryUSD: [38000, 85000],
    jobGrowthPct: 6,
    growthLabel: "Average",
    topRoles: ["Communications Director", "Media Strategist", "Brand Manager"],
  },
  "International Relations & Global Affairs": {
    avgSalaryUSD: [45000, 120000],
    jobGrowthPct: 5,
    growthLabel: "Average",
    topRoles: ["Diplomat", "Policy Analyst", "NGO Director"],
  },
  "Cybersecurity & Network Engineering": {
    avgSalaryUSD: [80000, 160000],
    jobGrowthPct: 32,
    growthLabel: "High",
    topRoles: ["Security Architect", "CISO", "Penetration Tester"],
  },
  "Game Design & Interactive Media": {
    avgSalaryUSD: [50000, 120000],
    jobGrowthPct: 8,
    growthLabel: "Average",
    topRoles: ["Lead Game Designer", "Creative Director", "Technical Director"],
  },
  "Nursing & Allied Health": {
    avgSalaryUSD: [55000, 100000],
    jobGrowthPct: 9,
    growthLabel: "High",
    topRoles: ["Nurse Practitioner", "Clinical Manager", "Chief Nursing Officer"],
  },
  "Marketing & Advertising": {
    avgSalaryUSD: [45000, 120000],
    jobGrowthPct: 10,
    growthLabel: "Average",
    topRoles: ["CMO", "Growth Director", "Brand Strategist"],
  },
  "Linguistics & Translation": {
    avgSalaryUSD: [38000, 80000],
    jobGrowthPct: 4,
    growthLabel: "Below Average",
    topRoles: ["Senior Translator", "Localization Director", "Linguistics Professor"],
  },
};
