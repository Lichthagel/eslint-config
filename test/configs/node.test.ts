import globals from "globals";
import {
  assert, describe, expect, test,
} from "vitest";

import {
  processConfig, testEnablesPlugin, testNotEnablesPlugin, testNotHasGlobal,
  testRuleEnabled,
  testRuleUndefined,
} from "./utils";

describe("node enabled", async () => {
  const res = await processConfig({ node: true }, "src/file.js");

  assert(res);

  test("has node globals", () => {
    expect(res.languageOptions?.globals).toMatchObject(globals.node);
  });

  testEnablesPlugin(res, "n");

  testRuleEnabled(res, "n/no-new-require");
});

describe("node disabled", async () => {
  const res = await processConfig({ node: false }, "src/file.js");

  assert(res);

  testNotHasGlobal(res, "require");

  testNotEnablesPlugin(res, "n");

  testRuleUndefined(res, "n/no-new-require");
});
