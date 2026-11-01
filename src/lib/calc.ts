// Pure helpers used by the tools (kept separate so they can be tested).

export function percentOf(percent: number, value: number) {
  return (percent / 100) * value;
}
export function whatPercent(part: number, whole: number) {
  if (whole === 0) throw new Error("The total can't be zero.");
  return (part / whole) * 100;
}
export function percentChange(from: number, to: number) {
  if (from === 0) throw new Error("The starting value can't be zero.");
  return ((to - from) / Math.abs(from)) * 100;
}

export function calculateAge(birth: Date, today: Date) {
  if (birth > today) throw new Error("Birth date can't be in the future.");
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const totalDays = Math.floor((today.getTime() - birth.getTime()) / 86400000);
  return { years, months, days, totalDays };
}

export type UnitCategory = "length" | "weight" | "temperature" | "volume";

// Factors relative to the base unit of each category.
export const UNITS: Record<Exclude<UnitCategory, "temperature">, Record<string, number>> = {
  length: { Millimeter: 0.001, Centimeter: 0.01, Meter: 1, Kilometer: 1000, Inch: 0.0254, Foot: 0.3048, Yard: 0.9144, Mile: 1609.344 },
  weight: { Milligram: 0.000001, Gram: 0.001, Kilogram: 1, Ounce: 0.028349523125, Pound: 0.45359237, Tonne: 1000 },
  volume: { Milliliter: 0.001, Liter: 1, "Cubic meter": 1000, Teaspoon: 0.00492892, Tablespoon: 0.0147868, Cup: 0.24, "Gallon (US)": 3.785411784 },
};
export const TEMP_UNITS = ["Celsius", "Fahrenheit", "Kelvin"];

export function convertUnit(category: UnitCategory, value: number, from: string, to: string) {
  if (category === "temperature") {
    const c = from === "Celsius" ? value : from === "Fahrenheit" ? ((value - 32) * 5) / 9 : value - 273.15;
    if (c < -273.15) throw new Error("That's below absolute zero.");
    return to === "Celsius" ? c : to === "Fahrenheit" ? (c * 9) / 5 + 32 : c + 273.15;
  }
  const table = UNITS[category];
  return (value * table[from]) / table[to];
}
