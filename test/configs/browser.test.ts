import globals from "globals";
import {
  assert, describe, expect, test,
} from "vitest";

import { processConfig, testNotHasGlobal } from "./utils";

describe("browser enabled", async () => {
  const res = await processConfig({ browser: true }, "src/file.js");

  assert(res);

  test("has browser globals", () => {
    expect(res.languageOptions?.globals).toMatchObject({
      ...globals.browser, document: "readonly", navigator: "readonly", window: "readonly",
    });
  });
});

describe("browser disabled", async () => {
  const res = await processConfig({ browser: false }, "src/file.js");

  assert(res);

  testNotHasGlobal(res, "document");
  testNotHasGlobal(res, "navigator");
  testNotHasGlobal(res, "window");
});
