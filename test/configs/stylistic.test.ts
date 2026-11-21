import { assert, describe } from "vitest";

import {
  processConfig,
  testEnablesPlugin,
  testNotEnablesPlugin,
  testRule,
  testRuleEnabled,
  testRuleUndefined,
} from "./utils";

describe("stylistic enabled", async () => {
  const res = await processConfig({ stylistic: true }, "src/file.js");

  assert(res);

  testEnablesPlugin(res, "@stylistic");

  testRule(res, "@stylistic/list-style", [
    2,
    {
      empty: "ignore",
      singleLine: { spacing: "never", maxItems: Infinity },
      multiLine: { minItems: 0 },
      overrides: {
        "()": { multiLine: { minItems: 0 } },
        "[]": { singleLine: { maxItems: 3 } },
        "{}": { singleLine: { spacing: "always", maxItems: 3 } },
      },
    },
  ]);

  for (const rule of [
    "@stylistic/array-bracket-newline",
    "@stylistic/array-element-newline",
    "@stylistic/function-call-argument-newline",
    "@stylistic/function-paren-newline",
    "@stylistic/object-curly-newline",
    "@stylistic/object-property-newline",
  ]) {
    testRuleUndefined(res, rule);
  }

  testRuleEnabled(res, "@stylistic/no-extra-semi");
});

describe("stylistic disabled", async () => {
  const res = await processConfig({ stylistic: false }, "src/file.js");

  assert(res);

  testNotEnablesPlugin(res, "@stylistic");

  testRuleUndefined(res, "@stylistic/no-extra-semi");
});
