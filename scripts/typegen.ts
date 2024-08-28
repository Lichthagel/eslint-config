import { ESLint, Linter } from "eslint";
import { builtinRules } from "eslint/use-at-your-own-risk";
import { pluginsToRulesDTS } from "eslint-typegen/core";
import fs from "node:fs/promises";

const reduceConfigToPlugins = (config: Linter.Config | Linter.Config[]): Record<string, ESLint.Plugin> => {
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

const plugins: Record<string, ESLint.Plugin> = {
  "": {
    rules: Object.fromEntries(builtinRules.entries()),
  },
  "react": await import("eslint-plugin-react").then((mod) => mod.default as ESLint.Plugin),
  "react-hooks": await import("eslint-plugin-react-hooks").then((mod) => mod.default as ESLint.Plugin),
  ...reduceConfigToPlugins(await import("eslint-plugin-perfectionist/configs/recommended-natural").then((mod) => mod.default as Linter.Config[])),
  ...reduceConfigToPlugins(await import("eslint-plugin-n").then((mod) => mod.default.configs["flat/recommended-module"] as Linter.Config[])),
  ...reduceConfigToPlugins(await import("@stylistic/eslint-plugin").then((mod) => mod.default.configs["all-flat"] as Linter.Config[])),
  ...reduceConfigToPlugins(await import("typescript-eslint").then((mod) => mod.configs.recommended as Linter.Config[])),
  ...reduceConfigToPlugins(await import("eslint-plugin-unicorn").then((mod) => mod.configs["flat/recommended"] as Linter.Config[])),
  ...reduceConfigToPlugins(await import("eslint-plugin-svelte").then((mod) => mod.configs["flat/recommended"] as Linter.Config[])),
  ...reduceConfigToPlugins(await import("eslint-plugin-tailwindcss").then((mod) => mod.default.configs["flat/recommended"])),
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
  includeAugmentation: true,
});

await fs.writeFile("src/typegen.d.ts", dts, "utf8");
