import * as configs from "./configs";
import { FlatConfigItemStrict, OptionsConfig } from "./types";

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
  } = options;

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
