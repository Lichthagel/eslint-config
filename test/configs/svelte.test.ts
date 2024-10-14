import { assert, describe } from "vitest";

import {
  processConfig, testEnablesPlugin, testNotEnablesPlugin, testNotHandlesFile,
  testRuleEnabled,
  testRuleUndefined,
} from "./utils";

describe("svelte enabled", async () => {
  const res = await processConfig({ svelte: true }, "src/svelte.svelte");

  assert(res);

  testEnablesPlugin(res, "svelte");

  testRuleEnabled(res, "svelte/no-dupe-on-directives");
});

describe("typescript disabled", async () => {
  testNotHandlesFile({ svelte: false }, "src/svelte.svelte");

  const res = await processConfig({ svelte: false }, "src/javascript.js");

  assert(res);

  testNotEnablesPlugin(res, "svelte");

  testRuleUndefined(res, "svelte/no-dupe-on-directives");
});
