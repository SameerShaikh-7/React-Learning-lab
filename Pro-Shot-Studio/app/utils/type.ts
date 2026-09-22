// utils/type.ts — ProShots Data Models

export type BookingType = {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  platformIntent: string;
  serviceType: string;
  editingStyles: string[];
  keepOriginal: boolean;
  specialNotes?: string;
  packageTier?: string;
};

export type ServicePackageType = {
  title: string;
  price: string;
  features: string[];
  tag?: string;
};

// Dropdown options
export const platformIntents = [
  "LinkedIn",
  "Corporate Website",
  "Resume / CV",
  "Personal Branding",
  "Press Kit",
  "Acting / Modeling Portfolio",
];

// Radio options
export const serviceTypes = ["Studio Shoot", "Photo Editing Only"];

// Selectable tags (replaces bikeColor)
export const editingStyleOptions = [
  "Cinematic",
  "Natural",
  "Corporate Light",
  "Grayscale",
  "Warm Tone",
  "High Contrast",
];

// Package tiers
export const packageTiers = ["Basic", "Premium", "Corporate Team"];

// Service packages for Card grid
export const servicePackages: ServicePackageType[] = [
  {
    title: "Basic",
    price: "₹2,499",
    tag: "Starter",
    features: [
      "1 edited headshot",
      "Standard retouching",
      "LinkedIn format delivery",
      "48-hr turnaround",
    ],
  },
  {
    title: "Premium",
    price: "₹5,999",
    tag: "Most Popular",
    features: [
      "3 edited headshots",
      "Cinematic lighting adjustments",
      "LinkedIn + Corporate formats",
      "High-res delivery",
      "24-hr turnaround",
      "1 revision round",
    ],
  },
  {
    title: "Corporate Team",
    price: "₹18,999",
    tag: "Best Value",
    features: [
      "Up to 10 team members",
      "Consistent brand look",
      "All platform formats",
      "High-res + web delivery",
      "Priority turnaround",
      "2 revision rounds",
    ],
  },
];