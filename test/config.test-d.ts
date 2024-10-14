import { Linter } from "eslint";
import { expectTypeOf, test } from "vitest";

import lichthagel, { type FlatConfigItemStrict } from "../src";

test("strict type is compatible", () => {
  expectTypeOf<FlatConfigItemStrict>().toMatchTypeOf<Linter.Config>();
});

test("return type matches strict type", () => {
  expectTypeOf(lichthagel).returns.toMatchTypeOf<Promise<FlatConfigItemStrict[]>>();
});

test("return type is compatible", () => {
  expectTypeOf(lichthagel).returns.toMatchTypeOf<Promise<Linter.Config[]>>();
});
