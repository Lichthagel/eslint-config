import {
  assert, describe, expect, test,
} from "vitest";

import {
  processConfig, testEnablesPlugin, testNotEnablesPlugin, testNotHandlesFile,
  testRuleDisabled,
  testRuleEnabled,
  testRuleUndefined,
} from "./utils";

describe("svelte enabled", async () => {
  const res = await processConfig({ svelte: true }, "src/svelte.svelte");

  assert(res);

  testEnablesPlugin(res, "svelte");

  testRuleEnabled(res, "svelte/no-dupe-on-directives");
});

describe("svelte enabled (with typescript)", async () => {
  const res = await processConfig({ svelte: true, typescript: true }, "src/svelte.svelte");

  assert(res);

  test("svelte uses typescript parser", () => {
    expect(res.languageOptions?.parserOptions?.parser).toBe("@typescript-eslint/parser");
  });

  test("svelte uses typescript block lang", () => {
    const ruleOpts = res.rules?.["svelte/block-lang"];

    assert(ruleOpts);
    assert(Array.isArray(ruleOpts));

    expect(ruleOpts[1]?.script).toStrictEqual(["ts"]);
  });
});

describe("svelte enabled (without typescript)", async () => {
  const res = await processConfig({ svelte: true, typescript: false }, "src/svelte.svelte");

  assert(res);

  test("svelte does not use typescript parser", () => {
    expect(res.languageOptions?.parserOptions?.parser).not.toBe("@typescript-eslint/parser");
  });

  test("svelte uses \"null\" block lang", () => {
    const ruleOpts = res.rules?.["svelte/block-lang"];

    assert(ruleOpts);
    assert(Array.isArray(ruleOpts));

    expect(ruleOpts[1]?.script).toStrictEqual([null]);
  });
});

describe("svelte enabled (with stylistic)", async () => {
  const res = await processConfig({ svelte: true, stylistic: true }, "src/svelte.svelte");

  assert(res);

  testRuleDisabled(res, "@stylistic/indent");
  testRuleDisabled(res, "@stylistic/no-trailing-spaces");
});

describe("svelte disabled", async () => {
  testNotHandlesFile({ svelte: false }, "src/svelte.svelte");

  const res = await processConfig({ svelte: false }, "src/javascript.js");

  assert(res);

  testNotEnablesPlugin(res, "svelte");

  testRuleUndefined(res, "svelte/no-dupe-on-directives");
});
