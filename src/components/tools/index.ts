import { lazy, type ComponentType, type LazyExoticComponent } from "react";

// Maps each tool slug (see src/lib/tools.ts) to its component.
export const TOOL_COMPONENTS: Record<string, LazyExoticComponent<ComponentType>> = {
  "qr-code-generator": lazy(() => import("./QrCodeGenerator")),
  "word-counter": lazy(() => import("./WordCounter")),
  "text-case-converter": lazy(() => import("./TextCaseConverter")),
  "percentage-calculator": lazy(() => import("./PercentageCalculator")),
  "age-calculator": lazy(() => import("./AgeCalculator")),
  "unit-converter": lazy(() => import("./UnitConverter")),
  "text-reverser": lazy(() => import("./TextReverser")),
  "image-resizer": lazy(() => import("./ImageResizer")),
};
