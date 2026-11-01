import { createFileRoute } from "@tanstack/react-router";
import { ToolSearch } from "@/components/ToolSearch";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "All Tools — QuickTools" },
      { name: "description", content: "Browse every QuickTools utility: text, calculators, converters and image tools." },
      { property: "og:title", content: "All Tools — QuickTools" },
      { property: "og:description", content: "Browse every QuickTools utility in one place." },
    ],
  }),
  component: AllTools,
});

function AllTools() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
      <h1 className="mb-2 text-3xl font-bold sm:text-4xl">All Tools</h1>
      <p className="mb-8 text-muted-foreground">Pick a tool or search for what you need.</p>
      <ToolSearch />
    </div>
  );
}
