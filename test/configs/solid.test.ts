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
    expect((res.languageOptions?.parserOptions as { ecmaFeatures?: { jsx?: boolean } })?.ecmaFeatures?.jsx ?? false).toBe(true);
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

describe("solid v2 enabled", async () => {
  const res = await processConfig({ solid: "v2" }, "src/solid.jsx");
  const tsRes = await processConfig({ solid: "v2", typescript: true }, "src/solid.tsx");

  testHandlesFile(res, ".jsx");
  testHandlesFile(tsRes, ".tsx");

  testEnablesPlugin(res, "solid");

  test("sets the Solid version to 2", () => {
    expect((res.settings as { solid?: { version?: number } })?.solid?.version).toBe(2);
  });

  testRuleEnabled(res, "solid/removed-api");
  testRuleEnabled(res, "solid/no-single-arg-create-effect");
  testRuleEnabled(res, "solid/no-accessor-as-prop");
});

describe("solid disabled", async () => {
  const res = await processConfig({ solid: false }, "src/javascript.js");

  assert(res);

  testNotEnablesPlugin(res, "solid");

  testRuleUndefined(res, "solid/reactivity");
});
