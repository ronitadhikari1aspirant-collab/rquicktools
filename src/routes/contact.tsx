import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentPage, pageMeta } from "@/components/layout/ContentPage";

const EMAIL = "hello@quicktools.app";

export const Route = createFileRoute("/contact")({
  head: () => pageMeta("Contact", "Get in touch with the QuickTools team with feedback or tool ideas."),
  component: () => (
    <ContentPage title="Contact">
      <p>Have feedback, found a bug, or want to suggest a new tool? We'd love to hear from you.</p>
      <Button asChild>
        <a href={`mailto:${EMAIL}?subject=QuickTools%20feedback`}><Mail className="h-4 w-4" /> Email {EMAIL}</a>
      </Button>
    </ContentPage>
  ),
});
