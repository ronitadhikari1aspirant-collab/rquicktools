import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/layout/ContentPage";

export const Route = createFileRoute("/privacy")({
  head: () => pageMeta("Privacy Policy", "How QuickTools handles your data: everything is processed locally in your browser."),
  component: () => (
    <ContentPage title="Privacy Policy">
      <p>QuickTools does not require an account and does not collect personal information.</p>
      <h2>Your content</h2>
      <p>Text, numbers and images you enter are processed entirely in your browser and are never uploaded to our servers.</p>
      <h2>Local storage</h2>
      <p>We store only your light/dark theme preference on your device. Clearing your browser data removes it.</p>
      <h2>Offline files</h2>
      <p>When installed, your browser may keep a copy of the app's files so it can open faster and work offline.</p>
    </ContentPage>
  ),
});
