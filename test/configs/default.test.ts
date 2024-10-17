import globals from "globals";
import {
  assert, describe, expect, test,
} from "vitest";

import {
  processConfig, testEnablesPlugin,
  testRuleDisabled,
  testRuleEnabled,
} from "./utils";

describe("default options", async () => {
  const res = await processConfig({}, "src/file.js");

  assert(res);

  testEnablesPlugin(res, "unicorn");
  testEnablesPlugin(res, "perfectionist");

  test("uses ES2022", () => {
    expect(res.languageOptions?.ecmaVersion).toBe(2022);
    expect(res.languageOptions?.parserOptions?.ecmaVersion).toBe(2022);
  });

  test("uses ES modules", () => {
    expect(res.languageOptions?.sourceType).toBe("module");
    expect(res.languageOptions?.parserOptions?.sourceType).toBe("module");
  });

  test("has ES2021 globals", () => {
    expect(res.languageOptions?.globals).toMatchObject(globals.es2021);
  });

  test("has ES2022 globals", () => {
    expect(res.languageOptions?.globals).toMatchObject(globals.es2022);
  });

  testRuleEnabled(res, "no-extend-native");
  testRuleDisabled(res, "perfectionist/sort-object-types");
  testRuleEnabled(res, "perfectionist/sort-union-types");
  testRuleDisabled(res, "sort-imports");
  testRuleEnabled(res, "unicorn/consistent-destructuring");
  testRuleEnabled(res, "unicorn/no-useless-undefined");
  testRuleDisabled(res, "unicorn/no-null");
});

describe("non-existent option", () => {
  test("throws error", async () => {
    // @ts-expect-error nonExistent is not a valid option
    await expect(processConfig({ nonExistent: true }, "src/file.js")).rejects.toThrow();
  });
});
