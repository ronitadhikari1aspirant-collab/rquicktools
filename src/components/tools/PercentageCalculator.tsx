import { useState } from "react";
import { Input } from "@/components/ui/input";
import { percentChange, percentOf, whatPercent } from "@/lib/calc";
import { ErrorText, fmt } from "./ui";

type Mode = { title: string; a: string; b: string; compute: (a: number, b: number) => number; suffix: string };

const MODES: Mode[] = [
  { title: "What is X% of Y?", a: "Percent (%)", b: "Value", compute: percentOf, suffix: "" },
  { title: "X is what % of Y?", a: "Part", b: "Total", compute: whatPercent, suffix: "%" },
  { title: "% change from X to Y", a: "From", b: "To", compute: percentChange, suffix: "%" },
];

function Row({ mode }: { mode: Mode }) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  let result = "";
  let error = "";
  if (a !== "" && b !== "") {
    const x = Number(a), y = Number(b);
    if (!Number.isFinite(x) || !Number.isFinite(y)) error = "Please enter valid numbers.";
    else {
      try { result = fmt(mode.compute(x, y)) + mode.suffix; } catch (e) { error = (e as Error).message; }
    }
  }
  return (
    <div className="rounded-xl border p-5">
      <h3 className="mb-3 font-semibold">{mode.title}</h3>
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-center">
        <Input type="number" inputMode="decimal" aria-label={mode.a} placeholder={mode.a} value={a} onChange={(e) => setA(e.target.value)} />
        <Input type="number" inputMode="decimal" aria-label={mode.b} placeholder={mode.b} value={b} onChange={(e) => setB(e.target.value)} />
        <div className="min-w-32 rounded-lg bg-accent px-4 py-2 text-center font-display text-lg font-bold text-accent-foreground">{result || "—"}</div>
      </div>
      <div className="mt-2"><ErrorText>{error}</ErrorText></div>
    </div>
  );
}

export default function PercentageCalculator() {
  return <div className="space-y-4">{MODES.map((m) => <Row key={m.title} mode={m} />)}</div>;
}
