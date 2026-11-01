import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateAge } from "@/lib/calc";
import { ErrorText, Stat } from "./ui";

const toDate = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const todayStr = () => {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
};

export default function AgeCalculator() {
  const [birth, setBirth] = useState("");
  const [asOf, setAsOf] = useState(todayStr);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calculateAge> | null>(null);

  const run = () => {
    setResult(null);
    if (!birth) return setError("Please choose a birth date.");
    if (!asOf) return setError("Please choose the date to calculate to.");
    try {
      setResult(calculateAge(toDate(birth), toDate(asOf)));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="age-birth">Date of birth</Label>
          <Input id="age-birth" type="date" value={birth} max={asOf} onChange={(e) => setBirth(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age-asof">Age on</Label>
          <Input id="age-asof" type="date" value={asOf} onChange={(e) => setAsOf(e.target.value)} />
        </div>
      </div>
      <ErrorText>{error}</ErrorText>
      <Button onClick={run}>Calculate age</Button>
      {result && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Years" value={result.years} />
          <Stat label="Months" value={result.months} />
          <Stat label="Days" value={result.days} />
          <Stat label="Total days" value={result.totalDays.toLocaleString()} />
        </div>
      )}
    </div>
  );
}
