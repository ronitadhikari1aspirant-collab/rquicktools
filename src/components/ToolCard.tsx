import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ToolMeta } from "@/lib/tools";

export function ToolCard({ tool }: { tool: ToolMeta }) {
  const Icon = tool.icon;
  return (
    <div className="group flex flex-col rounded-2xl border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-lg font-semibold">{tool.title}</h3>
      <p className="mt-1 flex-1 text-sm text-muted-foreground">{tool.description}</p>
      <Link
        to="/tools/$slug"
        params={{ slug: tool.slug }}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
      >
        Open Tool <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

export function ToolGrid({ tools }: { tools: ToolMeta[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {tools.map((t) => (
        <ToolCard key={t.slug} tool={t} />
      ))}
    </div>
  );
}
