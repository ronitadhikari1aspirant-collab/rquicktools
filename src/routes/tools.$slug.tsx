import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import { TOOL_COMPONENTS } from "@/components/tools";
import { getTool, TOOLS } from "@/lib/tools";

export const Route = createFileRoute("/tools/$slug")({
  loader: ({ params }) => {
    const tool = getTool(params.slug);
    if (!tool) throw notFound();
    return { slug: tool.slug, title: tool.title, description: tool.description };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} — QuickTools` : "Tool not found — QuickTools";
    const desc = loaderData?.description ?? "This tool doesn't exist.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Tool not found</h1>
      <Link to="/tools" className="mt-4 inline-block font-semibold text-primary">Browse all tools</Link>
    </div>
  ),
  component: ToolPage,
});

function ToolPage() {
  const { slug } = Route.useLoaderData();
  const tool = getTool(slug)!;
  const Tool = TOOL_COMPONENTS[slug];
  const Icon = tool.icon;
  const others = TOOLS.filter((t) => t.slug !== slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>
      <div className="mt-6 flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{tool.title}</h1>
          <p className="text-muted-foreground">{tool.description}</p>
        </div>
      </div>
      <div className="mt-8 rounded-2xl border bg-card p-5 shadow-card sm:p-8">
        <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-muted" />}>
          <Tool />
        </Suspense>
      </div>
      <div className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">More tools</h2>
        <div className="flex flex-wrap gap-2">
          {others.map((t) => (
            <Link key={t.slug} to="/tools/$slug" params={{ slug: t.slug }} className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary">
              {t.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
