import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton, ErrorText } from "./ui";

const words = (s: string) => s.replace(/([a-z])([A-Z])/g, "$1 $2").split(/[\s_\-]+/).filter(Boolean);

const CASES: { label: string; fn: (s: string) => string }[] = [
  { label: "UPPERCASE", fn: (s) => s.toUpperCase() },
  { label: "lowercase", fn: (s) => s.toLowerCase() },
  { label: "Title Case", fn: (s) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) },
  { label: "Sentence case", fn: (s) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase()) },
  { label: "camelCase", fn: (s) => words(s).map((w, i) => (i ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase())).join("") },
  { label: "snake_case", fn: (s) => words(s).map((w) => w.toLowerCase()).join("_") },
  { label: "kebab-case", fn: (s) => words(s).map((w) => w.toLowerCase()).join("-") },
];

export default function TextCaseConverter() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const apply = (fn: (s: string) => string) => {
    if (!text.trim()) return setError("Enter some text to convert first.");
    setError("");
    setText(fn(text));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tc-text">Text</Label>
        <Textarea id="tc-text" rows={8} value={text} onChange={(e) => { setText(e.target.value); setError(""); }} placeholder="Type or paste text, then pick a case..." />
        <ErrorText>{error}</ErrorText>
      </div>
      <div className="flex flex-wrap gap-2">
        {CASES.map((c) => (
          <Button key={c.label} variant="secondary" onClick={() => apply(c.fn)}>{c.label}</Button>
        ))}
      </div>
      <div className="flex gap-2">
        <CopyButton text={text} />
        <Button variant="outline" onClick={() => setText("")} disabled={!text}>Clear</Button>
      </div>
    </div>
  );
}
