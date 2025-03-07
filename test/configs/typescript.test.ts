import { assert, describe } from "vitest";

import {
  processConfig, testEnablesPlugin, testHandlesFile, testNotEnablesPlugin, testNotHandlesFile,
  testRuleEnabled,
  testRuleUndefined,
} from "./utils";

describe("typescript enabled", async () => {
  const res = await processConfig({ typescript: true }, "src/typescript.ts");

  testHandlesFile(res, ".ts");

  testEnablesPlugin(res, "@typescript-eslint");

  testRuleEnabled(res, "@typescript-eslint/no-array-constructor");
});

describe("typescript disabled", async () => {
  testNotHandlesFile(await processConfig(
    { typescript: false },
    "src/typescript.ts",
  ), ".ts");

  const res = await processConfig({ typescript: false }, "src/javascript.js");

  assert(res);

  testNotEnablesPlugin(res, "@typescript-eslint");

  testRuleUndefined(res, "@typescript-eslint/no-array-constructor");
});
