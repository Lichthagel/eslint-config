import globals from "globals";

import type { FlatConfigItemStrict } from "../types";

export default [
  {
    name: "lichthagel/browser",
    languageOptions: {
      globals: {
        ...globals.browser,
        document: "readonly",
        navigator: "readonly",
        window: "readonly",
      },
    },
  },
] satisfies FlatConfigItemStrict[] as FlatConfigItemStrict[];
