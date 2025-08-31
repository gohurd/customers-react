import { describe, expect, it } from "vitest";
import { getFallbackColor } from "./get-fallback-color";

describe("getFallbackColor", () => {
  it("Returns empty string if no colors provided", () => {
    expect(getFallbackColor("AB", [])).toBe("");
  });

  it("Returns empty string if no fallback value provided", () => {
    expect(getFallbackColor("", ["bg-red-500", "bg-green-500"])).toBe("");
  });

  it("Returns empty string if no colors and no fallback value provided", () => {
    expect(getFallbackColor("", [])).toBe("");
  });

  it("Returns correct color with one color available", () => {
    expect(getFallbackColor("AB", ["bg-teal-500"])).toBe("bg-teal-500");
  });

  it("Returns correct color for given fallback", () => {
    expect(getFallbackColor("AB", ["bg-teal-500", "bg-indigo-500"])).toBe(
      "bg-indigo-500"
    );
  });
});
