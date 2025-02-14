import type { Linter } from "eslint";

import ts from "typescript-eslint";

import type { FlatConfigItemStrict } from "../types";

export default [
  ...(ts.configs.recommendedTypeChecked as Linter.FlatConfig[]),
  {
    name: "lichthagel/typescript",
    rules: {
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/consistent-indexed-object-style": ["warn", "index-signature"],
      "@typescript-eslint/consistent-type-assertions": ["warn", { assertionStyle: "as", objectLiteralTypeAssertions: "allow" }],
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
      "@typescript-eslint/default-param-last": "warn",
      "@typescript-eslint/explicit-member-accessibility": "error",
      "@typescript-eslint/method-signature-style": "warn",
      "@typescript-eslint/no-array-constructor": "error",
      "@typescript-eslint/no-useless-empty-export": "error",
      "default-param-last": "off",
    },
  },
] satisfies FlatConfigItemStrict[] as FlatConfigItemStrict[];
