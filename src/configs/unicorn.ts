import unicornPlugin from "eslint-plugin-unicorn";

import type { FlatConfigItemStrict } from "../types";

export default [
  {
    name: "unicorn/flat/recommended",
    ...unicornPlugin.configs["flat/recommended"],
  },
  {
    name: "lichthagel/unicorn",
    rules: {
      "unicorn/consistent-destructuring": "error",
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            camelCase: true,
            kebabCase: true,
            pascalCase: true,
          },
        },
      ],
      "unicorn/import-style": "off",
      "unicorn/no-null": "off",
      "unicorn/no-useless-undefined": ["error", { checkArguments: false }],
      "unicorn/prevent-abbreviations": "off",
    },
  },
] satisfies FlatConfigItemStrict[] as FlatConfigItemStrict[];
