import { createFileRoute, Link } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/layout/ContentPage";

export const Route = createFileRoute("/about")({
  head: () => pageMeta("About", "QuickTools is a free collection of simple, private everyday digital tools."),
  component: () => (
    <ContentPage title="About QuickTools">
      <p>QuickTools brings the small utilities you reach for every day into one clean, fast place — no sign-up, no clutter.</p>
      <h2>Private by design</h2>
      <p>Every tool runs right in your browser. Your text and images never leave your device.</p>
      <h2>Works anywhere</h2>
      <p>Use QuickTools on your phone, tablet or computer, and install it to your home screen for app-like access — even offline for pages you've visited.</p>
      <p><Link to="/tools" className="font-semibold text-primary">Explore all tools →</Link></p>
    </ContentPage>
  ),
});
