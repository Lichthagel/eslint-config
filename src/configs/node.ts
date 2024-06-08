import nodePlugin from "eslint-plugin-n";
import globals from "globals";
import { FlatConfigItemStrict } from "../types";

export default [
  nodePlugin.configs["flat/recommended-module"],
  {
    name: "lichthagel/node",
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "n/handle-callback-err": ["error", "^.*(e|E)rr(or)?$"],
      "n/no-new-require": "error",
      "n/no-path-concat": "error",
      "n/no-process-env": "error",

      "n/no-missing-import": "off",
      "n/no-missing-require": "off",
    },
  },
] satisfies FlatConfigItemStrict[] as FlatConfigItemStrict[];
