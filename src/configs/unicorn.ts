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
      "unicorn/comment-content": "off",
      "unicorn/consistent-boolean-name": "off",
      "unicorn/name-replacements": "off",
      "unicorn/no-top-level-assignment-in-function": "off",
      "unicorn/no-computed-property-existence-check": "off",
    },
  },
] satisfies FlatConfigItemStrict[] as FlatConfigItemStrict[];
