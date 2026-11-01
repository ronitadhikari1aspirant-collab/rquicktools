import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Stat } from "./ui";

export default function WordCounter() {
  const [text, setText] = useState("");
  const s = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    return {
      words,
      chars: text.length,
      noSpaces: text.replace(/\s/g, "").length,
      sentences: trimmed ? (trimmed.match(/[^.!?]+[.!?]*/g) ?? []).filter((x) => x.trim()).length : 0,
      paragraphs: trimmed ? trimmed.split(/\n\s*\n/).length : 0,
      minutes: Math.max(words ? 1 : 0, Math.ceil(words / 200)),
    };
  }, [text]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Stat label="Words" value={s.words} />
        <Stat label="Characters" value={s.chars} />
        <Stat label="No spaces" value={s.noSpaces} />
        <Stat label="Sentences" value={s.sentences} />
        <Stat label="Paragraphs" value={s.paragraphs} />
        <Stat label="Read time" value={`${s.minutes} min`} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="wc-text">Your text</Label>
        <Textarea id="wc-text" rows={10} value={text} onChange={(e) => setText(e.target.value)} placeholder="Start typing or paste your text here..." />
      </div>
      <Button variant="outline" onClick={() => setText("")} disabled={!text}>Clear</Button>
    </div>
  );
}
