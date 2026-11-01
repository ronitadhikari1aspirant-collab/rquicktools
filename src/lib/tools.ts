import {
  ArrowLeftRight,
  CaseSensitive,
  Image,
  Percent,
  QrCode,
  Repeat,
  Cake,
  Type,
  type LucideIcon,
} from "lucide-react";

export type ToolMeta = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  keywords: string[];
};

// Single registry for every tool. Add a tool here and in src/components/tools/index.ts.
export const TOOLS: ToolMeta[] = [
  { slug: "qr-code-generator", title: "QR Code Generator", description: "Turn any link or text into a downloadable QR code.", icon: QrCode, keywords: ["qr", "barcode", "link", "url"] },
  { slug: "word-counter", title: "Word Counter", description: "Count words, characters, sentences and reading time.", icon: Type, keywords: ["words", "characters", "count", "text"] },
  { slug: "text-case-converter", title: "Text Case Converter", description: "Switch text to UPPER, lower, Title, camelCase and more.", icon: CaseSensitive, keywords: ["uppercase", "lowercase", "title", "camel", "snake"] },
  { slug: "percentage-calculator", title: "Percentage Calculator", description: "Work out percentages, changes and proportions fast.", icon: Percent, keywords: ["percent", "math", "discount", "change"] },
  { slug: "age-calculator", title: "Age Calculator", description: "Find exact age in years, months and days from a birth date.", icon: Cake, keywords: ["birthday", "date", "years", "age"] },
  { slug: "unit-converter", title: "Unit Converter", description: "Convert length, weight, temperature and volume.", icon: ArrowLeftRight, keywords: ["convert", "length", "weight", "temperature", "metric"] },
  { slug: "text-reverser", title: "Text Reverser", description: "Reverse characters, words or lines in a click.", icon: Repeat, keywords: ["reverse", "backwards", "mirror", "text"] },
  { slug: "image-resizer", title: "Image Resizer", description: "Resize photos privately in your browser and download.", icon: Image, keywords: ["photo", "resize", "picture", "png", "jpg"] },
];

export function getTool(slug: string) {
  return TOOLS.find((t) => t.slug === slug);
}

export function searchTools(query: string): ToolMeta[] {
  const q = query.trim().toLowerCase();
  if (!q) return TOOLS;
  return TOOLS.filter((t) =>
    [t.title, t.description, ...t.keywords].some((s) => s.toLowerCase().includes(q)),
  );
}
