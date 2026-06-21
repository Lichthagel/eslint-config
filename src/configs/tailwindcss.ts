import type { Linter } from "eslint";

import type { FlatConfigItemStrict } from "../types";

const tailwindcss = async (): Promise<FlatConfigItemStrict[]> => {
  const { default: pluginTailwind } = await import("eslint-plugin-tailwindcss");

  return [
    ...((pluginTailwind.configs.recommended as Linter.Config[]).map((config) => ({
      ...config,
      name: config.name?.replaceAll(":", "/"),
    }))),
    {
      name: "lichthagel/tailwindcss",
      rules: {
        "tailwindcss/classnames-order": "error",
        "tailwindcss/enforces-negative-arbitrary-values": "error",
        "tailwindcss/enforces-shorthand": "error",
        "tailwindcss/no-contradicting-classname": "error",
        "tailwindcss/no-unnecessary-arbitrary-value": "error",
      },
    },
  ] satisfies FlatConfigItemStrict[];
};

export default tailwindcss;
