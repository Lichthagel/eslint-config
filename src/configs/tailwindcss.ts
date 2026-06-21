import type { Linter } from "eslint";

import type { FlatConfigItemStrict } from "../types";

const tailwindcss = async (): Promise<FlatConfigItemStrict[]> => {
  const { default: pluginTailwind } = await import("eslint-plugin-tailwindcss");

  const recommendedConfig = pluginTailwind.configs.recommended as Linter.Config;

  return [
    ({
      ...recommendedConfig,
      name: recommendedConfig.name?.replaceAll(":", "/"),
    }),
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
