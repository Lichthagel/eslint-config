import * as configs from "./configs";
import { FlatConfigItemStrict, OptionsConfig } from "./types";

/**
 * Constructs an array of ESLint flat config items based on the provided options.
 *
 * @param options The options for generating the ESLint configurations. See {@linkcode OptionsConfig}.
 * @returns An array of ESLint flat config items.
 */
const lichthagel = async (
  options: OptionsConfig = {},
): Promise<FlatConfigItemStrict[]> => {
  const {
    browser = false,
    node = false,
    solid = false,
    stylistic = true,
    svelte = false,
    tailwindcss = false,
    typescript = true,
    ...rest
  } = options;

  if (Object.keys(rest).length > 0) {
    throw new Error(`Unknown options: ${Object.keys(rest).join(", ")}`);
  }

  const config: FlatConfigItemStrict[] = [...configs.javascript, ...configs.unicorn, ...configs.perfectionist];

  if (stylistic) {
    config.push(...configs.stylistic);
  }

  if (browser) {
    config.push(...configs.browser);
  }

  if (node) {
    config.push(...(await configs.node()));
  }

  if (typescript) {
    config.push(...configs.typescript);
  }

  if (solid) {
    config.push(...(await configs.solid({ withTypescript: typescript })));
  }

  if (svelte) {
    config.push(...(await configs.svelte({ disableStylistic: stylistic, withTypescript: typescript })));
  }

  if (tailwindcss) {
    config.push(...(await configs.tailwindcss()));
  }

  return config;
};

export default lichthagel;
