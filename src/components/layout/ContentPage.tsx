import type { ReactNode } from "react";

export function ContentPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground">
        {children}
      </div>
    </div>
  );
}

export const pageMeta = (title: string, description: string) => ({
  meta: [
    { title: `${title} — QuickTools` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — QuickTools` },
    { property: "og:description", content: description },
  ],
});
