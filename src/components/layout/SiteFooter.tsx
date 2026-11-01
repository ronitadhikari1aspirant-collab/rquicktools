import { Link } from "@tanstack/react-router";
import { Logo } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t bg-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Logo />
          <p className="text-sm text-muted-foreground">Everything You Need. One Place.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link to="/about" className="text-muted-foreground hover:text-primary">About QuickTools</Link>
          <Link to="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link>
          <Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
        </nav>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} QuickTools. All rights reserved.
      </div>
    </footer>
  );
}
