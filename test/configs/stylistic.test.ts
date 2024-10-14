import { assert, describe } from "vitest";

import {
  processConfig, testEnablesPlugin, testNotEnablesPlugin,
  testRuleEnabled,
  testRuleUndefined,
} from "./utils";

describe("stylistic enabled", async () => {
  const res = await processConfig({ stylistic: true }, "src/file.js");

  assert(res);

  testEnablesPlugin(res, "@stylistic");

  testRuleEnabled(res, "@stylistic/no-extra-semi");
});

describe("stylistic disabled", async () => {
  const res = await processConfig({ stylistic: false }, "src/file.js");

  assert(res);

  testNotEnablesPlugin(res, "@stylistic");

  testRuleUndefined(res, "@stylistic/no-extra-semi");
});
