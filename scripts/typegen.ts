import type { ESLint, Linter } from "eslint";

import { pluginsToRulesDTS } from "eslint-typegen/core";
import { builtinRules } from "eslint/use-at-your-own-risk";
import fs from "node:fs/promises";

const reduceConfigToPlugins = (config: Linter.Config | Linter.Config[]): { [key: string]: ESLint.Plugin } => {
  if (!Array.isArray(config)) {
    return "plugins" in config && config.plugins !== undefined ? config.plugins : {};
  }

  let plugins = {};

  for (const entry of config) {
    if ("plugins" in entry && entry.plugins !== undefined) {
      plugins = {
        ...plugins,
        ...entry.plugins,
      };
    }
  }

  return plugins;
};

const plugins: { [key: string]: ESLint.Plugin } = {
  "": {
    rules: Object.fromEntries(builtinRules.entries()),
  },
  ...reduceConfigToPlugins(await import("eslint-plugin-perfectionist").then((mod) => mod.default.configs["recommended-natural"] as Linter.Config[])),
  ...reduceConfigToPlugins(await import("eslint-plugin-n").then((mod) => mod.default.configs["flat/recommended-module"] as Linter.Config[])),
  ...reduceConfigToPlugins(await import("@stylistic/eslint-plugin").then((mod) => mod.default.configs.all as Linter.Config[])),
  ...reduceConfigToPlugins(await import("typescript-eslint").then((mod) => mod.configs.recommended as Linter.Config[])),
  ...reduceConfigToPlugins(await import("eslint-plugin-unicorn").then((mod) => mod.default.configs.recommended as Linter.Config[])),
  ...reduceConfigToPlugins(await import("eslint-plugin-svelte").then((mod) => mod.configs["flat/recommended"])),
  ...reduceConfigToPlugins(await import("eslint-plugin-tailwindcss").then((mod) => mod.default.configs["flat/recommended"])),
  ...reduceConfigToPlugins(await import("eslint-plugin-solid/configs/recommended").then((mod) => [mod.default as unknown as Linter.Config])),
};

// eslint-disable-next-line no-console
console.log(
  `Generating rule definitions with plugins: ${
    Object
      .keys(plugins)
      .map((s) => `'${s}'`)
      .join(", ")
  }`,
);

const dts = await pluginsToRulesDTS(plugins, {
  includeAugmentation: false,
});

await fs.writeFile("src/typegen.d.ts", dts, "utf8");
