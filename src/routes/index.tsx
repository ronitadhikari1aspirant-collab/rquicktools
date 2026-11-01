import { createFileRoute } from "@tanstack/react-router";
import { ToolSearch } from "@/components/ToolSearch";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QuickTools — Everything You Need. One Place." },
      { name: "description", content: "Free everyday tools: QR codes, word counter, unit converter, age calculator, image resizer and more." },
      { property: "og:title", content: "QuickTools — Everything You Need. One Place." },
      { property: "og:description", content: "Simple, useful digital tools for everyday life." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <section className="pb-4 pt-14 text-center sm:pt-20">
        <span className="inline-block rounded-full border bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          8 free tools · No sign-up · Runs in your browser
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
          Everything You Need. <span className="text-primary">One Place.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Simple, useful digital tools for everyday life.
        </p>
      </section>
      <section className="mt-8">
        <ToolSearch />
      </section>
    </div>
  );
}
