import { assert, describe } from "vitest";

import {
  processConfig, testEnablesPlugin, testNotEnablesPlugin, testRuleEnabled, testRuleUndefined,
} from "./utils";

describe("tailwindcss enabled", async () => {
  const res = await processConfig({ tailwindcss: true }, "src/file.js");

  assert(res);

  testEnablesPlugin(res, "tailwindcss");

  testRuleEnabled(res, "tailwindcss/classnames-order");
});

describe("tailwindcss disabled", async () => {
  const res = await processConfig({ tailwindcss: false }, "src/file.js");

  assert(res);

  testNotEnablesPlugin(res, "tailwindcss");

  testRuleUndefined(res, "tailwindcss/classnames-order");
});
