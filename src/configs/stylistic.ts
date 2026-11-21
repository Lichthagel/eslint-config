import stylistic from "@stylistic/eslint-plugin";

import type { FlatConfigItemStrict } from "../types";

export default [
  {
    name: "stylistic/custom",
    ...stylistic.configs.customize({
      arrowParens: true,
      braceStyle: "1tbs",
      commaDangle: "always-multiline",
      indent: 2,
      jsx: true,
      quoteProps: "consistent-as-needed",
      quotes: "double",
      semi: true,
    }),
  },
  {
    name: "lichthagel/stylistic",
    rules: {
      // JavaScript
      "@stylistic/list-style": [
        "error",
        {
          overrides: {
            "()": { multiLine: { minItems: 0 } },
            "[]": { singleLine: { maxItems: 3 } },
            "{}": { singleLine: { maxItems: 3 } },
          },
        },
      ],
      "@stylistic/curly-newline": ["error", { consistent: true }],
      "@stylistic/function-call-spacing": ["error", "never"],
      "@stylistic/generator-star-spacing": ["error", { after: false, before: true }],
      "@stylistic/implicit-arrow-linebreak": ["off", "beside"],
      "@stylistic/lines-around-comment": [
        "error",
        {
          afterHashbangComment: true,
          allowArrayStart: true,
          allowBlockStart: true,
          allowClassStart: true,
          allowEnumStart: true,
          allowInterfaceStart: true,
          allowModuleStart: true,
          allowObjectStart: true,
          allowTypeStart: true,
          applyDefaultIgnorePatterns: true,
          beforeBlockComment: true,
        },
      ],
      "@stylistic/lines-between-class-members": ["error", "always", { exceptAfterSingleLine: false }],
      "@stylistic/multiline-ternary": ["error", "always-multiline"],
      "@stylistic/newline-per-chained-call": ["error", { ignoreChainWithDepth: 2 }],
      "@stylistic/no-extra-semi": "error",
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/nonblock-statement-body-position": ["error", "beside"],
      "@stylistic/one-var-declaration-per-line": ["error", "always"],
      "@stylistic/operator-linebreak": ["error", "before"],
      "@stylistic/semi-style": ["error", "last"],
      "@stylistic/switch-colon-spacing": ["error", { after: true, before: false }],

      // JSX

      "@stylistic/jsx-closing-bracket-location": ["error", "line-aligned"],
      "@stylistic/jsx-curly-brace-presence": ["error", { children: "never", propElementValues: "always", props: "never" }],
      "@stylistic/jsx-pascal-case": "error",
      "@stylistic/jsx-self-closing-comp": "error",

    },
  },
] satisfies FlatConfigItemStrict[] as FlatConfigItemStrict[];
