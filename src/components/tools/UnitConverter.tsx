import { ArrowLeftRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { convertUnit, TEMP_UNITS, UNITS, type UnitCategory } from "@/lib/calc";
import { ErrorText, fmt } from "./ui";

const CATEGORIES: UnitCategory[] = ["length", "weight", "temperature", "volume"];
const unitsFor = (c: UnitCategory) => (c === "temperature" ? TEMP_UNITS : Object.keys(UNITS[c]));
const selectCls = "h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40";

export default function UnitConverter() {
  const [cat, setCat] = useState<UnitCategory>("length");
  const [from, setFrom] = useState("Meter");
  const [to, setTo] = useState("Foot");
  const [value, setValue] = useState("1");

  const changeCat = (c: UnitCategory) => {
    const u = unitsFor(c);
    setCat(c);
    setFrom(u[0]);
    setTo(u[1]);
  };

  let result = "";
  let error = "";
  if (value.trim() === "") error = "Enter a value to convert.";
  else if (!Number.isFinite(Number(value))) error = "Please enter a valid number.";
  else if (cat !== "temperature" && Number(value) < 0) error = "Value can't be negative for this unit.";
  else {
    try { result = fmt(convertUnit(cat, Number(value), from, to)); } catch (e) { error = (e as Error).message; }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <Button key={c} variant={c === cat ? "default" : "secondary"} onClick={() => changeCat(c)} className="capitalize">{c}</Button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <div className="space-y-2">
          <Label htmlFor="uc-from">From</Label>
          <select id="uc-from" className={selectCls} value={from} onChange={(e) => setFrom(e.target.value)}>
            {unitsFor(cat).map((u) => <option key={u}>{u}</option>)}
          </select>
          <Input type="number" inputMode="decimal" aria-label="Value" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <Button variant="outline" size="icon" aria-label="Swap units" onClick={() => { setFrom(to); setTo(from); }} className="mx-auto">
          <ArrowLeftRight className="h-4 w-4" />
        </Button>
        <div className="space-y-2">
          <Label htmlFor="uc-to">To</Label>
          <select id="uc-to" className={selectCls} value={to} onChange={(e) => setTo(e.target.value)}>
            {unitsFor(cat).map((u) => <option key={u}>{u}</option>)}
          </select>
          <div className="flex h-9 items-center rounded-md bg-accent px-3 font-display font-bold text-accent-foreground">{result || "—"}</div>
        </div>
      </div>
      <ErrorText>{error}</ErrorText>
    </div>
  );
}
