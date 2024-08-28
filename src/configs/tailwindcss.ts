import { FlatConfigItemStrict } from "../types";

const tailwindcss = async (): Promise<FlatConfigItemStrict[]> => {
  const pluginTailwind = await import("eslint-plugin-tailwindcss").then((mod) => mod.default);

  return [
    ...(pluginTailwind.configs["flat/recommended"].map((config) => ({
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
  ] satisfies FlatConfigItemStrict[] as FlatConfigItemStrict[];
};

export default tailwindcss;
