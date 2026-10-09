import { describe, expect, it } from "bun:test";
import { kebabCase } from "@/utils/utils";

describe("kebabCase", () => {
  it("converts camelCase and PascalCase to kebab-case", () => {
    expect(kebabCase("BinaryInspector")).toBe("binary-inspector");
    expect(kebabCase("snakeCaseName")).toBe("snake-case-name");
    expect(kebabCase("TG-GithubBot")).toBe("tg-github-bot");
  });

  it("converts spaces and underscores to hyphens", () => {
    expect(kebabCase("Next JS")).toBe("next-js");
    expect(kebabCase("Type Script")).toBe("type-script");
    expect(kebabCase("Tailwind_CSS")).toBe("tailwind-css");
  });

  it("handles uppercase strings and single words", () => {
    expect(kebabCase("RUST")).toBe("rust");
    expect(kebabCase("api")).toBe("api");
  });
});

