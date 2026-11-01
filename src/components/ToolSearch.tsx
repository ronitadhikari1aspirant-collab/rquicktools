import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { searchTools } from "@/lib/tools";
import { ToolGrid } from "./ToolCard";
import { Button } from "@/components/ui/button";

// Search box that live-filters the tool grid; Enter opens the top match.
export function ToolSearch({ autoFocus = false }: { autoFocus?: boolean }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const results = useMemo(() => searchTools(query), [query]);

  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (query.trim() && results[0]) navigate({ to: "/tools/$slug", params: { slug: results[0].slug } });
        }}
        className="mx-auto flex max-w-xl items-center gap-2 rounded-2xl border bg-card p-2 shadow-card focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30"
      >
        <Search className="ml-2 h-5 w-5 shrink-0 text-muted-foreground" />
        <input
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools — try “qr” or “convert”"
          aria-label="Search tools"
          className="min-w-0 flex-1 bg-transparent py-2 text-base outline-none placeholder:text-muted-foreground"
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="rounded-md p-1 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
        <Button type="submit" disabled={!query.trim() || results.length === 0}>Search</Button>
      </form>

      <div className="mt-12">
        {results.length > 0 ? (
          <>
            {query.trim() && (
              <p className="mb-4 text-sm text-muted-foreground">
                {results.length} tool{results.length === 1 ? "" : "s"} found — press Enter to open the first.
              </p>
            )}
            <ToolGrid tools={results} />
          </>
        ) : (
          <div className="rounded-2xl border border-dashed p-10 text-center">
            <p className="font-medium">No tools match “{query}”.</p>
            <Button variant="link" onClick={() => setQuery("")}>Show all tools</Button>
          </div>
        )}
      </div>
    </div>
  );
}
