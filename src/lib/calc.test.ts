import { describe, expect, it } from "vitest";
import { calculateAge, convertUnit, percentChange, percentOf, whatPercent } from "./calc";
import { searchTools } from "./tools";

describe("calc", () => {
  it("percent of", () => expect(percentOf(20, 150)).toBe(30));
  it("what percent", () => expect(whatPercent(25, 200)).toBe(12.5));
  it("percent change", () => expect(percentChange(50, 75)).toBe(50));
  it("rejects zero total", () => expect(() => whatPercent(1, 0)).toThrow());
  it("age", () => {
    const a = calculateAge(new Date(2000, 0, 15), new Date(2026, 10, 1));
    expect([a.years, a.months, a.days]).toEqual([26, 9, 17]);
  });
  it("rejects future birth", () =>
    expect(() => calculateAge(new Date(2030, 0, 1), new Date(2026, 0, 1))).toThrow());
  it("temperature", () => expect(convertUnit("temperature", 100, "Celsius", "Fahrenheit")).toBe(212));
  it("length", () => expect(convertUnit("length", 1, "Kilometer", "Meter")).toBe(1000));
  it("search", () => expect(searchTools("qr").map((t) => t.slug)).toEqual(["qr-code-generator"]));
});
