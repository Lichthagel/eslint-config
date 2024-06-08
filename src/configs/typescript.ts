import { Linter } from "eslint";
import ts from "typescript-eslint";
import { FlatConfigItemStrict } from "../types";

export default [
  ...(ts.configs.recommendedTypeChecked as Linter.FlatConfig[]),
  {
    name: "lichthagel/typescript",
    rules: {
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/consistent-indexed-object-style": "warn",
      "@typescript-eslint/consistent-type-assertions": [
        "warn",
        { assertionStyle: "as", objectLiteralTypeAssertions: "allow" },
      ],
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
      "@typescript-eslint/default-param-last": "warn",
      "@typescript-eslint/explicit-member-accessibility": "error",
      "@typescript-eslint/method-signature-style": "warn",
      "@typescript-eslint/no-array-constructor": "error",
      "default-param-last": "off",
    },
  },
  {
    name: "lichthagel/typescript/declarations",
    files: ["*.d.ts"],
    rules: {
      "@stylistic/spaced-comment": "off",
    },
  },
] satisfies FlatConfigItemStrict[] as FlatConfigItemStrict[];
