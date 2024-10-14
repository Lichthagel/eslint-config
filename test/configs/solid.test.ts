import {
  assert, describe,
  expect,
  test,
} from "vitest";

import {
  processConfig, testEnablesPlugin, testHandlesFile, testNotEnablesPlugin,
  testRuleEnabled,
  testRuleUndefined,
} from "./utils";

describe("solid enabled", async () => {
  const res = await processConfig({ solid: true }, "src/solid.jsx");

  testHandlesFile(res, ".jsx");

  test("enables jsx features", () => {
    expect(res.languageOptions?.parserOptions?.ecmaFeatures?.jsx).toBe(true);
  });

  testEnablesPlugin(res, "solid");

  testRuleEnabled(res, "solid/reactivity");
});

describe("solid enabled (with typescript)", async () => {
  const res = await processConfig({ solid: true, typescript: true }, "src/solid.tsx");

  testHandlesFile(res, ".tsx");

  testEnablesPlugin(res, "solid");

  testRuleEnabled(res, "solid/reactivity");
});

describe("solid disabled", async () => {
  const res = await processConfig({ solid: false }, "src/javascript.js");

  assert(res);

  testNotEnablesPlugin(res, "solid");

  testRuleUndefined(res, "solid/reactivity");
});
