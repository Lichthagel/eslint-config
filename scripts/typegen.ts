import { ESLint } from "eslint";
import { builtinRules } from "eslint/use-at-your-own-risk";
import { pluginsToRulesDTS } from "eslint-typegen/core";
import fs from "node:fs/promises";

const plugins: Record<string, ESLint.Plugin> = {
  "": {
    rules: Object.fromEntries(builtinRules.entries()),
  },
  "perfectionist": await import("eslint-plugin-perfectionist").then((mod) => mod.default as ESLint.Plugin),
  "react": await import("eslint-plugin-react").then((mod) => mod.default as ESLint.Plugin),
  "react-hooks": await import("eslint-plugin-react-hooks").then((mod) => mod.default as ESLint.Plugin),
  ...(await import("eslint-plugin-n").then((mod) => mod.default.configs["flat/recommended-module"].plugins)),
  ...(await import("@stylistic/eslint-plugin").then((mod) => mod.default.configs["all-flat"].plugins)),
  ...(await import("typescript-eslint").then((mod) => mod.configs.recommended[0].plugins)),
  ...(await import("eslint-plugin-unicorn").then((mod) => mod.configs["flat/recommended"].plugins as Record<string, ESLint.Plugin>)),
};

const dts = await pluginsToRulesDTS(plugins, {
  includeAugmentation: true,
});

await fs.writeFile("src/typegen.d.ts", dts, "utf8");
