import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton, ErrorText } from "./ui";

const MODES = {
  characters: (s: string) => Array.from(s).reverse().join(""),
  words: (s: string) => s.split(/(\s+)/).reverse().join(""),
  lines: (s: string) => s.split("\n").reverse().join("\n"),
};

export default function TextReverser() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const run = (m: keyof typeof MODES) => {
    if (!input) return setError("Enter some text to reverse.");
    setError("");
    setOutput(MODES[m](input));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-3">
        <Label htmlFor="tr-in">Original text</Label>
        <Textarea id="tr-in" rows={8} value={input} onChange={(e) => { setInput(e.target.value); setError(""); }} placeholder="Type something..." />
        <ErrorText>{error}</ErrorText>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => run("characters")}>Reverse characters</Button>
          <Button variant="secondary" onClick={() => run("words")}>Reverse words</Button>
          <Button variant="secondary" onClick={() => run("lines")}>Reverse lines</Button>
        </div>
      </div>
      <div className="space-y-3">
        <Label htmlFor="tr-out">Result</Label>
        <Textarea id="tr-out" rows={8} value={output} readOnly placeholder="Reversed text appears here" />
        <div className="flex gap-2">
          <CopyButton text={output} />
          <Button variant="outline" disabled={!input && !output} onClick={() => { setInput(""); setOutput(""); setError(""); }}>Clear</Button>
        </div>
      </div>
    </div>
  );
}
